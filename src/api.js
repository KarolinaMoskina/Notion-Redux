const API_URL = 'http://localhost:5000';

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error('Ошибка при получении заметок');
  }
  return response.json();
};

export const fetchNoteById = async (id) => {
  const response = await fetch(`${API_URL}/notes/${id}`);
  if (!response.ok) {
    throw new Error('Ошибка при получении заметки');
  }
  return response.json();
};

export const createNote = async (note) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Ошибка при создании заметки');
  }
  return response.json();
};

export const updateNote = async (id, note) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении заметки');
  }
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении заметки');
  }
};