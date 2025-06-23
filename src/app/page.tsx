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