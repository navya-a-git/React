import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {notes.map(note => (
        <NoteItem key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;