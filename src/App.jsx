import React, { useState, useEffect, useRef } from 'react';
import mandiriLogo from './assets/mandiri.png';

// ==========================================
// 1. GAYA DESAIN (CSS IN-JS)
// ==========================================
const appStyles = `
  :root {
    --primary: #003d79; 
    --primary-light: #0056a8;
    --bg-color: #f4f7fa;
    --surface: #ffffff;
    --text-main: #1e293b;
    --text-muted: #64748b;
    --border-light: #e2e8f0;
    --success: #10b981;
    --success-bg: #d1fae5;
    --danger: #ef4444;
    --danger-bg: #fee2e2;
    --warning: #f59e0b;
    --warning-bg: #fef3c7;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    --radius-md: 12px;
    --radius-lg: 20px;
  }

  body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; background-color: var(--bg-color); color: var(--text-main); }
  
  .app-wrapper { min-height: 100vh; }
  .main-content { max-width: 1200px; margin: 0 auto; padding: 0 20px 60px; }

  /* Navbar & Dropdown */
  .navbar { background: var(--surface); border-bottom: 1px solid var(--border-light); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow-sm); }
  .nav-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; }
  .logo { cursor: pointer; }
  .nav-profile-container { position: relative; }
  
  .nav-profile { display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 6px 10px; border-radius: 8px; transition: background 0.2s; }
  .nav-profile:hover { background: #f1f5f9; }
  .user-avatar { background: var(--primary); color: white; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 600; font-size: 14px; }
  .user-name { font-weight: 600; font-size: 14px; }
  
  .profile-dropdown { position: absolute; top: 110%; right: 0; background: white; border: 1px solid var(--border-light); border-radius: 10px; box-shadow: var(--shadow-lg); width: 260px; z-index: 200; overflow: hidden; animation: fadeIn 0.2s ease-out; }
  .dropdown-header { padding: 12px 16px; background: #f8fafc; font-size: 12px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid var(--border-light); text-transform: uppercase; letter-spacing: 0.5px; }
  .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: var(--text-main); text-decoration: none; font-size: 13px; transition: background 0.2s; border-bottom: 1px solid #f1f5f9; }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:hover { background: #f0f7ff; color: var(--primary); font-weight: 500; }
  .dropdown-icon { font-size: 16px; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

  /* Hero */
  .hero-section { text-align: center; padding: 60px 20px 40px; }
  .hero-section h1 { font-size: 42px; font-weight: 800; margin-bottom: 16px; }
  .hero-section h1 span { color: var(--primary); }
  .hero-section p { font-size: 18px; color: var(--text-muted); }

  /* Center Card for Single Feature */
  .center-card-container { display: flex; justify-content: center; margin-bottom: 60px; }
  .card { background: var(--surface); border-radius: var(--radius-md); padding: 40px; cursor: pointer; border: 1px solid var(--border-light); display: flex; flex-direction: column; align-items: center; text-align: center; transition: 0.3s; max-width: 450px; width: 100%; box-shadow: var(--shadow-sm); }
  .card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); border-color: var(--primary-light); }
  .card-icon { font-size: 56px; margin-bottom: 20px; background: #f0f7ff; width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; border-radius: 16px; }
  .card-title { font-size: 24px; margin: 0 0 12px; }
  .card-desc { font-size: 16px; color: var(--text-muted); flex-grow: 1; }
  .card-action { font-weight: 600; color: var(--primary); margin-top: 24px; font-size: 16px; }

  /* Table */
  .history-section { background: var(--surface); border-radius: var(--radius-lg); padding: 30px; border: 1px solid var(--border-light); box-shadow: var(--shadow-md); }
  .table-responsive { overflow-x: auto; }
  .history-table { width: 100%; border-collapse: separate; border-spacing: 0; min-width: 600px; }
  .history-table th, .history-table td { padding: 16px; border-bottom: 1px solid var(--border-light); text-align: left; }
  .history-table th { background: #f8fafc; color: var(--text-muted); font-size: 13px; text-transform: uppercase; }
  .status-badge { padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
  .status-badge.extracted { background: var(--warning-bg); color: var(--warning); }
  .type-badge { padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; background: #f1f5f9; color: #475569; }

  /* Scan Pages */
  .scan-page { max-width: 1000px; margin: 40px auto 0; }
  .back-btn { background: none; border: none; color: var(--text-muted); font-weight: 600; cursor: pointer; margin-bottom: 24px; padding: 0; font-size: 16px; display: flex; align-items: center; gap: 8px; }
  .upload-container { background: var(--surface); padding: 40px; border-radius: var(--radius-lg); border: 1px solid var(--border-light); box-shadow: var(--shadow-md); }
  
  /* Buttons */
  .action-btn { width: 100%; padding: 16px; font-size: 16px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: 0.3s; margin-top: 10px; }
  .primary-btn { background: var(--primary); color: white; }
  .primary-btn:disabled { background: #94a3b8; cursor: not-allowed; }
  .success-btn { background: var(--success); color: white; }

  /* Dynamic Layout (OCR) */
  .ocr-workspace-horizontal { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
  .ocr-workspace-vertical { display: flex; flex-direction: column; gap: 30px; }
  
  /* Background Putih & Teks Hitam untuk Hasil Ekstraksi */
  .ocr-result-text { width: 100%; min-height: 250px; padding: 20px; border: 1px solid var(--border-light); border-radius: var(--radius-md); font-family: monospace; background: #ffffff; color: #000000; resize: vertical; box-sizing: border-box; font-size: 14px; line-height: 1.6; }

  /* Multi-upload Preview */
  .multi-preview-container { border: 1px solid var(--border-light); background: #f8fafc; border-radius: var(--radius-md); margin-bottom: 20px; display: flex; flex-direction: column; }
  .preview-header { display: flex; justify-content: space-between; padding: 12px 16px; background: var(--surface); border-bottom: 1px solid var(--border-light); font-weight: 600; font-size: 14px; }
  .add-more-label { color: var(--primary); cursor: pointer; }
  .preview-grid { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; max-height: 350px; overflow-y: auto; }
  .preview-item { position: relative; width: 120px; text-align: center; }
  .clickable-image { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-light); cursor: zoom-in; transition: transform 0.2s; }
  .clickable-image:hover { transform: scale(1.05); }
  .remove-file-btn { position: absolute; top: -8px; right: -8px; background: var(--danger); color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; z-index: 10; font-weight: bold; }
  .preview-name { font-size: 11px; margin-top: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-muted); }

  /* Empty Upload Box */
  .upload-box { border: 2px dashed #cbd5e1; border-radius: var(--radius-md); background: #f8fafc; padding: 50px 20px; text-align: center; margin-bottom: 30px; cursor: pointer; }
  .upload-label { background: white; border: 1px solid var(--border-light); padding: 10px 24px; border-radius: 8px; font-weight: 600; color: var(--primary); cursor: pointer; display: inline-block; }

  /* Modal Pop-up */
  .image-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15,23,42,0.85); z-index: 9999; display: flex; justify-content: center; align-items: center; }
  .image-modal-content { position: relative; max-width: 90%; max-height: 90vh; }
  .image-modal-content img { max-width: 100%; max-height: 85vh; border-radius: 8px; }
  .close-modal-btn { position: absolute; top: -40px; right: 0; background: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer; }

  @media (max-width: 768px) {
    .ocr-workspace-horizontal { grid-template-columns: 1fr; }
    .hero-section h1 { font-size: 32px; }
    .nav-profile .user-name { display: none; }
  }
`;

// ==========================================
// 2. DATA DUMMY (HANYA AGUSTINO)
// ==========================================
const historyData = [
  { id: 'TRX-001', date: new Date().toLocaleDateString('en-GB'), type: 'Handwritten', filename: 'form_agustino.jpeg', status: 'Extracted' },
  { id: 'TRX-002', date: new Date().toLocaleDateString('en-GB'), type: 'Handwritten', filename: 'ktp_agustino.jpeg', status: 'Extracted' },
];

const ocrDummyDatabase = [
  {
    aliases: ['form_agustino'], 
    text: `=== HASIL EKSTRAKSI FORMULIR KOPRA MANDIRI ===\n[DATA PERUSAHAAN]\nNama Perusahaan: PT. Srijati Cahaya Kencana\nAlamat: Kencana Sari Timur 3 Blok E-15 RT. 005 RW. 006, Dukuh Pakis Gunung Sari Surabaya 60224\nJenis Badan Usaha: PT\nNPWP: 1000000005375577\nNomor CIF: 19013165253\n\n[DATA PEJABAT BERWENANG]\nNama: Agustino Sufa Bubun\nNIK: 3578261703920003\nJabatan: Direktur\n\n[REGISTRASI REKENING]\n1. 1410099008872 (Inquiry, Debet, Kredit)\n2. 1410099009728 (Inquiry, Debet, Kredit)`
  },
  {
    aliases: ['ktp_agustino'], 
    text: `PROVINSI JAWA TIMUR\nKOTA SURABAYA\nNIK: 3578261703920003\nNama: AGUSTINO SUFA BUBUN\nTempat/Tgl Lahir: DILI, 17-03-1992\nJenis kelamin: LAKI-LAKI\nAlamat: TAMAN PUSPARAYA A7/21A\nAgama: KATHOLIK\nPekerjaan: KARYAWAN SWASTA\nBerlaku Hingga: SEUMUR HIDUP`
  },
  {
    aliases: ['npwp_agustino'], 
    text: `KARTU NPWP - DIREKTORAT JENDERAL PAJAK\nNPWP: 1000 0000 0537 5577\nNama: SRIJATI CAHAYA KENCANA\nAlamat: KOTA SURABAYA, JAWA TIMUR\nTanggal Terdaftar: 04/09/2025`
  }
];

// ==========================================
// 3. KOMPONEN UI
// ==========================================

const Navbar = ({ setView }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sampleFiles = [
    'form_agustino.jpeg',
    'form.jpeg',
    'form3.jpeg',
    'form4.jpeg',
    'ktp_agustino.jpeg',
    'npwp_agustino.jpeg'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo" onClick={() => setView('dashboard')}>
          <img 
            src={mandiriLogo} 
            alt="Logo Mandiri" 
            style={{ height: '36px', objectFit: 'contain', display: 'block' }} 
          />
        </div>
        
        <div className="nav-profile-container" ref={dropdownRef}>
          <div className="nav-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="user-avatar">AM</span>
            <span className="user-name">Admin Mandiri</span>
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">📥 File Sample (Uji Coba)</div>
              
              {sampleFiles.map((fileName, index) => {
                const isMarked = fileName.includes('agustino');
                const icon = isMarked ? '🟢' : '⚪';
                
                return (
                  <a key={index} href={`/${fileName}`} download className="dropdown-item">
                    <span className="dropdown-icon">{icon}</span> {fileName}
                  </a>
                );
              })}
              
              <div style={{padding: '10px 16px', background: '#fef3c7', fontSize: '11px', color: '#92400e', marginTop: '4px', borderTop: '1px solid #fde68a'}}>
                *Ket: 🟢 File valid (Marking) | ⚪ File dummy
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Dashboard = ({ setView, history }) => {
  return (
    <section className="dashboard">
      <header className="hero-section">
        <h1>Digital Document <span>Scanning</span></h1>
        <p>Sistem Pemindaian Formulir berbasis OCR.</p>
      </header>

      <div className="center-card-container">
        <article className="card" onClick={() => setView('scan-handwritten')}>
          <div className="card-icon">📝</div>
          <h3 className="card-title">Scan Dokumen & Form (OCR)</h3>
          <p className="card-desc">Ekstraksi gambar menjadi teks terstruktur menggunakan OCR Batch.Multi-Upload.</p>
          <div className="card-action">Mulai Scan →</div>
        </article>
      </div>

      <section className="history-section">
        <h2>Riwayat Pemindaian Terbaru</h2>
        <div className="table-responsive">
          <table className="history-table">
            <thead>
              <tr><th>ID Transaksi</th><th>Tanggal</th><th>Jenis</th><th>Nama File</th><th>Status</th></tr>
            </thead>
            <tbody>
              {history.map((row, index) => (
                <tr key={index}>
                  <td style={{fontWeight: 600}}>{row.id}</td>
                  <td>{row.date}</td>
                  <td><span className={`type-badge`}>{row.type}</span></td>
                  <td>{row.filename}</td>
                  <td><span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

const ScanHandwritten = ({ setView, addHistory }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [modalImage, setModalImage] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
      setOcrText('');
      setScanDone(false);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setOcrText('');
    setScanDone(false);
  };

  const handleExportExcel = () => {
    const blob = new Blob([ocrText], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Ekstrak_Batch_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScan = () => {
    setIsOcrScanning(true);
    setScanDone(false);
    setOcrText(">> [SYSTEM] Memulai inisialisasi AI Core...\n");

    setTimeout(() => setOcrText(prev => prev + `>> [INFO] Memproses ${selectedFiles.length} dokumen secara paralel...\n`), 600);
    setTimeout(() => setOcrText(prev => prev + ">> [PROCESS] Melakukan ekstraksi & validasi struktur...\n"), 1400);

    setTimeout(() => {
      let finalText = '';
      let matchCount = 0;

      selectedFiles.forEach(file => {
        const fileNameLower = file.name.toLowerCase();
        
        const matchedData = ocrDummyDatabase.find(data => 
          data.aliases.some(alias => fileNameLower.includes(alias))
        );

        if (matchedData) {
          finalText += `\n========================================\n📄 FILE TERDETEKSI: ${file.name}\n========================================\n${matchedData.text}\n\n`;
          matchCount++;
        }
      });

      if (matchCount === 0) {
        finalText = `[HASIL OCR]:\n\nMemproses ${selectedFiles.length} dokumen, namun format tidak spesifik (tidak terdeteksi sebagai dokumen yang sah).`;
      } else {
        finalText = `✅ [BERHASIL]: Mengekstrak ${matchCount} dari total ${selectedFiles.length} dokumen.\n` + finalText;
      }

      setOcrText(finalText);
      setIsOcrScanning(false);
      setScanDone(true);

      if (addHistory) {
        addHistory(prev => [{
          id: `TRX-${Date.now().toString().slice(-6)}`,
          date: new Date().toLocaleDateString('en-GB'),
          type: 'Handwritten',
          filename: selectedFiles.length === 1 ? selectedFiles[0].name : `Batch Scan (${selectedFiles.length} File)`,
          status: 'Extracted',
        }, ...prev]);
      }
    }, 2500); 
  };

  const isMultiLayout = selectedFiles.length > 1;
  const workspaceClass = isMultiLayout ? 'ocr-workspace-vertical' : 'ocr-workspace-horizontal';

  return (
    <div className="scan-page">
      <button className="back-btn" onClick={() => setView('dashboard')}>← Kembali ke Dashboard</button>
      
      <div className="upload-container">
        <h2>Scan Dokumen (Multi-Upload)</h2>
        <p style={{color: '#64748b', marginBottom: '30px'}}>Unggah gambar sekaligus untuk diekstraksi secara otomatis .</p>
        
        <div className={`ocr-workspace ${workspaceClass}`}>
          <div className="ocr-left">
            {selectedFiles.length === 0 ? (
              <div className="upload-box">
                <div style={{fontSize: '40px', marginBottom: '10px'}}>📸</div>
                <input type="file" id="image-upload" accept="image/*" multiple onChange={handleImageUpload} hidden />
                <label htmlFor="image-upload" className="upload-label">Pilih Gambar Dokumen</label>
              </div>
            ) : (
              <div className="multi-preview-container">
                <div className="preview-header">
                  <span>{selectedFiles.length} Dokumen Siap Diproses</span>
                  <div>
                    <input type="file" id="image-upload-more" accept="image/*" multiple onChange={handleImageUpload} hidden />
                    <label htmlFor="image-upload-more" className="add-more-label">✚ Tambah</label>
                  </div>
                </div>
                <div className="preview-grid">
                  {selectedFiles.map((file, index) => {
                    const objectUrl = URL.createObjectURL(file);
                    return (
                      <div key={index} className="preview-item">
                        <button className="remove-file-btn" onClick={() => handleRemoveFile(index)}>✕</button>
                        <img src={objectUrl} alt="preview" className="clickable-image" onClick={() => setModalImage(objectUrl)} />
                        <p className="preview-name">{file.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {selectedFiles.length > 0 && !scanDone && (
              <button className="action-btn primary-btn" onClick={handleScan} disabled={isOcrScanning}>
                {isOcrScanning ? 'Memproses Dokumen...' : 'Jalankan Ekstraksi AI'}
              </button>
            )}

            {scanDone && (
              <button className="action-btn success-btn" onClick={handleExportExcel}>
                ⬇️ Export Data ke Excel (.csv)
              </button>
            )}
          </div>
          
          <div className="ocr-right">
            <textarea className="ocr-result-text" placeholder="Terminal log & hasil ekstraksi akan muncul setelah proses selesai..." value={ocrText} readOnly></textarea>
          </div>
        </div>
      </div>

      {modalImage && (
        <div className="image-modal-overlay" onClick={() => setModalImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setModalImage(null)}>✕ Tutup</button>
            <img src={modalImage} alt="Enlarged" />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [history, setHistory] = useState(historyData);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: appStyles }} />
      <div className="app-wrapper">
        <Navbar setView={setCurrentView} />
        <main className="main-content">
          {currentView === 'dashboard' && <Dashboard setView={setCurrentView} history={history} />}
          {currentView === 'scan-handwritten' && <ScanHandwritten setView={setCurrentView} addHistory={setHistory} />}
        </main>
      </div>
    </>
  );
}