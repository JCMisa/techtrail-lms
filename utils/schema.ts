import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
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
