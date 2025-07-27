import React, { useState, useEffect, useCallback, useRef } from 'react';

const codeSnippets = {
  javascript: `function bucketSort(arr) {
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min;
    const bucketCount = n;
    
    // Create buckets
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor((arr[i] - min) * (bucketCount - 1) / range);
        buckets[bucketIndex].push(arr[i]);
    }
    
    // Sort individual buckets
    for (let i = 0; i < bucketCount; i++) {
        buckets[i].sort((a, b) => a - b);
    }
    
    // Concatenate all buckets
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            arr[index++] = buckets[i][j];
        }
    }
    
    return arr;
}`,
  python: `def bucket_sort(arr):
    n = len(arr)
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val
    bucket_count = n
    
    # Create buckets
    buckets = [[] for _ in range(bucket_count)]
    
    # Distribute elements into buckets
    for i in range(n):
        bucket_index = int((arr[i] - min_val) * (bucket_count - 1) / range_val)
        buckets[bucket_index].append(arr[i])
    
    # Sort individual buckets
    for i in range(bucket_count):
        buckets[i].sort()
    
    # Concatenate all buckets
    index = 0
    for i in range(bucket_count):
        for j in range(len(buckets[i])):
            arr[index] = buckets[i][j]
            index += 1
    
    return arr`,
  java: `public static void bucketSort(int[] arr) {
    int n = arr.length;
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min;
    int bucketCount = n;
    
    // Create buckets
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i < bucketCount; i++) {
        buckets.add(new ArrayList<>());
    }
    
    // Distribute elements into buckets
    for (int i = 0; i < n; i++) {
        int bucketIndex = (int) ((arr[i] - min) * (bucketCount - 1) / range);
        buckets.get(bucketIndex).add(arr[i]);
    }
    
    // Sort individual buckets
    for (int i = 0; i < bucketCount; i++) {
        Collections.sort(buckets.get(i));
    }
    
    // Concatenate all buckets
    int index = 0;
    for (int i = 0; i < bucketCount; i++) {
        for (int j = 0; j < buckets.get(i).size(); j++) {
            arr[index++] = buckets.get(i).get(j);
        }
    }
}`,
  cpp: `void bucketSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    int min = *min_element(arr, arr + n);
    int range = max - min;
    int bucketCount = n;
    
    // Create buckets
    vector<vector<int>> buckets(bucketCount);
    
    // Distribute elements into buckets
    for (int i = 0; i < n; i++) {
        int bucketIndex = (arr[i] - min) * (bucketCount - 1) / range;
        buckets[bucketIndex].push_back(arr[i]);
    }
    
    // Sort individual buckets
    for (int i = 0; i < bucketCount; i++) {
        sort(buckets[i].begin(), buckets[i].end());
    }
    
    // Concatenate all buckets
    int index = 0;
    for (int i = 0; i < bucketCount; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i][j];
        }
    }
}`
};

const genericDescription = `Bucket Sort is a distribution sort algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm. It is useful when input is uniformly distributed over a range. Bucket Sort has an average time complexity of O(n + k) where n is the number of elements and k is the number of buckets.`;

const BucketSort = () => {
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
    bucketIndex: -1, 
    bucketElement: -1 
  });
  const [sortingHistory, setSortingHistory] = useState([]);
  const [buckets, setBuckets] = useState([]);
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
    setCurrentIndices({ current: -1, bucketIndex: -1, bucketElement: -1 });
    setSortingHistory([]);
    setBuckets([]);
    setIsPaused(false);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const bucketSortAnimated = async () => {
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
    const range = max - min;
    const bucketCount = n;
    
    // Create buckets
    const bucketsArray = Array.from({ length: bucketCount }, () => []);
    setBuckets([...bucketsArray]);
    
    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const bucketIndex = Math.floor((arr[i] - min) * (bucketCount - 1) / range);
      setCurrentIndices({ current: i, bucketIndex, bucketElement: -1 });
      bucketsArray[bucketIndex].push(arr[i]);
      setBuckets([...bucketsArray]);
      setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
      
      // Save to history
      history.push({
        array: [...arr],
        buckets: [...bucketsArray],
        indices: { current: i, bucketIndex, bucketElement: -1 },
        stats: { comparisons, swaps, iterations }
      });
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Sort individual buckets
    for (let i = 0; i < bucketCount; i++) {
      if (stopRef.current) break;
      
      // Check for pause
      while (pauseRef.current && !stopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setCurrentIndices({ current: -1, bucketIndex: i, bucketElement: -1 });
      bucketsArray[i].sort((a, b) => a - b);
      setBuckets([...bucketsArray]);
      comparisons += bucketsArray[i].length * Math.log2(bucketsArray[i].length);
      setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
      
      // Save to history
      history.push({
        array: [...arr],
        buckets: [...bucketsArray],
        indices: { current: -1, bucketIndex: i, bucketElement: -1 },
        stats: { comparisons, swaps, iterations }
      });
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, 1000 / speed);
      });
    }
    
    // Concatenate all buckets
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
      if (stopRef.current) break;
      
      for (let j = 0; j < bucketsArray[i].length; j++) {
        if (stopRef.current) break;
        
        // Check for pause
        while (pauseRef.current && !stopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        setCurrentIndices({ current: index, bucketIndex: i, bucketElement: j });
        arr[index] = bucketsArray[i][j];
        setArray([...arr]);
        swaps++;
        setStats(prev => ({ ...prev, comparisons, swaps, iterations }));
        
        // Save to history
        history.push({
          array: [...arr],
          buckets: [...bucketsArray],
          indices: { current: index, bucketIndex: i, bucketElement: j },
          stats: { comparisons, swaps, iterations }
        });
        
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, 1000 / speed);
        });
        
        index++;
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
    setCurrentIndices({ current: -1, bucketIndex: -1, bucketElement: -1 });
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
    setCurrentIndices({ current: -1, bucketIndex: -1, bucketElement: -1 });
  };

  const stopSorting = () => {
    stopRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentIndices({ current: -1, bucketIndex: -1, bucketElement: -1 });
  };

  const stepBack = () => {
    if (sortingHistory.length > 0) {
      const lastStep = sortingHistory[sortingHistory.length - 1];
      setArray(lastStep.array);
      setBuckets(lastStep.buckets);
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
      <h1>Bucket Sort Visualizer</h1>
      
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

      {/* Buckets Visualization (if available) */}
      {buckets.length > 0 && (
        <div className="description">
          <h4>Buckets:</h4>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
            {buckets.map((bucket, idx) => (
              <div
                key={idx}
                style={{
                  background: currentIndices.bucketIndex === idx ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  minWidth: '60px',
                  textAlign: 'center'
                }}
                title={`Bucket ${idx}: ${bucket.join(', ')}`}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Bucket {idx}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'white' }}>
                  {bucket.length > 0 ? bucket.join(', ') : 'empty'}
                </div>
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
          <button onClick={bucketSortAnimated} className="success">
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
        <h3>Bucket Sort Algorithm</h3>
        <p>{genericDescription}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>How it works:</h4>
          <ul>
            <li>Create n empty buckets</li>
            <li>Distribute elements into buckets based on their values</li>
            <li>Sort each bucket individually</li>
            <li>Concatenate all buckets back into the original array</li>
            <li>Works best when input is uniformly distributed</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="code-section">
        <h2>Bucket Sort Implementation</h2>
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
              <td>O(n + k)</td>
              <td>Uniform distribution</td>
            </tr>
            <tr>
              <td>Average Case</td>
              <td>O(n + k)</td>
              <td>O(n + k)</td>
              <td>Uniform distribution</td>
            </tr>
            <tr>
              <td>Worst Case</td>
              <td>O(n²)</td>
              <td>O(n + k)</td>
              <td>All elements in one bucket</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Where n is the number of elements and k is the number of buckets.
        </p>
      </div>
    </div>
  );
};

export default BucketSort; 