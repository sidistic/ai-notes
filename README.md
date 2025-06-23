# AI Notes App: Simple Next.js Setup

## Quick Start Commands

```bash
# Create Next.js project
npx create-next-app@latest ai-notes --typescript --tailwind --app

cd ai-notes

# Install only essential dependencies
npm install openai
```

## Basic Project Structure

```
ai-notes/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Home page with notes list
│   │   └── api/
│   │       └── notes/
│   │           └── route.ts          # API for notes CRUD
│   ├── components/
│   │   ├── NoteCard.tsx             # Display a single note
│   │   ├── NoteForm.tsx             # Create/edit note form
│   │   └── NotesList.tsx            # List all notes
│   ├── lib/
│   │   └── notes.ts                 # Notes data functions
│   └── types/
│       └── note.ts                  # Note type definition
├── .env.local                       # API keys
└── package.json
```

## Environment Setup (.env.local)

```env
OPENAI_API_KEY=your-openai-api-key-here
```

## Basic Types (src/types/note.ts)

```typescript
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags?: string[];
}
```

## Start with These Files

### 1. Main Page (src/app/page.tsx)
```typescript
import NotesList from '@/components/NotesList';
import NoteForm from '@/components/NoteForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My AI Notes</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
          <NoteForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">My Notes</h2>
          <NotesList />
        </div>
      </div>
    </div>
  );
}
```

### 2. API Route (src/app/api/notes/route.ts)
```typescript
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
```

### 3. Notes List Component (src/components/NotesList.tsx)
```typescript
'use client';
import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import NoteCard from './NoteCard';

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch('/api/notes');
    const data = await response.json();
    setNotes(data);
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
      {notes.length === 0 && (
        <p className="text-gray-500">No notes yet. Create your first note!</p>
      )}
    </div>
  );
}
```

### 4. Note Form Component (src/components/NoteForm.tsx)
```typescript
'use client';
import { useState } from 'react';

export default function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });

    setTitle('');
    setContent('');
    window.location.reload(); // Simple refresh for now
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-32"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
}
```

### 5. Note Card Component (src/components/NoteCard.tsx)
```typescript
import { Note } from '@/types/note';

interface Props {
  note: Note;
}

export default function NoteCard({ note }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
      <p className="text-gray-700 mb-2">{note.content}</p>
      <p className="text-sm text-gray-500">
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
```

## Development Steps

1. **Start here**: Get basic note creation working (done)
2. **Next**: Add delete/edit functionality  (done)
3. **Then**: Add OpenAI embeddings for search
4. **Later**: Add graph visualization
5. **Finally**: Add database (PostgreSQL)

## Run Your App

```bash
npm run dev
```

Visit `http://localhost:3000` and you'll have a working note-taking app!

This minimal structure gives you a solid foundation that you can expand step by step. Once you get this working, we can gradually add the AI features and graph visualization.