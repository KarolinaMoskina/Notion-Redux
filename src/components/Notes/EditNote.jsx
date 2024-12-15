import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const EditNote = ({ note, setNote, updateNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localNote, setLocalNote] = useState(note);

  useEffect(() => {
    const fetchNoteById = async (id) => {
      const response = await fetch(`http://localhost:5000/notes/${id}`);
      const fetchedNote = await response.json();
      setLocalNote(fetchedNote); 
      setNote(fetchedNote); 
    };

    fetchNoteById(id);
  }, [id, setNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localNote), 
    });
    updateNote(localNote); 
    navigate(`/notes/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalNote({ ...localNote, [name]: value }); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold text-center">Редактировать заметку</h1>
      <input
        type="text"
        name="title"
        value={localNote.title || ''}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        placeholder="Название заметки"
        required
      />
      <textarea
        name="body"
        value={localNote.body || ''} 
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        placeholder="Тело заметки"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Сохранить</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  note: state.notes.find(note => note.id === parseInt(state.id)) || { title: '', body: '' },
});

const mapDispatchToProps = (dispatch) => ({
  setNote: (note) => dispatch({ type: 'SET_NOTES', payload: [note] }),
  updateNote: (note) => dispatch({ type: 'UPDATE_NOTE', payload: note }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);