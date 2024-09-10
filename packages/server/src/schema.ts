import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name'),
  email: text('email'),
  role: text('role').$type<'user' | 'admin'>().default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey().notNull(),
  name: text('name'),
  minCredits: integer('min_credits'),
  minPasses: integer('min_passes'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});

export const prerequisites = pgTable('prerequisites', {
  id: serial('id').primaryKey().notNull(),
  courseId: integer('course_id').references(() => courses.id),
  subjectId: integer('subject_id').references(() => subjects.id),
  isMandatory: boolean('is_mandatory').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey().notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});
