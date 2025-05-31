import React, { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import BubbleSort from './components/BubbleSort';
import SelectionSort from './components/SelectionSort';
import InsertionSort from './components/InsertionSort';
import MergeSort from './components/MergeSort';
import HeapSort from './components/HeapSort';
import './App.css'

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Home');

  const renderAlgorithm = () => {
    switch (selectedAlgorithm) {
      case 'BubbleSort':
        return <BubbleSort />;
      case 'SelectionSort':
        return <SelectionSort />;
      case 'InsertionSort':
        return <InsertionSort />;
      case 'MergeSort':
        return <MergeSort />;
  
      case 'HeapSort':
        return <HeapSort />;
      case 'Home':
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Nav setSelectedAlgorithm={setSelectedAlgorithm} />
      {renderAlgorithm()}
    </div>
  );
};

export default App;
