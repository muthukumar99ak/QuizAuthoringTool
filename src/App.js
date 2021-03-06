import React from 'react';
import './App.css';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Questions from './pages/questions/Questions';

function App() {
  return <ErrorBoundary>
    <Questions />
  </ErrorBoundary>
}

export default App;
