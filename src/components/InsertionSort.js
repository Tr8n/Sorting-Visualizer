import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function insertionSort(arr) {
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
  python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr`,
  java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  cpp: `void insertionSort(int arr[], int n) {
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

const genericDescription = `Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It works by taking each element from the unsorted portion and inserting it into its correct position in the sorted portion. The algorithm is efficient for small data sets and is often used as part of more sophisticated algorithms. Insertion Sort has a best-case time complexity of O(n) when the array is already sorted, and worst-case complexity of O(n²) when the array is reverse sorted.`;

const InsertionSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [codeLang, setCodeLang] = useState('javascript');
  const [speed, setSpeed] = useState(50);
  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0,
    iterations: 0
  });
  const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1, key: -1 });
  const [sortingHistory, setSortingHistory] = useState([]);
  const stopRef = useRef(false);
  const pauseRef = useRef(false);
  const animationRef = useRef(null);

  const resetArray = useCallback(() => {
    if (isSorting) return;
    stopRef.current = false;
    pauseRef.current = false;
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 400) + 10);
    setArray(newArray);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, iterations: 0 });
    setCurrentIndices({ i: -1, j: -1, key: -1 });
    setSortingHistory([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const insertionSortAnimated = async () => {
    setIsSorting(true);
    setIsPaused(false);
    stopRef.current = false;
    pauseRef.current = false;
    const arr = [...array];
    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0;
    let iterations = 0;
    const history = [];

    for (let i = 1; i < arr.length; i++) {
      if (stopRef.current) break;
      
      const key = arr[i];
      let j = i - 1;
      setCurrentIndices({ i, j, key: i });
      
      while (j >= 0 && arr[j] > key) {
        if (stopRef.current) break;
        
        // Check for pause
        while (pauseRef.current && !stopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        comparisons++;
        swaps++;
        setCurrentIndices({ i, j, key: i });
        setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
        
        arr[j + 1] = arr[j];
        setArray([...arr]);
        
        // Save to history
        history.push({
          array: [...arr],
          indices: { i, j, key: i },
          stats: { comparisons, swaps, iterations }
        });
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 1000 / speed);
        });
        
        j--;
      }
      
      arr[j + 1] = key;
      setArray([...arr]);
      iterations++;
      setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
    }

    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      comparisons, 
      swaps, 
      iterations,
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ i: -1, j: -1, key: -1 });
    setIsSorting(false);
    setIsPaused(false);
    setSortingHistory(history);
  };

  const pauseSorting = () => {
    pauseRef.current = true;
    setIsPaused(true);
  };

  const resumeSorting = () => {
    pauseRef.current = false;
    setIsPaused(false);
  };

  const fastSort = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(true);
    const sortedArray = [...array].sort((a, b) => a - b);
    setArray(sortedArray);
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ i: -1, j: -1, key: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ i: -1, j: -1, key: -1 });
  };

  const stepBack = () => {
    if (sortingHistory.length > 0) {
      const lastStep = sortingHistory[sortingHistory.length - 1];
      setArray(lastStep.array);
      setCurrentIndices(lastStep.indices);
      setStats(lastStep.stats);
      setSortingHistory(prev => prev.slice(0, -1));
    }
  };

  const handleArraySizeChange = (e) => {
    setArraySize(Number(e.target.value));
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  const getBarClass = (index) => {
    if (currentIndices.key === index) {
      return 'array-bar pivot';
    }
    if (currentIndices.j === index) {
      return 'array-bar comparing';
    }
    if (currentIndices.i === index) {
      return 'array-bar swapping';
    }
    if (index < currentIndices.i) {
      return 'array-bar sorted';
    }
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Insertion Sort Visualizer</h1>
      
      {/* Stats Display */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{stats.comparisons}</div>
          <div className="stat-label">Comparisons</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.swaps}</div>
          <div className="stat-label">Swaps</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.timeElapsed}ms</div>
          <div className="stat-label">Time Elapsed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.iterations}</div>
          <div className="stat-label">Iterations</div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="control-group">
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
        
        <div className="control-group">
          <label>Speed: {speed}x</label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={handleSpeedChange}
            disabled={isSorting}
          />
        </div>
      </div>

      {/* Array Visualization */}
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className={getBarClass(idx)}
            key={idx}
            style={{
              height: `${value}px`,
              width: `${Math.max(4, 800 / arraySize)}px`,
              minWidth: '4px',
              maxWidth: '20px',
            }}
            title={`Index ${idx}: ${value}`}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="controls">
        <button onClick={resetArray} disabled={isSorting} className="primary">
          {isSorting ? <span className="loading"></span> : '🔄 Generate New Array'}
        </button>
        
        {!isSorting ? (
          <button onClick={insertionSortAnimated} className="success">
            ▶️ Start Sort
          </button>
        ) : (
          <>
            {!isPaused ? (
              <button onClick={pauseSorting} className="primary">
                ⏸️ Pause
              </button>
            ) : (
              <button onClick={resumeSorting} className="success">
                ▶️ Resume
              </button>
            )}
            <button onClick={stopSorting} className="danger">
              ⏹️ Stop
            </button>
          </>
        )}
        
        <button onClick={fastSort} disabled={isSorting}>
          ⚡ Fast Sort
        </button>
        
        <button onClick={stepBack} disabled={sortingHistory.length === 0 || isSorting}>
          ↩️ Step Back
        </button>
      </div>

      {/* Algorithm Description */}
      <div className="description">
        <h3>Insertion Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Start with the second element (index 1)</li>
            <li>Compare it with the previous elements</li>
            <li>Insert it into the correct position in the sorted portion</li>
            <li>Shift larger elements to make space</li>
            <li>Repeat for all remaining elements</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Insertion Sort Implementation</h2>
        <p className="algorithm-description">{genericDescription}</p>
        <select
          value={codeLang}
          onChange={(e) => setCodeLang(e.target.value)}
          aria-label="Select programming language"
          disabled={isSorting}
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

      {/* Complexity Table */}
      <div className="description">
        <h3>Time & Space Complexity</h3>
        <table>
          <thead>
            <tr>
              <th>Case</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Best Case</td>
              <td>O(n)</td>
              <td>O(1)</td>
              <td>Array is already sorted</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Random array</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Array is reverse sorted</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsertionSort;
