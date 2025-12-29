import { useState } from 'react';

const NoteForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formTitle = title || initialData.title || '';
    const formDescription = description || initialData.description || '';

    if (!formTitle.trim()) {
      setError('Title is required');
      return;
    }
    if (formTitle.length < 3 || formTitle.length > 80) {
      setError('Title must be 3-80 characters');
      return;
    }
    if (formDescription && formDescription.length > 500) {
      setError('Description must be max 500 characters');
      return;
    }
    onSubmit({ title: formTitle.trim(), description: formDescription.trim() });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title || initialData.title || ''}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <textarea
          placeholder="Description (optional)"
          value={description || initialData.description || ''}
          onChange={(e) => setDescription(e.target.value)}
          style={{ flex: '2', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px' }}
        />
      </div>
      {error && <p style={{color: 'red', marginBottom: '10px'}}>{error}</p>}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>{initialData._id ? 'Update' : 'Create'} Note</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>}
      </div>
    </form>
  );
};

export default NoteForm;