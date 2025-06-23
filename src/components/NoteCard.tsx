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