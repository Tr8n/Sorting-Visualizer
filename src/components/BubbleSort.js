// import React, { useState, useEffect, useCallback } from 'react';

// const BubbleSort = () => {
//   const [array, setArray] = useState([]);
//   const [arraySize, setArraySize] = useState(50); // Default array size
//   const [isSorting, setIsSorting] = useState(false);

//   // Function to generate a new array based on the current size
//   const resetArray = useCallback(() => {
//     if (isSorting) return; // Prevent reset while sorting
//     const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
//     setArray(newArray);
//   }, [arraySize, isSorting]);

//   useEffect(() => {
//     resetArray();
//   }, [resetArray]);

//   // Bubble Sort with Animation
//   const bubbleSort = async () => {
//     setIsSorting(true);
//     const arr = [...array];
    
//     for (let i = 0; i < arr.length - 1; i++) {
//       for (let j = 0; j < arr.length - i - 1; j++) {
//         if (arr[j] > arr[j + 1]) {
//           [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap elements
//           setArray([...arr]);
//           await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
//         }
//       }
//     }
    
//     setIsSorting(false);
//   };

//   // Fast Sort (immediate sorting without animation)
//   const fastSort = () => {
//     const sortedArray = [...array].sort((a, b) => a - b); // Sorts in ascending order
//     setArray(sortedArray);
//   };

//   // Update array size based on scrollbar
//   const handleArraySizeChange = (e) => {
//     setArraySize(e.target.value);
//     resetArray(); // Regenerate array with the new size
//   };

//   return (
//     <div>
//       <h1>Sorting Visualizer <strong>Bubble Sort</strong></h1>
      
//       {/* Array size scrollbar */}
//       <div className="array-size-control">
//         <label>Array Size: {arraySize}</label>
//         <input
//           type="range"
//           min="5"
//           max="100"
//           value={arraySize}
//           onChange={handleArraySizeChange}
//           disabled={isSorting}
//         />
//       </div>
      
//       {/* Array display */}
//       <div className="array-container">
//         {array.map((value, idx) => (
//           <div
//             className="array-bar"
//             key={idx}
//             style={{
//               height: `${value}px`,
//             }}
//           ></div>
//         ))}
//       </div>
      
//       {/* Control buttons */}
//       <div className="controls">
//         <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
//         <button onClick={bubbleSort} disabled={isSorting}>Start Sort</button>
//         <button onClick={fastSort} disabled={isSorting}>Fast Sort</button>
//       </div>
      
//       {/* Documentation Table */}
//       <h2>Notations Documentation</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Notation</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '8px' }}>n</td>
//             <td style={{ border: '1px solid black', padding: '8px' }}>Number of elements in the array</td>
//           </tr>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '8px' }}>i</td>
//             <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the outer loop</td>
//           </tr>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '8px' }}>j</td>
//             <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the inner loop</td>
//           </tr>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '8px' }}>arr[]</td>
//             <td style={{ border: '1px solid black', padding: '8px' }}>The array being sorted</td>
//           </tr>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '8px' }}>temp</td>
//             <td style={{ border: '1px solid black', padding: '8px' }}>Temporary variable used for swapping</td>
//           </tr>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '8px' }}>swaps</td>
//             <td style={{ border: '1px solid black', padding: '8px' }}>Counter for the number of swaps made</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Algorithm Implementation in Java and Python */}
//       <h2>Bubble Sort Implementation</h2>
//       <h3>Java</h3>
//       <pre>
//         {`public void bubbleSort(int[] arr) {
//           int n = arr.length;
//           for (int i = 0; i < n - 1; i++) {
//               for (int j = 0; j < n - i - 1; j++) {
//                   if (arr[j] > arr[j + 1]) {
//                       // Swap arr[j] and arr[j+1]
//                       int temp = arr[j];
//                       arr[j] = arr[j + 1];
//                       arr[j + 1] = temp;
//                   }
//               }
//           }
//       }`}
//       </pre>

//       <h3>Python</h3>
//       <pre>
//         {`def bubble_sort(arr):
//           n = len(arr)
//           for i in range(n - 1):
//               for j in range(n - i - 1):
//                   if arr[j] > arr[j + 1]:
//                       # Swap arr[j] and arr[j + 1]
//                       arr[j], arr[j + 1] = arr[j + 1], arr[j]
//       `}
//       </pre>
//     </div>
//   );
// };

// export default BubbleSort;
import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `// JavaScript Bubble Sort
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
  python: `# Python Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
  java: `// Java Bubble Sort
public void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}`,
  cpp: `// C++ Bubble Sort
void bubbleSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        std::swap(arr[j], arr[j+1]);
      }
    }
  }
}`
};

const genericDescription = `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It has a worst-case and average time complexity of O(n^2).`;

const BubbleSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [codeLang, setCodeLang] = useState('javascript');
  const stopRef = useRef(false);

  const resetArray = useCallback(() => {
    if (isSorting) return;
    stopRef.current = false;
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
    setArray(newArray);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const bubbleSortAnimated = async () => {
    setIsSorting(true);
    stopRef.current = false;
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) {
          setIsSorting(false);
          return;
        }
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }

    setIsSorting(false);
  };

  const fastSort = () => {
    stopRef.current = true;
    setIsSorting(true);
    const sortedArray = [...array].sort((a, b) => a - b);
    setArray(sortedArray);
    setIsSorting(false);
    stopRef.current = false;
  };

  const stopSorting = () => {
    stopRef.current = true;
    setIsSorting(false);
  };

  const handleArraySizeChange = (e) => {
    setArraySize(Number(e.target.value));
    resetArray();
  };

  return (
    <div>
      <h1>Sorting Visualizer <strong>Bubble Sort</strong></h1>

      {/* Array size scrollbar */}
      <div className="array-size-control" style={{ marginBottom: '10px' }}>
        <label>Array Size: {arraySize}</label>
        <input
          type="range"
          min="5"
          max="100"
          value={arraySize}
          onChange={handleArraySizeChange}
          disabled={isSorting}
        />
      </div>

      {/* Array display */}
      <div
        className="array-container"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          height: '300px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          padding: '10px',
          overflowX: 'auto'
        }}
      >
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              width: `${300 / arraySize}px`,
              backgroundColor: '#2196f3',
              margin: '0 1px',
              transition: 'height 0.2s ease',
            }}
          />
        ))}
      </div>

      {/* Control buttons */}
      <div className="controls" style={{ marginBottom: '20px' }}>
        <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={bubbleSortAnimated} disabled={isSorting}>Start Sort</button>
        <button onClick={fastSort} disabled={isSorting}>Fast Sort</button>
        <button onClick={stopSorting} disabled={!isSorting}>Stop</button>
      </div>

      {/* Notation Documentation */}
      <h2>Notations Documentation</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
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

      {/* Algorithm description and code */}
      <h2>Bubble Sort Description & Code</h2>
      <p>{genericDescription}</p>

      {/* === Code Section === */}
      <div className="code-section">
        <h2>Insertion Sort Code Examples</h2>
        <p className="algorithm-description">{genericDescription}</p>
        <select
          value={codeLang}
          onChange={(e) => setCodeLang(e.target.value)}
          aria-label="Select programming language"
          disabled={isSorting} // Optional: disable while sorting
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <pre className="code-box">
          <code>{codeSnippets[codeLang]}</code>
        </pre>
      </div>
    </div>
  );
};

export default BubbleSort;
