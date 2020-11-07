import React from 'react';
import './App.css';

import SaveLocal from './components/SaveLocal';
import SaveStream from './components/SaveStream';
import ListLocal from './components/ListLocal';
import ListS3 from './components/ListS3';

function App() {
  return (
    <div className="App">
      <SaveLocal />
      <ListLocal />
      <SaveStream />
      <ListS3 />
    </div>
  );
}

export default App;
