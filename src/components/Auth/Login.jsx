import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        setUser({ email: user.email, id: user.id });
        localStorage.setItem('user', JSON.stringify({ email: user.email, id: user.id })); 
        navigate('/home');
      } else {
        setError('Неверный email или пароль');
      }
    } catch (error) {
      setError('Ошибка при авторизации');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-40">
      <h1 className="text-2xl font-bold text-center">Вход</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Войти</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
});

export default connect(null, mapDispatchToProps)(Login);