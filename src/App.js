import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import BubbleSort from './components/BubbleSort';
import SelectionSort from './components/SelectionSort';
import InsertionSort from './components/InsertionSort';
import MergeSort from './components/MergeSort';
import HeapSort from './components/HeapSort';
import QuickSort from './components/QuickSort';
import ShellSort from './components/ShellSort';
import CountingSort from './components/CountingSort';
import RadixSort from './components/RadixSort';
import BucketSort from './components/BucketSort';
import TimSort from './components/TimSort';
import SettingsPanel from './components/SettingsPanel';
import './App.css'

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [settings, setSettings] = useState({
    colorTheme: 'blue',
    animationSpeed: 50,
    showBarValues: false,
    hardwareAcceleration: true,
    frameRateLimit: 60,
    showStats: true,
    showCodeExamples: true,
    autoSaveHistory: true,
    enableKeyboardShortcuts: true,
    enableMobileGestures: true
  });

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('sortingVisualizerTheme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sortingVisualizerTheme', theme);
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!settings.enableKeyboardShortcuts) return;

    const handleKeyPress = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case 'f':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
        case 't':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleTheme();
          }
          break;
        case 'escape':
          if (isSettingsOpen) {
            setIsSettingsOpen(false);
          }
          if (isFullscreen) {
            toggleFullscreen();
          }
          break;
        case '1':
          setSelectedAlgorithm('BubbleSort');
          break;
        case '2':
          setSelectedAlgorithm('SelectionSort');
          break;
        case '3':
          setSelectedAlgorithm('InsertionSort');
          break;
        case '4':
          setSelectedAlgorithm('MergeSort');
          break;
        case '5':
          setSelectedAlgorithm('HeapSort');
          break;
        case '6':
          setSelectedAlgorithm('QuickSort');
          break;
        case '7':
          setSelectedAlgorithm('ShellSort');
          break;
        case '8':
          setSelectedAlgorithm('CountingSort');
          break;
        case '9':
          setSelectedAlgorithm('RadixSort');
          break;
        case '0':
          setSelectedAlgorithm('BucketSort');
          break;
        case 'h':
          setSelectedAlgorithm('Home');
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setIsSettingsOpen(true);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [settings.enableKeyboardShortcuts, isSettingsOpen, isFullscreen]);

  // Mobile gestures support
  useEffect(() => {
    if (!settings.enableMobileGestures) return;

    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    };

    const handleTouchMove = (e) => {
      if (!isSwiping) return;

      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;

      // Horizontal swipe for algorithm switching
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const algorithms = ['Home', 'BubbleSort', 'SelectionSort', 'InsertionSort', 'MergeSort', 'HeapSort', 'QuickSort', 'ShellSort', 'CountingSort', 'RadixSort', 'BucketSort', 'TimSort'];
        const currentIndex = algorithms.indexOf(selectedAlgorithm);

        if (deltaX > 0 && currentIndex > 0) {
          // Swipe right - previous algorithm
          setSelectedAlgorithm(algorithms[currentIndex - 1]);
        } else if (deltaX < 0 && currentIndex < algorithms.length - 1) {
          // Swipe left - next algorithm
          setSelectedAlgorithm(algorithms[currentIndex + 1]);
        }
        isSwiping = false;
      }

      // Vertical swipe for theme toggle
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 100) {
        if (deltaY > 0) {
          // Swipe down - toggle theme
          toggleTheme();
        }
        isSwiping = false;
      }
    };

    const handleTouchEnd = () => {
      isSwiping = false;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [settings.enableMobileGestures, selectedAlgorithm]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('sortingVisualizerSettings', JSON.stringify(newSettings));
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const renderAlgorithm = () => {
    switch (selectedAlgorithm) {
      case 'BubbleSort':
        return <BubbleSort settings={settings} />;
      case 'SelectionSort':
        return <SelectionSort settings={settings} />;
      case 'InsertionSort':
        return <InsertionSort settings={settings} />;
      case 'MergeSort':
        return <MergeSort settings={settings} />;
      case 'HeapSort':
        return <HeapSort settings={settings} />;
      case 'QuickSort':
        return <QuickSort settings={settings} />;
      case 'ShellSort':
        return <ShellSort settings={settings} />;
      case 'CountingSort':
        return <CountingSort settings={settings} />;
      case 'RadixSort':
        return <RadixSort settings={settings} />;
      case 'BucketSort':
        return <BucketSort settings={settings} />;
      case 'TimSort':
        return <TimSort settings={settings} />;
      case 'Home':
      default:
        return <Home />;
    }
  };

  return (
    <div className={`app ${theme} ${isFullscreen ? 'fullscreen' : ''}`}>
      <Nav
        setSelectedAlgorithm={setSelectedAlgorithm}
        selectedAlgorithm={selectedAlgorithm}
        onSettingsClick={handleSettingsClick}
        theme={theme}
        onThemeToggle={toggleTheme}
        isFullscreen={isFullscreen}
        onFullscreenToggle={toggleFullscreen}
      />
      <main className="main-content">
        {renderAlgorithm()}
      </main>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />

      {/* Keyboard shortcuts help */}
      {settings.enableKeyboardShortcuts && (
        <div className="keyboard-shortcuts-help">
          <div className="shortcuts-toggle" onClick={() => setShowShortcuts(prev => !prev)}>
            ⌨️
          </div>
          <div className={`shortcuts-panel ${showShortcuts ? 'show' : ''}`}>
            <h4>Keyboard Shortcuts</h4>
            <div className="shortcut-item">
              <kbd>Ctrl/Cmd + F</kbd> <span>Toggle Fullscreen</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl/Cmd + T</kbd> <span>Toggle Theme</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl/Cmd + S</kbd> <span>Settings</span>
            </div>
            <div className="shortcut-item">
              <kbd>1-9, 0</kbd> <span>Switch Algorithms</span>
            </div>
            <div className="shortcut-item">
              <kbd>H</kbd> <span>Home</span>
            </div>
            <div className="shortcut-item">
              <kbd>Esc</kbd> <span>Close/Exit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
