const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '15px 0', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginBottom: '10px', marginTop: '0' }}>{note.title}</h3>
      <p style={{ marginBottom: '15px', marginTop: '0' }}>{note.description}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;