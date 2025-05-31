import React, { useState, useEffect, useCallback } from 'react';
// import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50); // Default array size
  const [isSorting, setIsSorting] = useState(false);

  // Function to generate a new array based on the current size
  const resetArray = useCallback(() => {
    if (isSorting) return; // Prevent reset while sorting
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
    setArray(newArray);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  // Bubble Sort with Animation
  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap elements
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
        }
      }
    }
    
    setIsSorting(false);
  };

  // Fast Sort (immediate sorting without animation)
  const fastSort = () => {
    const sortedArray = [...array].sort((a, b) => a - b); // Sorts in ascending order
    setArray(sortedArray);
  };

  // Update array size based on scrollbar
  const handleArraySizeChange = (e) => {
    setArraySize(e.target.value);
    resetArray(); // Regenerate array with the new size
  };

  return (
    <div>
      <h1>Sorting Visualizer <strong> Bubble Sort</strong> </h1>
      
      {/* Array size scrollbar */}
      <div className="array-size-control">
        <label>Array Size: {arraySize}</label>
        <input
          type="range"
          min="5"
          max="1000"
          value={arraySize}
          onChange={handleArraySizeChange}
          disabled={isSorting}
        />
      </div>
      
      {/* Array display */}
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Control buttons */}
      <div className="controls">
        <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={bubbleSort} disabled={isSorting}>Start Sort</button>
        <button onClick={fastSort} disabled={isSorting}>Fast Sort</button>
      </div>
      
      {/* Documentation Table */}
      <h2>Notations Documentation</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Notation</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>n</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Number of elements in the array</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>i</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the outer loop</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>j</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the inner loop</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>arr[]</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The array being sorted</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>temp</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Temporary variable used for swapping</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>swaps</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Counter for the number of swaps made</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SortingVisualizer;
