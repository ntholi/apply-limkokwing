import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['admin', 'user']);

export const facultyEnum = pgEnum('faculty', [
  'FBMG',
  'FCTH',
  'FICT',
  'FDI',
  'FCMB',
]);

export const certificateLevel = pgEnum('certificate_level', [
  'hight school',
  'tertiary',
]);
