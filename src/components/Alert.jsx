import React, { useEffect, useState } from 'react';
import './css/Alert.css'; // Optional CSS file for styling

function Alert({ message, type, onClose }) {
  const alertStyles = {
    success: { backgroundColor: '#d4edda', color: '#155724' },
    error: { backgroundColor: '#f8d7da', color: '#721c24' },
  };

  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the alert after a few seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();  // Trigger the close callback to reset state in parent component
    }, 5000); // Alert will auto-hide after 5 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="alert"
      style={{
        ...alertStyles[type],
        borderRadius: '4px',
        padding: '10px 15px',
        margin: '10px 0',
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        opacity: 1,
        animation: 'fadeIn 0.5s ease-in-out',
      }}
    >
      <span>{message}</span>
      <button
        onClick={() => { setIsVisible(false); onClose(); }}
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: alertStyles[type]?.color,
        }}
      >
        ×
      </button>
    </div>
  );
}

export default Alert;
