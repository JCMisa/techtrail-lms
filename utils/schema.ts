import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const course = pgTable("course", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId"),
  userId: varchar("userId"),
  userEmail: varchar("userEmail"),
  title: varchar("title"),
  description: varchar("description"),
  imageUrl: varchar("imageUrl"),
  price: decimal("price"),
  isPublished: boolean("isPublished").default(false),

  categoryId: varchar("categoryId"),

  createdAt: varchar("createdAt"),
  updatedBy: varchar("updatedBy"),
});

export const attachment = pgTable("attachment", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  url: text("url").notNull(),
  createdAt: varchar("createdAt"),
  updatedBy: varchar("updatedBy"),
  courseId: varchar("courseId"),
});

export const chapter = pgTable("chapter", {
  id: serial("id").primaryKey(),
  chapterId: varchar("chapterId"),
  title: varchar("title"),
  description: varchar("description"),
  videoUrl: varchar("videoUrl"),
  position: integer("position"),
  isPublished: boolean("isPublished").default(false),
  isFree: boolean("isFree").default(false),
  courseId: varchar("courseId"),
  createdAt: varchar("createdAt"),
  updatedAt: varchar("updatedAt"),
  createdBy: varchar("createdBy"),
});

export const chapterQuestion = pgTable("chapterQuestion", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId"),
  chapterId: varchar("chapterId"),
  questionId: varchar("questionId"),
  question: varchar("question"),
  answer: varchar("answer"),
  explanation: varchar("explanation"),
  optionOne: varchar("optionOne"),
  optionTwo: varchar("optionTwo"),
  optionThree: varchar("optionThree"),
  optionFour: varchar("optionFour"),
});

export const userProgress = pgTable("userProgress", {
  id: serial("id").primaryKey(),
  userId: varchar("userId"),
  userEmail: varchar("userEmail"),
  courseId: varchar("courseId"),
  chapterId: varchar("chapterId"),
  isCompleted: boolean("isCompleted").default(false),
  createdAt: varchar("createdAt"),
  updatedAt: varchar("updatedAt"),
});

export const purchase = pgTable("purchase", {
  id: serial("id").primaryKey(),
  userId: varchar("userId"),
  userEmail: varchar("userEmail"),
  courseId: varchar("courseId"),
  createdAt: varchar("createdAt"),
  updatedAt: varchar("updatedAt"),
});

export const stripeCustomer = pgTable("stripeCustomer", {
  id: serial("id").primaryKey(),
  userId: varchar("userId"),
  userEmail: varchar("userEmail"),
  stripeCustomerId: varchar("stripeCustomerId"),
  createdAt: varchar("createdAt"),
  updatedAt: varchar("updatedAt"),
});

export const subscribedUsers = pgTable("subscribedUsers", {
  id: serial("id").primaryKey(),
  userId: varchar("userId"),
  userEmail: varchar("userEmail"),
  stripeCustomerId: varchar("stripeCustomerId"),
  createdAt: varchar("createdAt"),
  updatedAt: varchar("updatedAt"),
});

// relationships
export const categoryRelations = relations(category, ({ many }) => ({
  course: many(course),
}));

export const courseRelations = relations(course, ({ many }) => ({
  attachment: many(attachment),
}));

export const attachmentRelations = relations(attachment, ({ one }) => ({
  course: one(course, {
    fields: [attachment.courseId],
    references: [course.courseId],
  }),
}));
