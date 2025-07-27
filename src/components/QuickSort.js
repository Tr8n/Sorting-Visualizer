import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
  python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
  java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
  cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}`
};

const genericDescription = `Quick Sort is a highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. Quick Sort has excellent average-case performance of O(n log n) and is often faster in practice than other O(n log n) algorithms.`;

const QuickSort = () => {
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
    partitions: 0
  });
  const [currentIndices, setCurrentIndices] = useState({ 
    pivot: -1, 
    left: -1, 
    right: -1,
    partitionIndex: -1 
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
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, partitions: 0 });
    setCurrentIndices({ pivot: -1, left: -1, right: -1, partitionIndex: -1 });
    setSortingHistory([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    
    setCurrentIndices(prev => ({ ...prev, pivot: high }));
    
    for (let j = low; j < high; j++) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices(prev => ({ ...prev, left: j, right: i + 1 }));
      setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
      
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
        setArray([...arr]);
        
        // Save to history
        setSortingHistory(prev => [...prev, {
          array: [...arr],
          indices: { pivot: high, left: j, right: i, partitionIndex: -1 },
          stats: { ...stats, swaps: stats.swaps + 1 }
        }]);
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 1000 / speed);
        });
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
    setArray([...arr]);
    
    setCurrentIndices(prev => ({ ...prev, partitionIndex: i + 1 }));
    setStats(prev => ({ ...prev, partitions: prev.partitions + 1 }));
    
    await new Promise(resolve => {
      animationRef.current = setTimeout(resolve, 1000 / speed);
    });
    
    return i + 1;
  };

  const quickSortRecursive = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortRecursive(arr, low, pi - 1);
      await quickSortRecursive(arr, pi + 1, high);
    }
  };

  const quickSortAnimated = async () => {
    setIsSorting(true);
    setIsPaused(false);
    stopRef.current = false;
    pauseRef.current = false;
    const arr = [...array];
    const startTime = performance.now();
    
    await quickSortRecursive(arr, 0, arr.length - 1);
    
    const endTime = performance.now();
    setStats(prev => ({ 
      ...prev, 
      timeElapsed: Math.round(endTime - startTime)
    }));
    setCurrentIndices({ pivot: -1, left: -1, right: -1, partitionIndex: -1 });
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
    setCurrentIndices({ pivot: -1, left: -1, right: -1, partitionIndex: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ pivot: -1, left: -1, right: -1, partitionIndex: -1 });
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
    if (currentIndices.pivot === index) {
      return 'array-bar pivot';
    }
    if (currentIndices.left === index) {
      return 'array-bar comparing';
    }
    if (currentIndices.right === index) {
      return 'array-bar swapping';
    }
    if (currentIndices.partitionIndex === index) {
      return 'array-bar sorted';
    }
    return 'array-bar';
  };

  return (
    <div className="visualization-wrapper">
      <h1>Quick Sort Visualizer</h1>
      
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
          <div className="stat-value">{stats.partitions}</div>
          <div className="stat-label">Partitions</div>
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
          <button onClick={quickSortAnimated} className="success">
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
        <h3>Quick Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Choose a pivot element from the array</li>
            <li>Partition the array around the pivot</li>
            <li>Recursively sort the sub-arrays</li>
            <li>Combine the sorted sub-arrays</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Quick Sort Implementation</h2>
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
              <td>O(log n)</td>
              <td>Balanced partitioning</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n log n)</td>
              <td>O(log n)</td>
              <td>Random array</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n²)</td>
              <td>O(n)</td>
              <td>Already sorted or reverse sorted</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuickSort; 