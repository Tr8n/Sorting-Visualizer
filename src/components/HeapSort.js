import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function heapSort(arr) {
  const n = arr.length;

  function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }
}`,
  python: `def heap_sort(arr):
    n = len(arr)

    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)

    for i in range(n//2 - 1, -1, -1):
        heapify(n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)`,
  java: `public void heapSort(int[] arr) {
    int n = arr.length;

    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

private void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}`,
  cpp: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
};

const genericDescription = `Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It works by first building a max heap from the array, then repeatedly extracting the maximum element from the heap and placing it at the end of the array. The algorithm has a consistent time complexity of O(n log n) in all cases and is an in-place sorting algorithm, meaning it doesn't require additional memory proportional to the input size.`;

const HeapSort = () => {
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
    left: -1, 
    right: -1, 
    largest: -1 
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
    setCurrentIndices({ current: -1, left: -1, right: -1, largest: -1 });
    setSortingHistory([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setCurrentIndices({ current: i, left, right, largest });

    if (left < n) {
      setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
      if (arr[left] > arr[largest]) {
        largest = left;
        setCurrentIndices({ current: i, left, right, largest });
      }
    }

    if (right < n) {
      setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
      if (arr[right] > arr[largest]) {
        largest = right;
        setCurrentIndices({ current: i, left, right, largest });
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
      setArray([...arr]);
      
      // Save to history
      setSortingHistory(prev => [...prev, {
        array: [...arr],
        indices: { current: i, left, right, largest },
        stats: { ...stats, swaps: stats.swaps + 1 }
      }]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
      
      await heapify(arr, n, largest);
    }
  };

  const heapSortAnimated = async () => {
    setIsSorting(true);
    setIsPaused(false);
    stopRef.current = false;
    pauseRef.current = false;
    const arr = [...array];
    const n = arr.length;
    const startTime = performance.now();
    let iterations = 0;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      await heapify(arr, n, i);
      iterations++;
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
      setArray([...arr]);
      
      // Save to history
      setSortingHistory(prev => [...prev, {
        array: [...arr],
        indices: { current: 0, left: -1, right: -1, largest: i },
        stats: { ...stats, swaps: stats.swaps + 1 }
      }]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
      
      await heapify(arr, i, 0);
      iterations++;
    }

    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      iterations,
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ current: -1, left: -1, right: -1, largest: -1 });
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
    setCurrentIndices({ current: -1, left: -1, right: -1, largest: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ current: -1, left: -1, right: -1, largest: -1 });
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
    if (currentIndices.current === index) {
      return 'array-bar comparing';
    }
    if (currentIndices.left === index) {
      return 'array-bar swapping';
    }
    if (currentIndices.right === index) {
      return 'array-bar swapping';
    }
    if (currentIndices.largest === index) {
      return 'array-bar pivot';
    }
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Heap Sort Visualizer</h1>
      
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
          <button onClick={heapSortAnimated} className="success">
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
        <h3>Heap Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Build a max heap from the array</li>
            <li>Repeatedly extract the maximum element</li>
            <li>Place it at the end of the array</li>
            <li>Maintain the heap property after each extraction</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Heap Sort Implementation</h2>
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
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n log n)</td>
              <td>O(1)</td>
              <td>Always the same</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n log n)</td>
              <td>O(1)</td>
              <td>Always the same</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeapSort;
