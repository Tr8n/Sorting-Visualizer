import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function countingSort(arr) {
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    // Create count array and output array
    const count = new Array(range).fill(0);
    const output = new Array(n).fill(0);
    
    // Store count of each element
    for (let i = 0; i < n; i++) {
        count[arr[i] - min]++;
    }
    
    // Change count[i] so that it contains position of this element
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    // Copy the output array back to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
    
    return arr;
}`,
  python: `def counting_sort(arr):
    n = len(arr)
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    # Create count array and output array
    count = [0] * range_val
    output = [0] * n
    
    # Store count of each element
    for i in range(n):
        count[arr[i] - min_val] += 1
    
    # Change count[i] so that it contains position
    for i in range(1, range_val):
        count[i] += count[i - 1]
    
    # Build the output array
    for i in range(n - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    # Copy back to original array
    for i in range(n):
        arr[i] = output[i]
    
    return arr`,
  java: `public static void countingSort(int[] arr) {
    int n = arr.length;
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    
    // Create count array and output array
    int[] count = new int[range];
    int[] output = new int[n];
    
    // Store count of each element
    for (int i = 0; i < n; i++) {
        count[arr[i] - min]++;
    }
    
    // Change count[i] so that it contains position
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    // Copy back to original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`,
  cpp: `void countingSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    int min = *min_element(arr, arr + n);
    int range = max - min + 1;
    
    // Create count array and output array
    int count[range] = {0};
    int output[n];
    
    // Store count of each element
    for (int i = 0; i < n; i++) {
        count[arr[i] - min]++;
    }
    
    // Change count[i] so that it contains position
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    // Copy back to original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`
};

const genericDescription = `Counting Sort is a non-comparison based sorting algorithm that works by counting the number of objects having distinct key values. It operates by counting the number of objects that have each distinct key value, and using arithmetic on those counts to determine the positions of each key value in the output sequence. Counting Sort is efficient when the range of input data is not significantly greater than the number of objects to be sorted. It has a time complexity of O(n + k) where n is the number of elements and k is the range of input.`;

const CountingSort = () => {
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
  const [currentIndices, setCurrentIndices] = useState({ 
    current: -1, 
    countIndex: -1, 
    outputIndex: -1 
  });
  const [sortingHistory, setSortingHistory] = useState([]);
  const [countArray, setCountArray] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
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
    setCurrentIndices({ current: -1, countIndex: -1, outputIndex: -1 });
    setSortingHistory([]);
    setCountArray([]);
    setOutputArray([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const countingSortAnimated = async () => {
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

    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    // Create count array and output array
    const count = new Array(range).fill(0);
    const output = new Array(n).fill(0);
    
    setCountArray([...count]);
    setOutputArray([...output]);
    
    // Store count of each element
    for (let i = 0; i < n; i++) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices({ current: i, countIndex: arr[i] - min, outputIndex: -1 });
      count[arr[i] - min]++;
      setCountArray([...count]);
      setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
      
      // Save to history
      history.push({
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: i, countIndex: arr[i] - min, outputIndex: -1 },
        stats: { comparisons, swaps, iterations }
      });
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Change count[i] so that it contains position
    for (let i = 1; i < range; i++) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices({ current: -1, countIndex: i, outputIndex: -1 });
      count[i] += count[i - 1];
      setCountArray([...count]);
      setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
      
      // Save to history
      history.push({
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: -1, countIndex: i, outputIndex: -1 },
        stats: { comparisons, swaps, iterations }
      });
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const outputIndex = count[arr[i] - min] - 1;
      setCurrentIndices({ current: i, countIndex: arr[i] - min, outputIndex });
      output[outputIndex] = arr[i];
      count[arr[i] - min]--;
      setCountArray([...count]);
      setOutputArray([...output]);
      swaps++;
      setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
      
      // Save to history
      history.push({
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: i, countIndex: arr[i] - min, outputIndex },
        stats: { comparisons, swaps, iterations }
      });
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Copy the output array back to original array
    for (let i = 0; i < n; i++) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices({ current: i, countIndex: -1, outputIndex: i });
      arr[i] = output[i];
      setArray([...arr]);
      swaps++;
      iterations++;
      setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
      
      // Save to history
      history.push({
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: i, countIndex: -1, outputIndex: i },
        stats: { comparisons, swaps, iterations }
      });
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }

    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      comparisons, 
      swaps, 
      iterations,
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ current: -1, countIndex: -1, outputIndex: -1 });
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
    setCurrentIndices({ current: -1, countIndex: -1, outputIndex: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ current: -1, countIndex: -1, outputIndex: -1 });
  };

  const stepBack = () => {
    if (sortingHistory.length > 0) {
      const lastStep = sortingHistory[sortingHistory.length - 1];
      setArray(lastStep.array);
      setCountArray(lastStep.countArray);
      setOutputArray(lastStep.outputArray);
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
    if (currentIndices.current === index) {
      return 'array-bar comparing';
    }
    if (currentIndices.outputIndex === index) {
      return 'array-bar swapping';
    }
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Counting Sort Visualizer</h1>
      
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

      {/* Count Array Visualization (if available) */}
      {countArray.length > 0 && (
        <div className="description">
          <h4>Count Array:</h4>
          <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '10px' }}>
            {countArray.map((count, idx) => (
              <div
                key={idx}
                style={{
                  background: currentIndices.countIndex === idx ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  minWidth: '30px',
                  textAlign: 'center'
                }}
                title={`Value ${idx}: Count ${count}`}
              >
                {count}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="controls">
        <button onClick={resetArray} disabled={isSorting} className="primary">
          {isSorting ? <span className="loading"></span> : '🔄 Generate New Array'}
        </button>
        
        {!isSorting ? (
          <button onClick={countingSortAnimated} className="success">
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
        <h3>Counting Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Find the range of input data (min and max values)</li>
            <li>Create a count array to store frequency of each element</li>
            <li>Modify count array to store actual positions</li>
            <li>Build output array by placing elements in correct positions</li>
            <li>Copy output array back to original array</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Counting Sort Implementation</h2>
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
              <td>O(n + k)</td>
              <td>O(k)</td>
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n + k)</td>
              <td>O(k)</td>
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n + k)</td>
              <td>O(k)</td>
              <td>Always the same</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountingSort; 