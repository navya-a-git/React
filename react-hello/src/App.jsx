import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';

const API_BASE = 'http://localhost:5000/api/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (noteData) => {
    try {
      const res = await axios.post(API_BASE, noteData);
      setNotes(Array.isArray(notes) ? [...notes, res.data] : [res.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  const handleEdit = async (noteData) => {
    try {
      const res = await axios.put(`${API_BASE}/${editingNote._id}`, noteData);
      setNotes(Array.isArray(notes) ? notes.map(n => n._id === editingNote._id ? res.data : n) : []);
      setEditingNote(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setNotes(Array.isArray(notes) ? notes.filter(n => n._id !== id) : []);
    } catch {
      setError('Failed to delete note');
    }
  };

  const filteredNotes = Array.isArray(notes) ? notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Notes</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <NoteForm
        onSubmit={editingNote ? handleEdit : handleCreate}
        initialData={editingNote || {}}
        onCancel={editingNote ? () => setEditingNote(null) : null}
      />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {loading ? <p>Loading...</p> : <NoteList notes={filteredNotes} onEdit={setEditingNote} onDelete={handleDelete} />}
    </div>
  );
};

export default App;