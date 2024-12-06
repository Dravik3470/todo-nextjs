import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const { id, completed } = await req.json();

    if (!id || typeof completed === 'undefined') {
      return new Response(
        JSON.stringify({ error: 'ID and completed status are required' }),
        { status: 400 }
      );
    }

    const currentTime = new Date();

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10) }, // Ensure ID is an integer
      data: {
        completed,
        lastUpdatedAt: currentTime, // Update lastUpdatedAt to the current time
      },
    });

    return new Response(JSON.stringify(updatedTodo), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update todo' }),
      { status: 400 }
    );
  }
}
