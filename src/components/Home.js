import React, { useState } from 'react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const algorithms = [
    {
      id: 'bubble',
      name: 'Bubble Sort',
      icon: '🫧',
      category: 'simple',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stability: 'Stable',
      inPlace: 'Yes',
      advantages: ['Simple to understand', 'Good for small datasets', 'Detects if array is already sorted'],
      disadvantages: ['Poor performance on large datasets', 'Many swaps required'],
      useCases: ['Educational purposes', 'Small datasets', 'Nearly sorted arrays']
    },
    {
      id: 'selection',
      name: 'Selection Sort',
      icon: '🎯',
      category: 'simple',
      description: 'Divides the input into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.',
      timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stability: 'Unstable',
      inPlace: 'Yes',
      advantages: ['Minimal memory usage', 'Good for small datasets', 'Fewer swaps than bubble sort'],
      disadvantages: ['Poor performance on large datasets', 'Always O(n²) time complexity'],
      useCases: ['Small datasets', 'Memory-constrained environments', 'When swap cost is high']
    },
    {
      id: 'insertion',
      name: 'Insertion Sort',
      icon: '📝',
      category: 'simple',
      description: 'Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.',
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stability: 'Stable',
      inPlace: 'Yes',
      advantages: ['Simple implementation', 'Efficient for small data', 'Adaptive algorithm'],
      disadvantages: ['Poor performance on large datasets', 'Many element shifts'],
      useCases: ['Small datasets', 'Nearly sorted arrays', 'Online sorting']
    },
    {
      id: 'shell',
      name: 'Shell Sort',
      icon: '🐚',
      category: 'advanced',
      description: 'An optimization of insertion sort that allows the exchange of items that are far apart, reducing the number of swaps required.',
      timeComplexity: { best: 'O(n log n)', average: 'O(n^1.3)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stability: 'Unstable',
      inPlace: 'Yes',
      advantages: ['Better than insertion sort', 'Adaptive algorithm', 'Good for medium-sized arrays'],
      disadvantages: ['Complex gap sequence', 'Not as efficient as modern algorithms'],
      useCases: ['Medium-sized datasets', 'When insertion sort is too slow']
    },
    {
      id: 'merge',
      name: 'Merge Sort',
      icon: '🔀',
      category: 'divide-conquer',
      description: 'A divide-and-conquer algorithm that recursively divides the array into halves, sorts them, and then merges the sorted halves.',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(n)',
      stability: 'Stable',
      inPlace: 'No',
      advantages: ['Consistent performance', 'Stable sort', 'Predictable time complexity'],
      disadvantages: ['Requires extra space', 'Not in-place algorithm'],
      useCases: ['Large datasets', 'When stability is required', 'External sorting']
    },
    {
      id: 'quick',
      name: 'Quick Sort',
      icon: '⚡',
      category: 'divide-conquer',
      description: 'A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy with a pivot element.',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: 'O(log n)',
      stability: 'Unstable',
      inPlace: 'Yes',
      advantages: ['Excellent average performance', 'In-place algorithm', 'Cache-friendly'],
      disadvantages: ['Unstable sort', 'Poor performance on sorted arrays'],
      useCases: ['General-purpose sorting', 'Large datasets', 'When average performance matters']
    },
    {
      id: 'heap',
      name: 'Heap Sort',
      icon: '🌳',
      category: 'advanced',
      description: 'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements.',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(1)',
      stability: 'Unstable',
      inPlace: 'Yes',
      advantages: ['In-place algorithm', 'Consistent performance', 'No extra space needed'],
      disadvantages: ['Unstable sort', 'Poor cache performance', 'Complex implementation'],
      useCases: ['Memory-constrained environments', 'When guaranteed O(n log n) is needed']
    },
    {
      id: 'counting',
      name: 'Counting Sort',
      icon: '🔢',
      category: 'linear',
      description: 'A non-comparison based sorting algorithm that counts the number of objects having distinct key values.',
      timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
      spaceComplexity: 'O(k)',
      stability: 'Stable',
      inPlace: 'No',
      advantages: ['Linear time complexity', 'Stable sort', 'Good for small range data'],
      disadvantages: ['Requires extra space', 'Not suitable for large range data'],
      useCases: ['Small range integers', 'When linear time is required', 'Radix sort subroutine']
    },
    {
      id: 'radix',
      name: 'Radix Sort',
      icon: '📊',
      category: 'linear',
      description: 'A non-comparison based sorting algorithm that sorts data with integer keys by grouping keys by individual digits.',
      timeComplexity: { best: 'O(d * (n + k))', average: 'O(d * (n + k))', worst: 'O(d * (n + k))' },
      spaceComplexity: 'O(n + k)',
      stability: 'Stable',
      inPlace: 'No',
      advantages: ['Linear time for fixed digits', 'Stable sort', 'Good for integers'],
      disadvantages: ['Requires extra space', 'Only works with integers', 'Complex implementation'],
      useCases: ['Integer sorting', 'When digit-based sorting is needed', 'Large integer datasets']
    },
    {
      id: 'bucket',
      name: 'Bucket Sort',
      icon: '🪣',
      category: 'linear',
      description: 'A distribution sort algorithm that works by distributing the elements of an array into a number of buckets.',
      timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
      spaceComplexity: 'O(n + k)',
      stability: 'Stable',
      inPlace: 'No',
      advantages: ['Linear time for uniform distribution', 'Stable sort', 'Good for floating-point numbers'],
      disadvantages: ['Poor performance for non-uniform data', 'Requires extra space'],
      useCases: ['Uniformly distributed data', 'Floating-point sorting', 'When linear time is possible']
    },
    {
      id: 'tim',
      name: 'Tim Sort',
      icon: '⏰',
      category: 'hybrid',
      description: 'A hybrid sorting algorithm derived from merge sort and insertion sort, designed to perform well on real-world data.',
      timeComplexity: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(n)',
      stability: 'Stable',
      inPlace: 'No',
      advantages: ['Adaptive algorithm', 'Stable sort', 'Optimized for real-world data'],
      disadvantages: ['Complex implementation', 'Requires extra space'],
      useCases: ['General-purpose sorting', 'Real-world applications', 'When stability is required']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Algorithms', icon: '🎯' },
    { id: 'simple', name: 'Simple Sorts', icon: '📝' },
    { id: 'divide-conquer', name: 'Divide & Conquer', icon: '🔀' },
    { id: 'advanced', name: 'Advanced Sorts', icon: '⚡' },
    { id: 'linear', name: 'Linear Time', icon: '📊' },
    { id: 'hybrid', name: 'Hybrid Sorts', icon: '🔄' }
  ];

  const filteredAlgorithms = selectedCategory === 'all' 
    ? algorithms 
    : algorithms.filter(alg => alg.category === selectedCategory);

  return (
    <div className="visualization-wrapper">
      <h1>🎯 Sorting Algorithms Visualizer</h1>
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h2>Master the Art of Sorting</h2>
          <p>
            Explore and visualize various sorting algorithms with interactive animations, 
            real-time statistics, and detailed explanations. Perfect for learning, 
            teaching, and understanding algorithmic concepts.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">11</span>
              <span className="stat-label">Algorithms</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Possibilities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <h3>Filter by Category</h3>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Cards */}
      <div className="algorithms-grid">
        {filteredAlgorithms.map(algorithm => (
          <div key={algorithm.id} className="algorithm-card">
            <h3>
              <span className="algorithm-icon">{algorithm.icon}</span>
              {algorithm.name}
            </h3>
            <p>{algorithm.description}</p>
            
            <div className="complexity-section">
              <h4>Time Complexity</h4>
              <div className="complexity-grid">
                <div className="complexity-item">
                  <div className="complexity-label">Best</div>
                  <div className="complexity-value">{algorithm.timeComplexity.best}</div>
                </div>
                <div className="complexity-item">
                  <div className="complexity-label">Average</div>
                  <div className="complexity-value">{algorithm.timeComplexity.average}</div>
                </div>
                <div className="complexity-item">
                  <div className="complexity-label">Worst</div>
                  <div className="complexity-value">{algorithm.timeComplexity.worst}</div>
                </div>
              </div>
            </div>
            
            <div className="algorithm-details">
              <div className="details-section">
                <h4>Properties</h4>
                <ul>
                  <li><strong>Space Complexity:</strong> {algorithm.spaceComplexity}</li>
                  <li><strong>Stability:</strong> {algorithm.stability}</li>
                  <li><strong>In-Place:</strong> {algorithm.inPlace}</li>
                </ul>
              </div>
              
              <div className="details-section">
                <h4>Advantages</h4>
                <ul>
                  {algorithm.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
              
              <div className="details-section">
                <h4>Disadvantages</h4>
                <ul>
                  {algorithm.disadvantages.map((disadvantage, index) => (
                    <li key={index}>{disadvantage}</li>
                  ))}
                </ul>
              </div>
              
              <div className="details-section">
                <h4>Use Cases</h4>
                <ul>
                  {algorithm.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>✨ Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Visualizations</h3>
            <p>Stunning animations with smooth transitions and color-coded elements.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Statistics</h3>
            <p>Track comparisons, swaps, time elapsed, and iterations in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Performance Optimized</h3>
            <p>Lag-free animations with optimized rendering and smooth 60fps performance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works perfectly on desktop, tablet, and mobile devices.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Customizable Controls</h3>
            <p>Adjust array size, animation speed, and other parameters to your preference.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Educational Content</h3>
            <p>Comprehensive explanations, code examples, and complexity analysis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
