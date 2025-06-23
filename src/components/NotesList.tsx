'use client';
import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import NoteCard from './NoteCard';

interface Props {
  onEdit: (note: Note) => void;
  refreshTrigger: number;
}

export default function NotesList({ onEdit, refreshTrigger }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, [refreshTrigger]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/notes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const data = await response.json();
      // Sort notes by creation date (newest first)
      const sortedNotes = data.sort((a: Note, b: Note) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotes(sortedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (deletedId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== deletedId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchNotes}
          className="mt-2 text-red-600 hover:text-red-800 font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {notes.length} note{notes.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={fetchNotes}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Refresh
            </button>
          </div>
          
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">📝</div>
          <p className="text-gray-500 mb-4">No notes yet. Create your first note!</p>
          <button
            onClick={fetchNotes}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}