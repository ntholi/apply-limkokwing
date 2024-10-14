'use server';

import { db } from '@/db';
import { programs } from '@/db/schema';
import { eq, like } from 'drizzle-orm';

const ITEMS_PER_PAGE = 15;

export async function getPrograms(page: number = 1, search = '') {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const list = await db
    .select()
    .from(programs)
    .where(like(programs.name, `%${search}%`))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  return {
    items: list,
    pages: Math.ceil(list.length / ITEMS_PER_PAGE),
  };
}

export async function getProgram(id: number) {
  return db.query.programs.findFirst({
    where: eq(programs.id, id),
  });
}
