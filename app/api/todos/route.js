import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  return new Response(JSON.stringify(todos), { status: 200 });
}

export async function POST(req) {
  const { task } = await req.json();

  if (!task || task.trim() === '') {
    return new Response(JSON.stringify({ error: 'Task is required' }), { status: 400 });
  }

  const currentTime = new Date();

  const newTodo = await prisma.todo.create({
    data: {
      task,
      lastUpdatedAt: currentTime, // Set the current time as lastUpdatedAt
    },
  });

  return new Response(JSON.stringify(newTodo), { status: 201 });
}
