import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SortingVisualizer.css';

const codeSnippets = {
  javascript: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
  python: `def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr`,
  java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
  cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx != i) {
            std::swap(arr[i], arr[minIdx]);
        }
    }
}`
};

const genericDescription = `Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum element from the unsorted part of the array and placing it at the beginning. The algorithm maintains two subarrays: one that is sorted and one that is unsorted. In each iteration, it finds the minimum element from the unsorted subarray and swaps it with the first element of the unsorted subarray. Selection Sort has a time complexity of O(n²) in all cases, making it inefficient for large datasets.`;

const SelectionSort = () => {
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
  const [currentIndices, setCurrentIndices] = useState({ i: -1, j: -1, minIdx: -1 });
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
    setCurrentIndices({ i: -1, j: -1, minIdx: -1 });
    setSortingHistory([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const selectionSortAnimated = async () => {
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

    for (let i = 0; i < arr.length - 1; i++) {
      if (stopRef.current) break;
      
      let minIdx = i;
      setCurrentIndices({ i, j: -1, minIdx });
      
      for (let j = i + 1; j < arr.length; j++) {
        if (stopRef.current) break;
        
        // Check for pause
        while (pauseRef.current && !stopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        comparisons++;
        setCurrentIndices({ i, j, minIdx });
        setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setCurrentIndices({ i, j, minIdx });
        }
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 1000 / speed);
        });
      }
      
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        setArray([...arr]);
        setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
        
        // Save to history
        history.push({
          array: [...arr],
          indices: { i, j: -1, minIdx },
          stats: { comparisons, swaps, iterations }
        });
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 1000 / speed);
        });
      }
      
      iterations++;
    }

    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      comparisons, 
      swaps, 
      iterations,
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ i: -1, j: -1, minIdx: -1 });
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
    setCurrentIndices({ i: -1, j: -1, minIdx: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ i: -1, j: -1, minIdx: -1 });
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
    if (currentIndices.i === index) {
      return 'array-bar comparing';
    }
    if (currentIndices.j === index) {
      return 'array-bar swapping';
    }
    if (currentIndices.minIdx === index) {
      return 'array-bar pivot';
    }
    if (index < currentIndices.i) {
      return 'array-bar sorted';
    }
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Selection Sort Visualizer</h1>
      
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
          <button onClick={selectionSortAnimated} className="success">
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
        <h3>Selection Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Find the minimum element in the unsorted portion</li>
            <li>Swap it with the first element of the unsorted portion</li>
            <li>Move the boundary between sorted and unsorted portions</li>
            <li>Repeat until the entire array is sorted</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Selection Sort Implementation</h2>
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
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Always the same</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectionSort;
