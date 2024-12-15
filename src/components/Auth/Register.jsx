import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();
      const existingUser = users.find(u => u.email === formData.email);
      if (existingUser) {
        setError('Пользователь с таким email уже существует');
        return; 
      }
  
      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      setUser({ email: formData.email });
      localStorage.setItem('user', JSON.stringify({ email: formData.email })); 
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-40">
      <h1 className="text-2xl font-bold text-center">Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Пароль" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Подтверждение пароля" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="border p-2 w-full mb-2" />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Зарегистрироваться</button>
      </form>
      <p className="text-center mt-4">
        Уже зарегистрированы? 
        <button onClick={() => navigate('/login')} className="text-blue-500 underline ml-1">Войдите</button>
      </p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
});

export default connect(null, mapDispatchToProps)(Register);