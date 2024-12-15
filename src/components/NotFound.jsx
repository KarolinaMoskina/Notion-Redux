import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="p-4 text-center mt-60">
      <h1 className="text-3xl">404 Not Found</h1>
      <p>
        Страница не найдена. Вернитесь на{' '}
        <Link to="/" className="text-blue-500">домашнюю страницу</Link>.
      </p>
    </div>
  );
};

export default NotFound;