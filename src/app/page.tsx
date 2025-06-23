'use client';
import { useState } from 'react';
import NotesList from '@/components/NotesList';
import NoteForm from '@/components/NoteForm';
import { Note } from '@/types/note';

export default function Home() {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleNoteUpdated = () => {
    // Trigger a refresh of the notes list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My AI Notes</h1>
          <p className="text-gray-600">Organize your thoughts and ideas</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <NoteForm
              editingNote={editingNote}
              onNoteUpdated={handleNoteUpdated}
              onCancelEdit={handleCancelEdit}
            />
            
            {editingNote && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Editing mode:</strong> You are currently editing "{editingNote.title}". 
                  Click "Update Note" to save changes or "Cancel" to stop editing.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Your Notes</h2>
              {editingNote && (
                <button
                  onClick={handleCancelEdit}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Exit Edit Mode
                </button>
              )}
            </div>
            
            <NotesList
              onEdit={handleEdit}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>
      </div>
    </div>
  );
}