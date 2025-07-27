import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function radixSort(arr) {
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    // Change count[i] so that it contains position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy back to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`,
  python: `def radix_sort(arr):
    max_val = max(arr)
    
    # Do counting sort for every digit
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    # Store count of occurrences
    for i in range(n):
        count[(arr[i] // exp) % 10] += 1
    
    # Change count[i] so that it contains position
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build the output array
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    # Copy back to original array
    for i in range(n):
        arr[i] = output[i]`,
  java: `public static void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    
    // Do counting sort for every digit
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}

public static void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    
    // Store count of occurrences
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }
    
    // Change count[i] so that it contains position
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy back to original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`,
  cpp: `void radixSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    
    // Do counting sort for every digit
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, n, exp);
    }
}

void countingSortByDigit(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    
    // Store count of occurrences
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }
    
    // Change count[i] so that it contains position
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy back to original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`
};

const genericDescription = `Radix Sort is a non-comparison based sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. It works by sorting the least significant digit first, then the next significant digit, and so on. Radix Sort can be applied to data that can be sorted lexicographically, such as integers, words, punch cards, etc. It has a time complexity of O(d * (n + k)) where d is the number of digits, n is the number of elements, and k is the range of digits.`;

const RadixSort = () => {
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
    digit: -1, 
    exp: 1 
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
    setCurrentIndices({ current: -1, digit: -1, exp: 1 });
    setSortingHistory([]);
    setCountArray([]);
    setOutputArray([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const countingSortByDigit = async (arr, exp) => {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    setCountArray([...count]);
    setOutputArray([...output]);
    
    // Store count of occurrences
    for (let i = 0; i < n; i++) {
      if (stopRef.current) return;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const digit = Math.floor(arr[i] / exp) % 10;
      setCurrentIndices({ current: i, digit, exp });
      count[digit]++;
      setCountArray([...count]);
      setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
      
      // Save to history
      setSortingHistory(prev => [...prev, {
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: i, digit, exp },
        stats: { ...stats, comparisons: stats.comparisons + 1 }
      }]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Change count[i] so that it contains position
    for (let i = 1; i < 10; i++) {
      if (stopRef.current) return;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices({ current: -1, digit: i, exp });
      count[i] += count[i - 1];
      setCountArray([...count]);
      
      // Save to history
      setSortingHistory(prev => [...prev, {
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: -1, digit: i, exp },
        stats
      }]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      if (stopRef.current) return;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const digit = Math.floor(arr[i] / exp) % 10;
      setCurrentIndices({ current: i, digit, exp });
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      setCountArray([...count]);
      setOutputArray([...output]);
      setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
      
      // Save to history
      setSortingHistory(prev => [...prev, {
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: i, digit, exp },
        stats: { ...stats, swaps: stats.swaps + 1 }
      }]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Copy back to original array
    for (let i = 0; i < n; i++) {
      if (stopRef.current) return;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices({ current: i, digit: -1, exp });
      arr[i] = output[i];
      setArray([...arr]);
      setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
      
      // Save to history
      setSortingHistory(prev => [...prev, {
        array: [...arr],
        countArray: [...count],
        outputArray: [...output],
        indices: { current: i, digit: -1, exp },
        stats: { ...stats, swaps: stats.swaps + 1 }
      }]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
  };

  const radixSortAnimated = async () => {
    setIsSorting(true);
    setIsPaused(false);
    stopRef.current = false;
    pauseRef.current = false;
    const arr = [...array];
    const startTime = performance.now();
    let iterations = 0;
    
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      if (stopRef.current) break;
      
      setCurrentIndices({ current: -1, digit: -1, exp });
      await countingSortByDigit(arr, exp);
      iterations++;
      setStats(prev => ({ ...prev, iterations }));
    }

    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ current: -1, digit: -1, exp: 1 });
    setIsSorting(false);
    setIsPaused(false);
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
    setCurrentIndices({ current: -1, digit: -1, exp: 1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ current: -1, digit: -1, exp: 1 });
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
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Radix Sort Visualizer</h1>
      
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
          <h4>Count Array (Digit {currentIndices.digit >= 0 ? currentIndices.digit : 'all'}):</h4>
          <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '10px' }}>
            {countArray.map((count, idx) => (
              <div
                key={idx}
                style={{
                  background: currentIndices.digit === idx ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  minWidth: '30px',
                  textAlign: 'center'
                }}
                title={`Digit ${idx}: Count ${count}`}
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
          <button onClick={radixSortAnimated} className="success">
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
        <h3>Radix Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Sort by the least significant digit first</li>
            <li>Use counting sort for each digit position</li>
            <li>Move to the next significant digit</li>
            <li>Continue until all digits are processed</li>
            <li>This ensures stable sorting by digit position</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Radix Sort Implementation</h2>
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
              <td>O(d * (n + k))</td>
              <td>O(n + k)</td>
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(d * (n + k))</td>
              <td>O(n + k)</td>
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(d * (n + k))</td>
              <td>O(n + k)</td>
              <td>Always the same</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Where d is the number of digits, n is the number of elements, and k is the range of digits (10 for decimal).
        </p>
      </div>
    </div>
  );
};

export default RadixSort; 