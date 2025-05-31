// import React, { useState, useEffect, useCallback } from 'react';
// // import './SortingVisualizer.css';

// const MergeSort = () => {
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

//     // Merge Sort with Animation
//     const mergeSort = async (arr) => {
//         if (arr.length <= 1) return arr;

//         const mid = Math.floor(arr.length / 2);
//         const left = await mergeSort(arr.slice(0, mid));
//         const right = await mergeSort(arr.slice(mid));

//         return merge(left, right);
//     };

//     const merge = async (left, right) => {
//         const result = [];
//         let i = 0;
//         let j = 0;

//         while (i < left.length && j < right.length) {
//             if (left[i] < right[j]) {
//                 result.push(left[i]);
//                 i++;
//             } else {
//                 result.push(right[j]);
//                 j++;
//             }
//             setArray((prevArray) => {
//                 const newArray = [...prevArray];
//                 newArray.splice(i + j, 1, result[result.length - 1]);
//                 return newArray;
//             });
//             await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
//         }

//         return [...result, ...left.slice(i), ...right.slice(j)];
//     };

//     // Start the sorting process
//     const startMergeSort = async () => {
//         setIsSorting(true);
//         const sortedArray = await mergeSort(array);
//         setArray(sortedArray);
//         setIsSorting(false);
//     };

//     // Fast Merge Sort (instant sorting without animation)
//     const fastMergeSort = () => {
//         const sortedArray = mergeSortInstant(array);
//         setArray(sortedArray);
//     };

//     const mergeSortInstant = (arr) => {
//         if (arr.length <= 1) return arr;
//         const mid = Math.floor(arr.length / 2);
//         return mergeInstant(mergeSortInstant(arr.slice(0, mid)), mergeSortInstant(arr.slice(mid)));
//     };

//     const mergeInstant = (left, right) => {
//         const result = [];
//         let i = 0;
//         let j = 0;
//         while (i < left.length && j < right.length) {
//             if (left[i] < right[j]) {
//                 result.push(left[i]);
//                 i++;
//             } else {
//                 result.push(right[j]);
//                 j++;
//             }
//         }
//         return [...result, ...left.slice(i), ...right.slice(j)];
//     };

//     // Update array size based on scrollbar
//     const handleArraySizeChange = (e) => {
//         setArraySize(Number(e.target.value));
//         resetArray();
//     };

//     return (
//         <div>
//             <h1>Merge Sort Visualizer</h1>

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
//                 <button onClick={startMergeSort} disabled={isSorting}>Start Sort</button>
//                 <button onClick={fastMergeSort} disabled={isSorting}>Fast Sort</button>
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
//                         <td style={{ border: '1px solid black', padding: '8px' }}>mid</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>Middle index for dividing the array</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>left</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>Left half of the array being merged</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>right</td>
//                         <td style={{ border: '1px solid black', padding: '8px' }}>Right half of the array being merged</td>
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

// export default MergeSort;
import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `// JavaScript Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
  python: `# Python Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  java: `// Java Merge Sort
public class MergeSort {
  public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
  }
  public static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result[k++] = left[i++];
      } else {
        result[k++] = right[j++];
      }
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
  }
}`,
  cpp: `// C++ Merge Sort
void mergeSort(std::vector<int>& arr) {
  if (arr.size() <= 1) return;
  int mid = arr.size() / 2;
  std::vector<int> left(arr.begin(), arr.begin() + mid);
  std::vector<int> right(arr.begin() + mid, arr.end());
  mergeSort(left);
  mergeSort(right);
  merge(arr, left, right);
}
void merge(std::vector<int>& arr, std::vector<int>& left, std::vector<int>& right) {
  int i = 0, j = 0, k = 0;
  while (i < left.size() && j < right.size()) {
    if (left[i] < right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];
  }
  while (i < left.size()) arr[k++] = left[i++];
  while (j < right.size()) arr[k++] = right[j++];
}`
};

const genericDescription = `Merge sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts each half, and then merges the sorted halves to produce a sorted array. It has a time complexity of O(n log n) in all cases.`;

const MergeSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [codeLang, setCodeLang] = useState('javascript');
  const stopRef = useRef(false);

  const resetArray = useCallback(() => {
    if (isSorting) return;
    stopRef.current = false; // reset stop flag on new array generation
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 500)
    );
    setArray(newArray);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  // Animated merge sort with ability to stop
  const mergeSort = async (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    if (stopRef.current) return left;

    const right = await mergeSort(arr.slice(mid));
    if (stopRef.current) return right;

    return merge(left, right);
  };

  const merge = async (left, right) => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (stopRef.current) break;

      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }

      setArray((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(i + j - 1, 1, result[result.length - 1]);
        return newArray;
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (!stopRef.current) {
      const merged = [...result, ...left.slice(i), ...right.slice(j)];
      return merged;
    } else {
      return [...result, ...left.slice(i), ...right.slice(j)];
    }
  };

  const startMergeSort = async () => {
    setIsSorting(true);
    stopRef.current = false;
    const sortedArray = await mergeSort(array);
    if (!stopRef.current) setArray(sortedArray);
    setIsSorting(false);
    stopRef.current = false;
  };

  // Instant merge sort without animation
  const fastMergeSort = () => {
    setIsSorting(true);
    stopRef.current = true; // Stop any ongoing animation immediately

    const mergeSortInstant = (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      return mergeInstant(
        mergeSortInstant(arr.slice(0, mid)),
        mergeSortInstant(arr.slice(mid))
      );
    };

    const mergeInstant = (left, right) => {
      const result = [];
      let i = 0, j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      return [...result, ...left.slice(i), ...right.slice(j)];
    };

    const sortedArray = mergeSortInstant(array);
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
      <h1>Merge Sort Visualizer</h1>

      {/* Array size scrollbar */}
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

      {/* Array display */}
      <div className="array-container" style={{ display: 'flex', alignItems: 'flex-end', height: '300px', marginBottom: '20px' }}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              width: `${300 / arraySize}px`,
              backgroundColor: '#4caf50',
              margin: '0 1px',
            }}
          />
        ))}
      </div>

      {/* Control buttons */}
      <div className="controls" style={{ marginBottom: '20px' }}>
        <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={startMergeSort} disabled={isSorting}>Start Sort</button>
        <button onClick={fastMergeSort} disabled={isSorting}>Fast Sort</button>
        <button onClick={stopSorting} disabled={!isSorting}>Stop</button>
      </div>

      {/* Documentation Table */}
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
            <td style={{ border: '1px solid black', padding: '8px' }}>mid</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Middle index for dividing the array</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>left</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Left half of the array being merged</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>right</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Right half of the array being merged</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>arr[]</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The array being sorted</td>
          </tr>
        </tbody>
      </table>

      {/* Code section with description and language selector */}
      <h2>Merge Sort Description & Code</h2>
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

export default MergeSort;
