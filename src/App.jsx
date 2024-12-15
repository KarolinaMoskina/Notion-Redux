import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux'; 
import store from './store'; 
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home';
import CreateNote from './components/Notes/CreateNote';
import EditNote from './components/Notes/EditNote';
import NoteView from './components/Notes/NoteView';
import NotesList from './components/Notes/NotesList';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: storedUser });
    }
  }, [dispatch]);

  return (
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><NotesList /></ProtectedRoute>} />
          <Route path="/notes/create" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
          <Route path="/notes/edit/:id" element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
          <Route path="/notes/:id" element={<ProtectedRoute><NoteView /></ProtectedRoute>} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;