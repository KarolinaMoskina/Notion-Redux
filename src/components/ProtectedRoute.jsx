import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ user, children }) => {
  return user && user.email ? children : <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProtectedRoute);