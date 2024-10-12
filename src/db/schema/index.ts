import {
  integer,
  pgTable,
  primaryKey,
  text,
  varchar,
} from 'drizzle-orm/pg-core';
import { certificateLevel, facultyEnum, userRole } from './enums';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  role: userRole().notNull(),
  name: varchar({ length: 80 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 100 }).notNull().unique(),
});

export const certificates = pgTable('certificates', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  level: certificateLevel().notNull(),
});

export const certificateGrades = pgTable(
  'certificate_grades',
  {
    score: integer().notNull(),
    name: varchar({ length: 100 }).notNull(),
    certificate_id: integer()
      .references(() => certificates.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.certificate_id, table.name] }),
  })
);

export const subjects = pgTable('subjects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }),
});

export const students = pgTable('students', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => users.id, { onDelete: 'no action' }),
});

export const grades = pgTable('grades', {
  student_id: integer()
    .references(() => students.id, { onDelete: 'cascade' })
    .notNull(),
});

export const courses = pgTable('courses', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }),
  description: text(),
  faculty: facultyEnum(),
});
