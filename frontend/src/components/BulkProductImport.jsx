import React, { useState } from 'react';
import axios from 'axios';
import productsData from '../data/homeAppliances.json';

const BulkProductImport = ({ onComplete }) => {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState({ success: 0, failed: 0 });
  const [message, setMessage] = useState('');

  const importAllProducts = async () => {
    setImporting(true);
    setProgress({ current: 0, total: productsData.length });
    setResults({ success: 0, failed: 0 });
    setMessage('Starting import...');

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < productsData.length; i++) {
      try {
        await axios.post('http://localhost:8080/admin/courses/add', productsData[i]);
        successCount++;
        setProgress({ current: i + 1, total: productsData.length });
        setResults({ success: successCount, failed: failedCount });
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        failedCount++;
        setResults({ success: successCount, failed: failedCount });
        console.error(`Failed to import product: ${productsData[i].courseName}`, error);
      }
    }

    setImporting(false);
    setMessage(`Import complete! ${successCount} products added successfully, ${failedCount} failed.`);
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Bulk Product Import</h3>
      <p style={styles.description}>
        This will import {productsData.length} home appliance products into your store.
      </p>

      {!importing && results.success === 0 && (
        <button onClick={importAllProducts} style={styles.button}>
          Import {productsData.length} Products
        </button>
      )}

      {importing && (
        <div style={styles.progress}>
          <p>Importing products... {progress.current} / {progress.total}</p>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${(progress.current / progress.total) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {results.success > 0 && (
        <div style={styles.results}>
          <p style={styles.successText}>✅ Success: {results.success}</p>
          {results.failed > 0 && <p style={styles.errorText}>❌ Failed: {results.failed}</p>}
        </div>
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '8px',
    border: '2px dashed #2874f0',
    marginBottom: '30px',
    textAlign: 'center'
  },
  title: {
    color: '#2874f0',
    marginBottom: '10px',
    fontSize: '1.5em'
  },
  description: {
    color: '#666',
    marginBottom: '20px'
  },
  button: {
    backgroundColor: '#fb641b',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    borderRadius: '4px',
    fontSize: '1.1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  progress: {
    padding: '20px'
  },
  progressBar: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    marginTop: '15px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2874f0',
    transition: 'width 0.3s ease'
  },
  results: {
    padding: '15px',
    marginTop: '15px'
  },
  successText: {
    color: '#155724',
    fontSize: '1.1em',
    fontWeight: '600',
    margin: '5px 0'
  },
  errorText: {
    color: '#721c24',
    fontSize: '1.1em',
    fontWeight: '600',
    margin: '5px 0'
  },
  message: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    fontWeight: '600'
  }
};

export default BulkProductImport;
