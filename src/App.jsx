import { useState } from 'react';
import mandiriLogo from './assets/mandiri.png'; // Pastikan path ini benar
import { featuresData, filterOptions, historyData } from './data'; 
import './App.css';

// --- KOMPONEN 1: NAVBAR ---
const Navbar = ({ setView }) => (
  <nav className="navbar">
    <div className="nav-content">
      <div className="logo" onClick={() => setView('dashboard')}>
        <img src={mandiriLogo} alt="Mandiri" />
      </div>
      <div className="nav-profile">
        <span className="user-avatar">AD</span>
        <span className="user-name">Admin User</span>
      </div>
    </div>
  </nav>
);

// --- KOMPONEN 2: DASHBOARD ---
const Dashboard = ({ setView, history }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredFeatures = activeFilter === 'All'
    ? featuresData
    : featuresData.filter(item => item.category === activeFilter);

  return (
    <section className="dashboard">
      <header className="hero-section">
        <h1>Digital Document <span>Scanning</span></h1>
        <p>Sistem Pemindaian Cepat untuk Dokumen Excel, Word & Tulisan Tangan.</p>
      </header>

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
            <div className="card-action">Mulai Scan →</div>
          </article>
        ))}
      </section>

      <section className="history-section">
        <div className="history-header">
          <h2>Riwayat Pemindaian Terbaru</h2>
        </div>
        <div className="table-responsive">
          <table className="history-table">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Tanggal</th>
                <th>Jenis</th>
                <th>Nama File</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.id}>
                  <td className="fw-500">{row.id}</td>
                  <td>{row.date}</td>
                  <td><span className={`type-badge ${row.type.toLowerCase()}`}>{row.type}</span></td>
                  <td>{row.filename}</td>
                  <td>
                    <span className={`status-badge ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

// --- KOMPONEN 3: SCAN DOCUMENT ---
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
      if (addHistory) {
        addHistory(prev => {
          const newEntry = {
            id: `TRX-${Date.now().toString().slice(-6)}`,
            date: new Date().toLocaleDateString('en-GB'),
            type: selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls') ? 'Excel' : 'Word',
            filename: selectedFile.name,
            status: result === 'match' ? 'Match' : 'Unmatch',
          };
          return [newEntry, ...prev];
        });
      }
    }, 2500);
  };

  return (
    <div className="scan-page">
      <button className="back-btn" onClick={() => setView('dashboard')}>
        <span className="icon">←</span> Kembali ke Dashboard
      </button>
      <div className="upload-container">
        <h2>Upload Dokumen (Excel / Word)</h2>
        <p className="subtitle">Format yang didukung: .xls, .xlsx, .doc, .docx</p>
        
        <div className="upload-box">
          <div className="upload-icon">📁</div>
          <input type="file" id="file-upload" accept=".xlsx, .xls, .doc, .docx" onChange={(e) => setSelectedFile(e.target.files[0])} hidden />
          <label htmlFor="file-upload" className="upload-label">
            {selectedFile ? selectedFile.name : "Pilih File atau Tarik ke Sini"}
          </label>
        </div>

        <button className="action-btn primary-btn" onClick={handleScan} disabled={isScanning || !selectedFile}>
          {isScanning ? 'Menganalisis...' : 'Mulai Scan Dokumen'}
        </button>

        {isScanning && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Membaca struktur dan data dokumen...</p>
          </div>
        )}

        {scanResult === 'match' && (
          <div className="result-box match">
            <div className="result-icon">✅</div>
            <div>
              <h3>Dokumen Sesuai (Match)</h3>
              <p>Data dalam dokumen telah divalidasi dan cocok dengan sistem.</p>
            </div>
          </div>
        )}
        {scanResult === 'unmatch' && (
          <div className="result-box unmatch">
            <div className="result-icon">❌</div>
            <div>
              <h3>Dokumen Tidak Sesuai (Unmatch)</h3>
              <p>Ditemukan ketidakcocokan data dengan sistem. Silakan periksa kembali.</p>
            </div>
          </div>
        )}
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
    setTimeout(() => {
      const dummy = 'Hasil ekstraksi OCR:\n\nNama: John Doe\nNo. Rekening: 123-456-789\nNominal: Rp 5.000.000\nKeterangan: Pembayaran Invoice #402';
      setOcrText(dummy);
      setIsOcrScanning(false);
      if (addHistory) {
        addHistory(prev => {
          const newEntry = {
            id: `TRX-${Date.now().toString().slice(-6)}`,
            date: new Date().toLocaleDateString('en-GB'),
            type: 'Handwritten',
            filename: ocrFileName || 'unknown.jpg',
            status: 'Extracted',
          };
          return [newEntry, ...prev];
        });
      }
    }, 2500);
  };

  return (
    <div className="scan-page ocr-page">
      <button className="back-btn" onClick={() => setView('dashboard')}>
        <span className="icon">←</span> Kembali ke Dashboard
      </button>
      <div className="upload-container">
        <h2>Scan Tulisan Tangan (OCR)</h2>
        <p className="subtitle">Unggah gambar dokumen tulisan.</p>
        
        <div className="ocr-workspace">
          <div className="ocr-left">
            {!previewUrl ? (
              <div className="upload-box">
                <div className="upload-icon">📸</div>
                <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} hidden />
                <label htmlFor="image-upload" className="upload-label">
                  Pilih Gambar Dokumen
                </label>
              </div>
            ) : (
              <div className="image-preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                {isOcrScanning && <div className="scanner-line"></div>}
              </div>
            )}
            {previewUrl && (
              <button className="action-btn primary-btn" onClick={handleScan} disabled={isOcrScanning}>
                {isOcrScanning ? 'Mengekstraksi Teks...' : 'Jalankan OCR'}
              </button>
            )}
          </div>
          <div className="ocr-right">
            <textarea 
              className="ocr-result-text" 
              placeholder="Hasil teks ekstraksi akan muncul di sini..."
              value={ocrText} 
              onChange={(e) => setOcrText(e.target.value)} 
              disabled={isOcrScanning}
            ></textarea>
            {ocrFileName && <p className="file-name-info">📄 {ocrFileName}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [history, setHistory] = useState(historyData || []);

  return (
    <div className="app-wrapper">
      <Navbar setView={setCurrentView} />
      <main className="main-content">
        {currentView === 'dashboard' && <Dashboard setView={setCurrentView} history={history} />}
        {currentView === 'scan-document' && <ScanDocument setView={setCurrentView} addHistory={setHistory} />}
        {currentView === 'scan-handwritten' && <ScanHandwritten setView={setCurrentView} addHistory={setHistory} />}
      </main>
    </div>
  );
}