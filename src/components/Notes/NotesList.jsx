import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const NotesList = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('http://localhost:5000/notes');
      const data = await response.json();
      const userNotes = data.filter(note => note.authorId === user.id);
      setNotes(userNotes.sort((a, b) => b.createdAt - a.createdAt));
    };

    fetchNotes();
  }, [user.id]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' });
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold text-center">Мои заметки</h1>
      <div className="text-center mb-4 mt-10">
        <Link to="/notes/create" className="bg-blue-500 text-white p-2 rounded">Создать заметку</Link>
      </div>
      {notes.length === 0 ? (
        <p className="text-center">У вас пока нет заметок.</p>
      ) : (
        notes.map(note => (
          <div key={note.id} className="border p-4 mb-2">
            <h2 className="text-xl">
              <Link to={`/notes/${note.id}`}>{note.title}</Link>
            </h2>
            <p>{new Date(note.createdAt).toLocaleDateString()}</p>
            <div className="flex justify-between mt-2">
              <div>
                <Link to={`/notes/edit/${note.id}`} className="text-blue-500">✍️ Редактировать</Link>
                <button onClick={() => handleDelete(note.id)} className="text-red-500 ml-2">🗑 Удалить</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NotesList);