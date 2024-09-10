import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../schema';

type User = typeof users.$inferInsert;

export async function createUser(newUser: User) {
  const result = await db.insert(users).values(newUser).returning();
  return result[0];
}

export async function getUserById(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function getAllUsers() {
  return await db.query.users.findMany();
}

export async function updateUser(id: string, user: User) {
  const updatedUser = { user, updatedAt: new Date() };

  const result = await db
    .update(users)
    .set(updatedUser)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}

export async function deleteUser(id: string) {
  const result = await db.delete(users).where(eq(users.id, id)).returning();
  return result[0];
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
}
