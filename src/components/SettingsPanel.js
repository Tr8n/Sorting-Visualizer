import React, { useState } from 'react';

const SettingsPanel = ({ 
  isOpen, 
  onClose, 
  settings, 
  onSettingsChange 
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h3>⚙️ Settings</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="settings-content">
          <div className="setting-group">
            <h4>Visualization</h4>
            
            <div className="setting-item">
              <label>Bar Color Theme</label>
              <select 
                value={localSettings.colorTheme} 
                onChange={(e) => handleSettingChange('colorTheme', e.target.value)}
              >
                <option value="blue">Blue Theme</option>
                <option value="green">Green Theme</option>
                <option value="purple">Purple Theme</option>
                <option value="orange">Orange Theme</option>
              </select>
            </div>
            
            <div className="setting-item">
              <label>Animation Speed</label>
              <input
                type="range"
                min="1"
                max="100"
                value={localSettings.animationSpeed}
                onChange={(e) => handleSettingChange('animationSpeed', Number(e.target.value))}
              />
              <span>{localSettings.animationSpeed}x</span>
            </div>
            
            <div className="setting-item">
              <label>Show Bar Values</label>
              <input
                type="checkbox"
                checked={localSettings.showBarValues}
                onChange={(e) => handleSettingChange('showBarValues', e.target.checked)}
              />
            </div>
          </div>
          
          <div className="setting-group">
            <h4>Performance</h4>
            
            <div className="setting-item">
              <label>Enable Hardware Acceleration</label>
              <input
                type="checkbox"
                checked={localSettings.hardwareAcceleration}
                onChange={(e) => handleSettingChange('hardwareAcceleration', e.target.checked)}
              />
            </div>
            
            <div className="setting-item">
              <label>Frame Rate Limit</label>
              <select 
                value={localSettings.frameRateLimit} 
                onChange={(e) => handleSettingChange('frameRateLimit', Number(e.target.value))}
              >
                <option value={30}>30 FPS</option>
                <option value={60}>60 FPS</option>
                <option value={120}>120 FPS</option>
                <option value={0}>Unlimited</option>
              </select>
            </div>
          </div>
          
          <div className="setting-group">
            <h4>Interface</h4>
            
            <div className="setting-item">
              <label>Show Statistics</label>
              <input
                type="checkbox"
                checked={localSettings.showStats}
                onChange={(e) => handleSettingChange('showStats', e.target.checked)}
              />
            </div>
            
            <div className="setting-item">
              <label>Show Code Examples</label>
              <input
                type="checkbox"
                checked={localSettings.showCodeExamples}
                onChange={(e) => handleSettingChange('showCodeExamples', e.target.checked)}
              />
            </div>
            
            <div className="setting-item">
              <label>Auto-save History</label>
              <input
                type="checkbox"
                checked={localSettings.autoSaveHistory}
                onChange={(e) => handleSettingChange('autoSaveHistory', e.target.checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="settings-footer">
          <button onClick={handleCancel} className="secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 