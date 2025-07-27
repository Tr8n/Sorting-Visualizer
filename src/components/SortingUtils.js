import React from 'react';

// Common button components for sorting algorithms
export const SortButton = ({ onClick, disabled, className, children, loading }) => (
  <button 
    onClick={onClick} 
    disabled={disabled} 
    className={className}
  >
    {loading ? <span className="loading"></span> : children}
  </button>
);

// Control group component for consistent styling
export const ControlGroup = ({ label, children }) => (
  <div className="control-group">
    <label>{label}</label>
    {children}
  </div>
);

// Stats card component
export const StatCard = ({ value, label }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

// Common sorting controls
export const SortingControls = ({ 
  isSorting, 
  isPaused, 
  onReset, 
  onStart, 
  onPause, 
  onResume, 
  onStop, 
  onFastSort, 
  onStepBack, 
  canStepBack 
}) => (
  <div className="controls">
    <SortButton 
      onClick={onReset} 
      disabled={isSorting} 
      className="primary"
      loading={isSorting}
    >
      🔄 Generate New Array
    </SortButton>
    
    {!isSorting ? (
      <SortButton onClick={onStart} className="success">
        ▶️ Start Sort
      </SortButton>
    ) : (
      <>
        {!isPaused ? (
          <SortButton onClick={onPause} className="primary">
            ⏸️ Pause
          </SortButton>
        ) : (
          <SortButton onClick={onResume} className="success">
            ▶️ Resume
          </SortButton>
        )}
        <SortButton onClick={onStop} className="danger">
          ⏹️ Stop
        </SortButton>
      </>
    )}
    
    <SortButton onClick={onFastSort} disabled={isSorting}>
      ⚡ Fast Sort
    </SortButton>
    
    <SortButton 
      onClick={onStepBack} 
      disabled={!canStepBack || isSorting}
    >
      ↩️ Step Back
    </SortButton>
  </div>
);

// Common array size and speed controls
export const ArrayControls = ({ 
  arraySize, 
  speed, 
  onArraySizeChange, 
  onSpeedChange, 
  isSorting 
}) => (
  <div className="controls">
    <ControlGroup label={`Array Size: ${arraySize}`}>
      <input
        type="range"
        min="10"
        max="200"
        value={arraySize}
        onChange={onArraySizeChange}
        disabled={isSorting}
      />
    </ControlGroup>
    
    <ControlGroup label={`Speed: ${speed}x`}>
      <input
        type="range"
        min="1"
        max="100"
        value={speed}
        onChange={onSpeedChange}
        disabled={isSorting}
      />
    </ControlGroup>
  </div>
);

// Common stats display
export const StatsDisplay = ({ stats }) => (
  <div className="stats-container">
    <StatCard value={stats.comparisons} label="Comparisons" />
    <StatCard value={stats.swaps} label="Swaps" />
    <StatCard value={`${stats.timeElapsed}ms`} label="Time Elapsed" />
    <StatCard value={stats.iterations || stats.partitions || 0} label="Iterations" />
  </div>
);

// Common code section
export const CodeSection = ({ 
  title, 
  description, 
  codeSnippets, 
  selectedLang, 
  onLangChange, 
  isSorting 
}) => (
  <div className="code-section">
    <h2>{title}</h2>
    <p className="algorithm-description">{description}</p>
    <select
      value={selectedLang}
      onChange={onLangChange}
      aria-label="Select programming language"
      disabled={isSorting}
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="cpp">C++</option>
    </select>
    <pre className="code-box">
      <code>{codeSnippets[selectedLang]}</code>
    </pre>
  </div>
);

// Common complexity table
export const ComplexityTable = ({ complexityData }) => (
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
        {complexityData.map((row, index) => (
          <tr key={index}>
            <td>{row.case}</td>
            <td>{row.time}</td>
            <td>{row.space}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Common algorithm description
export const AlgorithmDescription = ({ title, description, steps }) => (
  <div className="description">
    <h3>{title}</h3>
    <p>{description}</p>
    
    <div style={{ marginTop: '20px' }}>
      <h4>How it works:</h4>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  </div>
);

// Utility functions for sorting algorithms
export const sortingUtils = {
  // Generate random array
  generateArray: (size, min = 10, max = 410) => 
    Array.from({ length: size }, () => Math.floor(Math.random() * (max - min)) + min),
  
  // Calculate bar width based on array size
  getBarWidth: (arraySize) => Math.max(4, 800 / arraySize),
  
  // Sleep utility for animations
  sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Performance measurement
  measurePerformance: (fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    return { result, timeElapsed: Math.round(end - start) };
  },
  
  // Array validation
  isValidArray: (arr) => Array.isArray(arr) && arr.length > 0,
  
  // Check if array is sorted
  isSorted: (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }
};

// Common complexity data for different algorithms
export const complexityData = {
  bubbleSort: [
    { case: 'Best Case', time: 'O(n)', space: 'O(1)', description: 'Array is already sorted' },
    { case: 'Average Case', time: 'O(n²)', space: 'O(1)', description: 'Random array' },
    { case: 'Worst Case', time: 'O(n²)', space: 'O(1)', description: 'Array is reverse sorted' }
  ],
  quickSort: [
    { case: 'Best Case', time: 'O(n log n)', space: 'O(log n)', description: 'Balanced partitioning' },
    { case: 'Average Case', time: 'O(n log n)', space: 'O(log n)', description: 'Random array' },
    { case: 'Worst Case', time: 'O(n²)', space: 'O(n)', description: 'Already sorted or reverse sorted' }
  ],
  mergeSort: [
    { case: 'Best Case', time: 'O(n log n)', space: 'O(n)', description: 'Always the same' },
    { case: 'Average Case', time: 'O(n log n)', space: 'O(n)', description: 'Always the same' },
    { case: 'Worst Case', time: 'O(n log n)', space: 'O(n)', description: 'Always the same' }
  ],
  insertionSort: [
    { case: 'Best Case', time: 'O(n)', space: 'O(1)', description: 'Array is already sorted' },
    { case: 'Average Case', time: 'O(n²)', space: 'O(1)', description: 'Random array' },
    { case: 'Worst Case', time: 'O(n²)', space: 'O(1)', description: 'Array is reverse sorted' }
  ],
  selectionSort: [
    { case: 'Best Case', time: 'O(n²)', space: 'O(1)', description: 'Always the same' },
    { case: 'Average Case', time: 'O(n²)', space: 'O(1)', description: 'Always the same' },
    { case: 'Worst Case', time: 'O(n²)', space: 'O(1)', description: 'Always the same' }
  ],
  heapSort: [
    { case: 'Best Case', time: 'O(n log n)', space: 'O(1)', description: 'Always the same' },
    { case: 'Average Case', time: 'O(n log n)', space: 'O(1)', description: 'Always the same' },
    { case: 'Worst Case', time: 'O(n log n)', space: 'O(1)', description: 'Always the same' }
  ]
}; 