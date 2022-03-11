import React from 'react';
import './App.css';
import ErrorBoundary from './components/error_boundary/ErrorBoundary';
import Questions from './components/questions/Questions';

function App() {
  return <ErrorBoundary>
    <Questions />
  </ErrorBoundary>
}

export default App;
