import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-md mx-auto text-center mt-20">
      <h1 className="text-xl">Привет, {user.email || 'Гость'}</h1>
      <div className="mt-4">
        <p>Дата регистрации: {new Date().toLocaleDateString()}</p>
      </div>
      <button onClick={() => navigate('/notes')} className="bg-blue-500 text-white p-2 rounded mt-4">
        Перейти к заметкам
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);