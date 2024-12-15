import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const NoteView = ({ user }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`http://localhost:5000/notes/${id}`);
      if (!response.ok) {
        navigate('/404'); 
        return;
      }
      const data = await response.json();
      setNote(data);
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' });
    navigate('/notes');
  };

  if (!note) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-2">{note.body}</p>
      <button onClick={() => navigate(`/notes/edit/${id}`)} className="mr-2">✍️ Редактировать</button>
      <button onClick={handleDelete} className="text-red-500">🗑 Удалить</button>
      <button onClick={() => navigate('/notes')} className="ml-2">Назад</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NoteView);