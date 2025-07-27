import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function shellSort(arr) {
    const n = arr.length;
    
    // Start with a large gap and reduce it
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // Do insertion sort for elements at gap intervals
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j;
        
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          arr[j] = arr[j - gap];
        }
        arr[j] = temp;
      }
    }
    
    return arr;
  }`,
  python: `def shell_sort(arr):
    n = len(arr)
    
    # Start with a large gap and reduce it
    gap = n // 2
    while gap > 0:
        # Do insertion sort for elements at gap intervals
        for i in range(gap, n):
            temp = arr[i]
            j = i
            
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            
            arr[j] = temp
        
        gap //= 2
    
    return arr`,
  java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    
    // Start with a large gap and reduce it
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Do insertion sort for elements at gap intervals
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,
  cpp: `void shellSort(int arr[], int n) {
    // Start with a large gap and reduce it
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Do insertion sort for elements at gap intervals
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`
};

const genericDescription = `Shell Sort is an optimization of insertion sort that allows the exchange of items that are far apart. It works by comparing elements separated by a gap of several positions, which allows elements to move faster to their correct position. The gap starts large and is reduced until it becomes 1, at which point the algorithm becomes a regular insertion sort. Shell Sort has a time complexity that depends on the gap sequence used, typically ranging from O(n log n) to O(n²).`;

const ShellSort = () => {
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
    gap: -1, 
    i: -1, 
    j: -1, 
    temp: -1 
  });
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
    setCurrentIndices({ gap: -1, i: -1, j: -1, temp: -1 });
    setSortingHistory([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const shellSortAnimated = async () => {
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
    
    // Start with a large gap and reduce it
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      if (stopRef.current) break;
      
      setCurrentIndices({ gap, i: -1, j: -1, temp: -1 });
      
      // Do insertion sort for elements at gap intervals
      for (let i = gap; i < n; i++) {
        if (stopRef.current) break;
        
        // Check for pause
        while (pauseRef.current && !stopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const temp = arr[i];
        let j;
        setCurrentIndices({ gap, i, j: i, temp: i });
        
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          if (stopRef.current) break;
          
          comparisons++;
          swaps++;
          setCurrentIndices({ gap, i, j, temp: i });
          setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
          
          arr[j] = arr[j - gap];
          setArray([...arr]);
          
          // Save to history
          history.push({
            array: [...arr],
            indices: { gap, i, j, temp: i },
            stats: { comparisons, swaps, iterations }
          });
          
          await new Promise(resolve => {
            animationRef.current = setTimeout(resolve, 1000 / speed);
          });
        }
        
        arr[j] = temp;
        setArray([...arr]);
        iterations++;
        setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
      }
    }

    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      comparisons, 
      swaps, 
      iterations,
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ gap: -1, i: -1, j: -1, temp: -1 });
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
    setCurrentIndices({ gap: -1, i: -1, j: -1, temp: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ gap: -1, i: -1, j: -1, temp: -1 });
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
    if (currentIndices.temp === index) {
      return 'array-bar pivot';
    }
    if (currentIndices.j === index) {
      return 'array-bar comparing';
    }
    if (currentIndices.i === index) {
      return 'array-bar swapping';
    }
    if (index % currentIndices.gap === 0 && currentIndices.gap > 0) {
      return 'array-bar sorted';
    }
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Shell Sort Visualizer</h1>
      
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
          <button onClick={shellSortAnimated} className="success">
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
        <h3>Shell Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Start with a large gap (typically n/2)</li>
            <li>Compare and swap elements separated by the gap</li>
            <li>Reduce the gap (typically by dividing by 2)</li>
            <li>Continue until gap becomes 1 (insertion sort)</li>
            <li>This allows elements to move faster to their correct positions</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Shell Sort Implementation</h2>
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
              <td>O(n log n)</td>
              <td>O(1)</td>
              <td>Array is already sorted</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n^1.3)</td>
              <td>O(1)</td>
              <td>Depends on gap sequence</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n²)</td>
              <td>O(1)</td>
              <td>Poor gap sequence</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShellSort; 