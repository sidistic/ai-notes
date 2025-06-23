import { NextResponse } from 'next/server';

// Temporary in-memory storage (replace with database later)
let notes: any[] = [];

export async function GET() {
  try {
    return NextResponse.json(notes);
  } catch (error) {
    console.error('GET /api/notes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error('POST /api/notes error:', error);
    return NextResponse.json(
      { error: 'Failed to create note' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content, tags } = body;
    
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return NextResponse.json(
        { error: 'Note not found' }, 
        { status: 404 }
      );
    }
    
    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      content,
      tags: tags || [],
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(notes[noteIndex]);
  } catch (error) {
    console.error('PUT /api/notes error:', error);
    return NextResponse.json(
      { error: 'Failed to update note' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Note ID required' }, 
        { status: 400 }
      );
    }
    
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return NextResponse.json(
        { error: 'Note not found' }, 
        { status: 404 }
      );
    }
    
    notes.splice(noteIndex, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/notes error:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' }, 
      { status: 500 }
    );
  }
}