import Stripe from "stripe";
import { db } from "@/utils/db";
import { course, purchase, stripeCustomer } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { format } from "date-fns";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseResult = await db
      .select()
      .from(course)
      .where(
        and(eq(course.courseId, params?.courseId), eq(course.isPublished, true))
      );

    const purchaseRecord = await db
      .select()
      .from(purchase)
      .where(
        and(
          eq(purchase.userId, user?.id),
          eq(purchase.courseId, params?.courseId)
        )
      );

    if (purchaseRecord[0]) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!courseResult[0]) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "PHP",
          product_data: {
            name: courseResult[0]?.title as string,
            description: courseResult[0]?.description as string,
          },
          unit_amount: Math.round(Number(courseResult[0]?.price) * 100),
        },
      },
    ];

    const stripeCustomerResult = await db
      .select() // this will return an array
      .from(stripeCustomer)
      .where(eq(stripeCustomer.userId, user?.id));

    // if stripe customer schema does not include a record with userId equal to current user's userId, then add the user as paid
    if (stripeCustomerResult?.length === 0) {
      const customer = await stripe.customers.create({
        email: user?.primaryEmailAddress?.emailAddress,
      });

      await db.insert(stripeCustomer).values({
        userId: user?.id,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        stripeCustomerId: customer?.id,
        createdAt: format(new Date(), "MM-dd-yyyy"),
        updatedAt: format(new Date(), "MM-dd-yyyy"),
      });
    }

    if (purchaseRecord?.length === 0) {
      await db.insert(purchase).values({
        userId: user?.id,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        courseId: courseResult[0]?.courseId,
        createdAt: format(new Date(), "MM-dd-yyyy"),
        updatedAt: format(new Date(), "MM-dd-yyyy"),
        price: courseResult[0]?.price,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerResult[0]?.stripeCustomerId as string,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/viewCourse/courses/${courseResult[0]?.courseId}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/viewCourse/courses/${courseResult[0]?.courseId}?canceled=1`,
      metadata: {
        courseId: courseResult[0]?.courseId,
        userId: user?.id,
      },
    });

    return NextResponse.json({ url: session.url }); // navigate user to stripe page
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
