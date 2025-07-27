import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function timSort(arr) {
    const MIN_MERGE = 32;
    const n = arr.length;
    
    // Sort individual subarrays of size MIN_MERGE
    for (let i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
    }
    
    // Start merging from size MIN_MERGE
    for (let size = MIN_MERGE; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = Math.min(left + size - 1, n - 1);
            const right = Math.min(left + 2 * size - 1, n - 1);
            
            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }
    
    return arr;
}

function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}`,
  python: `def tim_sort(arr):
    MIN_MERGE = 32
    n = len(arr)
    
    # Sort individual subarrays of size MIN_MERGE
    for i in range(0, n, MIN_MERGE):
        insertion_sort(arr, i, min(i + MIN_MERGE - 1, n - 1))
    
    # Start merging from size MIN_MERGE
    size = MIN_MERGE
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            
            if mid < right:
                merge(arr, left, mid, right)
        size = 2 * size
    
    return arr

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, left, mid, right):
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1`,
  java: `public static void timSort(int[] arr) {
    final int MIN_MERGE = 32;
    int n = arr.length;
    
    // Sort individual subarrays of size MIN_MERGE
    for (int i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
    }
    
    // Start merging from size MIN_MERGE
    for (int size = MIN_MERGE; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = Math.min(left + size - 1, n - 1);
            int right = Math.min(left + 2 * size - 1, n - 1);
            
            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }
}

public static void insertionSort(int[] arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
    int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
    
    int i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}`,
  cpp: `void timSort(int arr[], int n) {
    const int MIN_MERGE = 32;
    
    // Sort individual subarrays of size MIN_MERGE
    for (int i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, min(i + MIN_MERGE - 1, n - 1));
    }
    
    // Start merging from size MIN_MERGE
    for (int size = MIN_MERGE; size < n; size = 2 * size) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = min(left + size - 1, n - 1);
            int right = min(left + 2 * size - 1, n - 1);
            
            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }
}

void insertionSort(int arr[], int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void merge(int arr[], int left, int mid, int right) {
    vector<int> leftArr(arr + left, arr + mid + 1);
    vector<int> rightArr(arr + mid + 1, arr + right + 1);
    
    int i = 0, j = 0, k = left;
    
    while (i < leftArr.size() && j < rightArr.size()) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < leftArr.size()) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.size()) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}`
};

const genericDescription = `Tim Sort is a hybrid sorting algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It was implemented by Tim Peters in 2002 for use in the Python programming language. Tim Sort uses insertion sort for small subarrays and merge sort for larger ones, making it adaptive and stable. It has a time complexity of O(n log n) in the worst case and can achieve O(n) in the best case when the data is already sorted or nearly sorted.`;

const TimSort = () => {
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
    left: -1, 
    mid: -1, 
    right: -1,
    current: -1 
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
    setCurrentIndices({ left: -1, mid: -1, right: -1, current: -1 });
    setSortingHistory([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const insertionSort = async (arr, left, right) => {
    for (let i = left + 1; i <= right; i++) {
      if (stopRef.current) return;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const key = arr[i];
      let j = i - 1;
      setCurrentIndices({ left, mid: i, right, current: i });
      
      while (j >= left && arr[j] > key) {
        if (stopRef.current) return;
        
        setCurrentIndices({ left, mid: j, right, current: i });
        arr[j + 1] = arr[j];
        setArray([...arr]);
        setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
        
        // Save to history
        setSortingHistory(prev => [...prev, {
          array: [...arr],
          indices: { left, mid: j, right, current: i },
          stats: { ...stats, swaps: stats.swaps + 1 }
        }]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 1000 / speed);
        });
        
        j--;
      }
      
      arr[j + 1] = key;
      setArray([...arr]);
    }
  };

  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (stopRef.current) return;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices({ left: left + i, mid, right: mid + 1 + j, current: k });
      setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      setArray([...arr]);
      setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
      
      // Save to history
      setSortingHistory(prev => [...prev, {
        array: [...arr],
        indices: { left: left + i, mid, right: mid + 1 + j, current: k },
        stats: { ...stats, comparisons: stats.comparisons + 1, swaps: stats.swaps + 1 }
      }]);
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
      
      k++;
    }
    
    while (i < leftArr.length) {
      if (stopRef.current) return;
      
      arr[k] = leftArr[i];
      setArray([...arr]);
      setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      if (stopRef.current) return;
      
      arr[k] = rightArr[j];
      setArray([...arr]);
      setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
      j++;
      k++;
    }
  };

  const timSortAnimated = async () => {
    setIsSorting(true);
    setIsPaused(false);
    stopRef.current = false;
    pauseRef.current = false;
    const arr = [...array];
    const startTime = performance.now();
    let iterations = 0;
    
    const MIN_MERGE = 32;
    const n = arr.length;
    
    // Sort individual subarrays of size MIN_MERGE
    for (let i = 0; i < n; i += MIN_MERGE) {
      if (stopRef.current) break;
      
      setCurrentIndices({ left: i, mid: -1, right: Math.min(i + MIN_MERGE - 1, n - 1), current: -1 });
      await insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
      iterations++;
      setStats(prev => ({ ...prev, iterations }));
    }
    
    // Start merging from size MIN_MERGE
    for (let size = MIN_MERGE; size < n; size = 2 * size) {
      if (stopRef.current) break;
      
      for (let left = 0; left < n; left += 2 * size) {
        if (stopRef.current) break;
        
        const mid = Math.min(left + size - 1, n - 1);
        const right = Math.min(left + 2 * size - 1, n - 1);
        
        setCurrentIndices({ left, mid, right, current: -1 });
        
        if (mid < right) {
          await merge(arr, left, mid, right);
        }
        
        iterations++;
        setStats(prev => ({ ...prev, iterations }));
      }
    }

    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ left: -1, mid: -1, right: -1, current: -1 });
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
    setCurrentIndices({ left: -1, mid: -1, right: -1, current: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ left: -1, mid: -1, right: -1, current: -1 });
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
    if (index >= currentIndices.left && index <= currentIndices.mid) {
      return 'array-bar sorted';
    }
    if (index > currentIndices.mid && index <= currentIndices.right) {
      return 'array-bar swapping';
    }
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Tim Sort Visualizer</h1>
      
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
          <button onClick={timSortAnimated} className="success">
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
        <h3>Tim Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Divide array into small chunks (typically 32 elements)</li>
            <li>Sort each chunk using insertion sort</li>
            <li>Merge adjacent chunks using merge sort</li>
            <li>Continue merging until entire array is sorted</li>
            <li>Optimized for real-world data patterns</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Tim Sort Implementation</h2>
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
              <td>O(n)</td>
              <td>Already sorted or nearly sorted</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n log n)</td>
              <td>O(n)</td>
              <td>Random data</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n log n)</td>
              <td>O(n)</td>
              <td>Reverse sorted data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimSort; 