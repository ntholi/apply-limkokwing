import {
  integer,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
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

export const students = pgTable('students', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => users.id, { onDelete: 'no action' }),
});

export const certificates = pgTable('certificates', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  level: certificateLevel().notNull(),
});

export const certificateGrades = pgTable(
  'certificate_grades',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    score: integer().notNull(),
    name: varchar({ length: 100 }).notNull(),
    certificateId: integer()
      .references(() => certificates.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => ({
    unique: uniqueIndex('unique_certificate_grade').on(
      table.certificateId,
      table.name
    ),
  })
);

export const subjects = pgTable('subjects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }),
  certificateId: integer().references(() => certificates.id, {
    onDelete: 'set null',
  }),
});

export const studentCertificates = pgTable(
  'student_certificates',
  {
    studentId: integer()
      .references(() => students.id, { onDelete: 'cascade' })
      .notNull(),
    certificateId: integer().references(() => certificates.id, {
      onDelete: 'no action',
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.certificateId, table.studentId] }),
  })
);

export const studentGrades = pgTable('student_grades', {
  studentId: integer()
    .references(() => students.id, { onDelete: 'cascade' })
    .notNull(),
  certificateGradeId: integer().references(() => certificateGrades.id),
});

export const programs = pgTable('programs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }),
  description: text(),
  faculty: facultyEnum(),
});
