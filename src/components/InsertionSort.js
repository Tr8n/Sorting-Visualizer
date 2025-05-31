// import React, { useState, useEffect, useCallback } from 'react';
// // import './SortingVisualizer.css';

// const InsertionSort = () => {
//     const [array, setArray] = useState([]);
//     const [arraySize, setArraySize] = useState(50);
//     const [isSorting, setIsSorting] = useState(false);

//     // Function to generate a new array based on the current size
//     const resetArray = useCallback(() => {
//         if (isSorting) return;
//         const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
//         setArray(newArray);
//     }, [arraySize, isSorting]);

//     useEffect(() => {
//         resetArray();
//     }, [resetArray]);

//     // Insertion Sort with Animation
//     const insertionSort = async () => {
//         setIsSorting(true);
//         const arr = [...array];

//         for (let i = 1; i < arr.length; i++) {
//             const key = arr[i];
//             let j = i - 1;

//             // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
//             while (j >= 0 && arr[j] > key) {
//                 arr[j + 1] = arr[j];
//                 setArray([...arr]); // Update array state
//                 await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
//                 j--;
//             }
//             arr[j + 1] = key;
//         }

//         setIsSorting(false);
//     };

//     // Fast Insertion Sort (instant sorting without animation)
//     const fastInsertionSort = () => {
//         const sortedArray = [...array];
//         for (let i = 1; i < sortedArray.length; i++) {
//             const key = sortedArray[i];
//             let j = i - 1;

//             while (j >= 0 && sortedArray[j] > key) {
//                 sortedArray[j + 1] = sortedArray[j];
//                 j--;
//             }
//             sortedArray[j + 1] = key;
//         }
//         setArray(sortedArray);
//     };

//     // Update array size based on scrollbar
//     const handleArraySizeChange = (e) => {
//         setArraySize(Number(e.target.value));
//         resetArray();
//     };

//     return (
//         <div>
//             <h1>Insertion Sort Visualizer</h1>

//             {/* Array size scrollbar */}
//             <div className="array-size-control">
//                 <label>Array Size: {arraySize}</label>
//                 <input
//                     type="range"
//                     min="10"
//                     max="200"
//                     value={arraySize}
//                     onChange={handleArraySizeChange}
//                     disabled={isSorting}
//                 />
//             </div>

//             {/* Array display */}
//             <div className="array-container">
//                 {array.map((value, idx) => (
//                     <div
//                         className="array-bar"
//                         key={idx}
//                         style={{
//                             height: `${value}px`,
//                         }}
//                     ></div>
//                 ))}
//             </div>

//             {/* Control buttons */}
//             <div className="controls">
//                 <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
//                 <button onClick={insertionSort} disabled={isSorting}>Start Sort</button>
//                 <button onClick={fastInsertionSort} disabled={isSorting}>Fast Sort</button>
//             </div>

//             {/* Documentation Table */}
//             <h2>Notations Documentation</h2>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Notation</th>
//                         <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>n</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>Number of elements in the array</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>i</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the outer loop</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>j</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the inner loop</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>key</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>Element currently being compared for insertion</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>arr[]</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>The array being sorted</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// // export default InsertionSort;
// import React, { useState, useEffect, useCallback, useRef } from 'react';

// const InsertionSort = () => {
//   const [array, setArray] = useState([]);
//   const [arraySize, setArraySize] = useState(50);
//   const [isSorting, setIsSorting] = useState(false);
//   const stopRef = useRef(false); // Used to stop sorting

//   const resetArray = useCallback(() => {
//     if (isSorting) return;
//     const newArray = Array.from({ length: arraySize }, () =>
//       Math.floor(Math.random() * 500)
//     );
//     setArray(newArray);
//   }, [arraySize, isSorting]);

//   useEffect(() => {
//     resetArray();
//   }, [resetArray]);

//   // Insertion Sort with ability to stop
//   const insertionSort = async () => {
//     setIsSorting(true);
//     stopRef.current = false; // Reset stop flag

//     const arr = [...array];
//     for (let i = 1; i < arr.length; i++) {
//       if (stopRef.current) break;

//       const key = arr[i];
//       let j = i - 1;

//       while (j >= 0 && arr[j] > key) {
//         if (stopRef.current) break;

//         arr[j + 1] = arr[j];
//         setArray([...arr]);
//         await new Promise((resolve) => setTimeout(resolve, 100));
//         j--;
//       }
//       arr[j + 1] = key;
//     }

//     setIsSorting(false);
//     stopRef.current = false;
//   };

//   const fastInsertionSort = () => {
//     const sortedArray = [...array];
//     for (let i = 1; i < sortedArray.length; i++) {
//       const key = sortedArray[i];
//       let j = i - 1;

//       while (j >= 0 && sortedArray[j] > key) {
//         sortedArray[j + 1] = sortedArray[j];
//         j--;
//       }
//       sortedArray[j + 1] = key;
//     }
//     setArray(sortedArray);
//   };

//   const stopSorting = () => {
//     stopRef.current = true;
//     setIsSorting(false);
//   };

//   const handleArraySizeChange = (e) => {
//     setArraySize(Number(e.target.value));
//     resetArray();
//   };

//   return (
//     <div>
//       <h1>Insertion Sort Visualizer</h1>

//       <div className="array-size-control">
//         <label>Array Size: {arraySize}</label>
//         <input
//           type="range"
//           min="10"
//           max="200"
//           value={arraySize}
//           onChange={handleArraySizeChange}
//           disabled={isSorting}
//         />
//       </div>

//       <div className="visualization-wrapper">
//         <div className="array-container">
//           {array.map((value, idx) => (
//             <div
//               className="array-bar"
//               key={idx}
//               style={{ height: `${value}px` }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       <div className="controls">
//         <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
//         <button onClick={insertionSort} disabled={isSorting}>Start Sort</button>
//         <button onClick={fastInsertionSort} disabled={isSorting}>Fast Sort</button>
//         <button onClick={stopSorting} disabled={!isSorting}>Stop</button>
//       </div>

//       <h2>Notations Documentation</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Notation</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr><td>n</td><td>Number of elements in the array</td></tr>
//           <tr><td>i</td><td>Current index in the outer loop</td></tr>
//           <tr><td>j</td><td>Current index in the inner loop</td></tr>
//           <tr><td>key</td><td>Element currently being compared for insertion</td></tr>
//           <tr><td>arr[]</td><td>The array being sorted</td></tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InsertionSort;
import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `// JavaScript Insertion Sort
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  python: `# Python Insertion Sort
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  java: `// Java Insertion Sort
public class InsertionSort {
  public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      int key = arr[i];
      int j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }
}`,
  cpp: `// C++ Insertion Sort
void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`
};

const genericDescription = `Insertion sort works by building a sorted portion of the array one element at a time. 
It picks the next element and inserts it into the correct position relative to the already sorted elements, 
shifting larger elements one position to the right. This process continues until the entire array is sorted.`;

const InsertionSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [codeLang, setCodeLang] = useState('javascript');
  const stopRef = useRef(false);

  const resetArray = useCallback(() => {
    if (isSorting) return;
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 500)
    );
    setArray(newArray);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  // Slow insertion sort with animation and stop ability
  const insertionSort = async () => {
    setIsSorting(true);
    stopRef.current = false;

    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      if (stopRef.current) break;

      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        if (stopRef.current) break;

        arr[j + 1] = arr[j];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 100));
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]); // Update after insertion
    }

    setIsSorting(false);
    stopRef.current = false;
  };

  // Fast insertion sort interrupts animation and sorts immediately
  const fastInsertionSort = () => {
    if (isSorting) {
      stopRef.current = true; // Stop slow animation
    }
    setIsSorting(true);

    const sortedArray = [...array];
    for (let i = 1; i < sortedArray.length; i++) {
      const key = sortedArray[i];
      let j = i - 1;

      while (j >= 0 && sortedArray[j] > key) {
        sortedArray[j + 1] = sortedArray[j];
        j--;
      }
      sortedArray[j + 1] = key;
    }

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
      <h1>Insertion Sort Visualizer</h1>

      <div className="array-size-control">
        <label>Array Size: {arraySize}</label>
        <input
          type="range"
          min="10"
          max="200"
          value={arraySize}
          onChange={handleArraySizeChange}
          disabled={isSorting}
        />
      </div>

      <div className="visualization-wrapper">
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={insertionSort} disabled={isSorting}>Start Sort</button>
        <button onClick={fastInsertionSort} disabled={isSorting}>Fast Sort</button>
        <button onClick={stopSorting} disabled={!isSorting}>Stop</button>
      </div>

      <h2>Notations Documentation</h2>
      <table>
        <thead>
          <tr>
            <th>Notation</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>n</td><td>Number of elements in the array</td></tr>
          <tr><td>i</td><td>Current index in the outer loop</td></tr>
          <tr><td>j</td><td>Current index in the inner loop</td></tr>
          <tr><td>key</td><td>Element currently being compared for insertion</td></tr>
          <tr><td>arr[]</td><td>The array being sorted</td></tr>
        </tbody>
      </table>

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

export default InsertionSort;
