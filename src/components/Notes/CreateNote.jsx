import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const CreateNote = ({ user }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, body, authorId: user.id, createdAt: Date.now() };

    await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    });

    navigate('/notes');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mt-20 text-center">
      <h1 className="text-2xl font-bold text-center">Создать заметку</h1>
      <input
        type="text"
        placeholder="Название заметки"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <textarea
        placeholder="Тело заметки"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Создать</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CreateNote);