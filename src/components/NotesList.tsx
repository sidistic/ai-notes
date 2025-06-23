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