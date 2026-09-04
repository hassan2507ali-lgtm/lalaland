import { useState } from 'react';
import mandiriLogo from './assets/mandiri.png'; // Mandiri logo image
import { featuresData, filterOptions, historyData } from './data'; // Import data dari luar

import './App.css';

// --- KOMPONEN 1: NAVBAR (sticky) with logo inside ---
const Navbar = ({ setView }) => (
  <nav className="navbar">
    {/* Logo on the left, small size */}
    <div className="logo" onClick={() => setView('dashboard')} style={{cursor: 'pointer'}}>
      <img src={mandiriLogo} alt="Mandiri" style={{height: '32px'}} />
    </div>
    {/* No additional menu items */}
  </nav>
);

// --- KOMPONEN 2: DASHBOARD (Corporate Style) ---
const Dashboard = ({ setView, history }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filtered features based on selected category
  const filteredFeatures = activeFilter === 'All'
    ? featuresData
    : featuresData.filter(item => item.category === activeFilter);

  return (
    <section className="dashboard">
      {/* Hero /Intro */}
      <header className="hero-section corporate-hero">
        <h1>Digital Document Scanning</h1>
        <p>Fast scan for Excel, Word & Handwritten files.</p>
      </header>

      {/* Filter Buttons */}
      <div className="filter-container">
        {filterOptions.map(filterName => (
          <button
            key={filterName}
            className={`filter-btn ${activeFilter === filterName ? 'active' : ''}`}
            onClick={() => setActiveFilter(filterName)}
          >
            {filterName}
          </button>
        ))}
      </div>

      {/* Feature Cards */}
      <section className="grid-container">
        {filteredFeatures.map(feature => (
          <article
            key={feature.id}
            className="card"
            onClick={() => {
              if (feature.category === 'Document') setView('scan-document');
              else if (feature.category === 'Handwritten') setView('scan-handwritten');
            }}
          >
            <div className="card-icon">{feature.icon}</div>
            <h3 className="card-title">{feature.title}</h3>
            <p className="card-desc">{feature.desc}</p>
          </article>
        ))}
      </section>

      {/* Recent Scan History Table */}
      <section className="history-section">
        <h2>Riwayat Pemindaian Terbaru</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>File</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>{row.type}</td>
                <td>{row.filename}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

// --- KOMPONEN 3: SCAN DOCUMENT (EXCEL/WORD) ---
const ScanDocument = ({ setView, addHistory }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    if (!selectedFile) return;
    setIsScanning(true);
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'match' : 'unmatch';
      setIsScanning(false);
      setScanResult(result);
      // Record in history with actual file name and status
      if (addHistory) {
        addHistory(prev => {
          const newEntry = {
            id: `TRX-${Date.now()}`,
            date: new Date().toLocaleDateString('en-GB'),
            type: selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls') ? 'Excel' : 'Word',
            filename: selectedFile.name,
            status: result === 'match' ? 'Match' : 'Unmatch',
          };
          return [...prev, newEntry];
        });
      }
    }, 2500);
  };

  return (
    <div className="scan-page">
      <button className="back-btn" onClick={() => setView('dashboard')}>← Kembali ke Dashboard</button>
      <div className="upload-container">
        <h2>Upload Dokumen Excel / Word</h2>
        <div className="upload-box">
          <input type="file" accept=".xlsx, .xls, .doc, .docx" onChange={(e) => setSelectedFile(e.target.files[0])} />
          {selectedFile && <p className="file-name">File terpilih: {selectedFile.name}</p>}
        </div>
        <button className="action-btn" onClick={handleScan} disabled={isScanning || !selectedFile}>
          {isScanning ? 'Menganalisis...' : 'Mulai Scan'}
        </button>
        {isScanning && <div className="loading-state"><div className="spinner"></div><p>Membaca struktur...</p></div>}
        {scanResult === 'match' && <div className="result-box match"><h3>✅ Match (Sesuai)</h3></div>}
        {scanResult === 'unmatch' && <div className="result-box unmatch"><h3>❌ Unmatch (Tidak Sesuai)</h3></div>}
      </div>
    </div>
  );
};

// --- KOMPONEN 4: SCAN TULISAN TANGAN ---
const ScanHandwritten = ({ setView, addHistory }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [ocrFileName, setOcrFileName] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setOcrFileName(file.name);
    }
  };

  const handleScan = () => {
    setIsOcrScanning(true);
    // Simulate OCR with a dummy result after a short delay
    setTimeout(() => {
      const dummy = 'Dummy OCR result – extracted text placeholder.';
      setOcrText(dummy);
      setIsOcrScanning(false);
      // Record in history as a handwritten scan
      if (addHistory) {
        addHistory(prev => {
          const newEntry = {
            id: `TRX-${Date.now()}`,
            date: new Date().toLocaleDateString('en-GB'),
            type: 'Handwritten',
            filename: ocrFileName || 'unknown.jpg',
            status: 'Extracted',
          };
          return [...prev, newEntry];
        });
      }
    }, 2000);
  };

  return (
    <div className="scan-page ocr-page">
      <button className="back-btn" onClick={() => setView('dashboard')}>← Kembali ke Dashboard</button>
      <div className="upload-container">
        <h2>Scan Tulisan Tangan (OCR)</h2>
        <div className="ocr-workspace">
          <div className="ocr-left">
            {!previewUrl ? (
              <div className="upload-box"><input type="file" accept="image/*" onChange={handleImageUpload} /></div>
            ) : (
              <div className="image-preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                {isOcrScanning && <div className="scanner-line"></div>}
              </div>
            )}
            {previewUrl && <button className="action-btn" onClick={handleScan} disabled={isOcrScanning}>Run OCR</button>}
          </div>
          <div className="ocr-right">
            <textarea className="ocr-result-text" value={ocrText} onChange={(e) => setOcrText(e.target.value)} disabled={isOcrScanning}></textarea>
            {ocrFileName && <p className="file-name">File: {ocrFileName}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA (Sangat Bersih) ---
export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  // History state – start with static dummy data then grow with real scans
  const [history, setHistory] = useState(historyData);

  return (
    <div className="app-wrapper">
      <Navbar setView={setCurrentView} />
      
      {currentView === 'dashboard' && <Dashboard setView={setCurrentView} history={history} />}
      {currentView === 'scan-document' && <ScanDocument setView={setCurrentView} addHistory={setHistory} />}
      {currentView === 'scan-handwritten' && <ScanHandwritten setView={setCurrentView} addHistory={setHistory} />}
    </div>
  );
}