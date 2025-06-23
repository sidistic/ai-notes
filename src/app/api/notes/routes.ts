import { NextResponse } from 'next/server';

// Temporary in-memory storage (replace with database later)
let notes: any[] = [];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newNote = {
    id: Date.now().toString(),
    title: body.title,
    content: body.content,
    createdAt: new Date().toISOString(),
    tags: body.tags || []
  };
  
  notes.push(newNote);
  return NextResponse.json(newNote);
}