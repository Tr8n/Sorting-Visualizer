import React, { useState } from 'react';

const Nav = ({ 
  setSelectedAlgorithm, 
  selectedAlgorithm, 
  onSettingsClick,
  theme,
  onThemeToggle,
  isFullscreen,
  onFullscreenToggle
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'Home', label: 'Home', icon: '🏠' },
    { id: 'BubbleSort', label: 'Bubble Sort', icon: '🫧' },
    { id: 'SelectionSort', label: 'Selection Sort', icon: '🎯' },
    { id: 'InsertionSort', label: 'Insertion Sort', icon: '📝' },
    { id: 'MergeSort', label: 'Merge Sort', icon: '🔀' },
    { id: 'HeapSort', label: 'Heap Sort', icon: '🌳' },
    { id: 'QuickSort', label: 'Quick Sort', icon: '⚡' },
    { id: 'ShellSort', label: 'Shell Sort', icon: '🐚' },
    { id: 'CountingSort', label: 'Counting Sort', icon: '🔢' },
    { id: 'RadixSort', label: 'Radix Sort', icon: '📊' },
    { id: 'BucketSort', label: 'Bucket Sort', icon: '🪣' },
    { id: 'TimSort', label: 'Tim Sort', icon: '⏰' }
  ];

  const handleNavClick = (algorithmId) => {
    setSelectedAlgorithm(algorithmId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-container">
      <div className="nav-header">
        <h1 className="nav-title">Sorting Visualizer</h1>
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button
            className="nav-action-btn theme-toggle"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Fullscreen Toggle */}
          <button
            className="nav-action-btn fullscreen-toggle"
            onClick={onFullscreenToggle}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? '⏹️' : '⛶'}
          </button>

          {/* Settings Button */}
          <button
            className="nav-action-btn settings-btn"
            onClick={onSettingsClick}
            aria-label="Open settings"
            title="Settings"
          >
            ⚙️
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li
            key={item.id}
            className={selectedAlgorithm === item.id ? 'active' : ''}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
