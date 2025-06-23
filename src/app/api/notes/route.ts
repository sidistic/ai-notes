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

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, title, content, tags } = body;
  
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    tags: tags || [],
    updatedAt: new Date().toISOString()
  };
  
  return NextResponse.json(notes[noteIndex]);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Note ID required' }, { status: 400 });
  }
  
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
  
  notes.splice(noteIndex, 1);
  return NextResponse.json({ success: true });
}