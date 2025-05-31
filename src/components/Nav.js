import React from 'react';

const Nav = ({ setSelectedAlgorithm }) => {
  return (
    <nav>
      <h1>Sorting Algorithms Visualizer</h1>
      <ul>
        <li onClick={() => setSelectedAlgorithm('Home')}>Home</li>
        <li onClick={() => setSelectedAlgorithm('SelectionSort')}>Selection Sort</li>
        <li onClick={() => setSelectedAlgorithm('BubbleSort')}>Bubble Sort</li>
        <li onClick={() => setSelectedAlgorithm('InsertionSort')}>Insertion Sort</li>
        <li onClick={() => setSelectedAlgorithm('MergeSort')}>Merge Sort</li>
        <li onClick={() => setSelectedAlgorithm('QuickSort')}>Quick Sort</li>
        <li onClick={() => setSelectedAlgorithm('HeapSort')}>Heap Sort</li>
      </ul>
    </nav>
  );
};

export default Nav;
