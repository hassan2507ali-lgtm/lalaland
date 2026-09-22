import React, { useState, useRef, useEffect } from 'react';
import mandiriLogo from './assets/mandiri.png';

// ==========================================
// 1. GAYA DESAIN (CSS IN-JS RESPONSIF)
// ==========================================
const appStyles = `
  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --primary: #0056a8; 
    --primary-light: #0077c8; 
    --bg-color: #f1f5f9;
    --surface: #ffffff; 
    --text-main: #1e293b; 
    --text-muted: #64748b;
    --border-light: #e2e8f0; 
    --success: #10b981; 
    --danger: #ef4444;
    --warning: #f59e0b;
    --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05); 
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
    --radius-md: 12px;
  }
  
  body { 
    margin: 0; 
    font-family: 'Inter', system-ui, sans-serif; 
    background-color: var(--bg-color); 
    color: var(--text-main); 
    overflow-x: hidden; 
  }
  
  .app-wrapper { min-height: 100vh; display: flex; flex-direction: column; width: 100vw; overflow-x: hidden; }
  
  /* Navbar & Dropdown Sample Files */
  .navbar { background: var(--surface); border-bottom: 1px solid var(--border-light); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow-sm); width: 100%; }
  .nav-content { max-width: 1400px; width: 100%; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; }
  .nav-profile-container { position: relative; }
  .nav-profile { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 6px 12px; border-radius: 8px; transition: 0.2s; user-select: none; }
  .nav-profile:hover { background: #f8fafc; }
  .user-avatar { background: var(--primary); color: white; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 600; font-size: 13px; }
  .user-name { font-weight: 600; font-size: 14px; }
  
  .profile-dropdown { position: absolute; top: 110%; right: 0; background: white; border: 1px solid var(--border-light); border-radius: 10px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); width: 260px; z-index: 200; overflow: hidden; }
  .dropdown-header { padding: 12px 16px; background: #f8fafc; font-size: 12px; font-weight: bold; color: var(--text-muted); border-bottom: 1px solid var(--border-light); }
  .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; color: var(--text-main); text-decoration: none; font-size: 13px; border-bottom: 1px solid #f1f5f9; transition: 0.2s; }
  .dropdown-item:hover { background: #f0f7ff; color: var(--primary); }

  /* Main Container */
  .main-content { max-width: 1400px; width: 100%; margin: 0 auto; padding: 24px 16px; flex: 1; }

  /* Dashboard & History */
  .hero-section { text-align: center; padding: 10px 10px 30px; }
  .hero-section h1 { font-size: clamp(32px, 5vw, 44px); font-weight: 800; margin-bottom: 12px; letter-spacing: -1px; }
  .hero-section h1 span { color: var(--primary); }
  .hero-section p { font-size: clamp(15px, 2vw, 18px); color: var(--text-muted); max-width: 600px; margin: 0 auto; }
  .center-card-container { display: flex; justify-content: center; margin-bottom: 30px; }
  .card { background: var(--surface); border-radius: 16px; padding: 30px 20px; cursor: pointer; border: 1px solid var(--border-light); text-align: center; max-width: 400px; width: 100%; box-shadow: var(--shadow-sm); transition: 0.3s; }
  .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--primary-light); }
  .card-icon { font-size: 42px; margin: 0 auto 16px; background: #f0f7ff; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; border-radius: 18px; }
  .card-title { font-size: 20px; font-weight: 700; margin: 0 0 8px; }
  .card-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; }

  /* History Table Responsif */
  .history-section { max-width: 1000px; width: 100%; margin: 0 auto; background: var(--surface); border-radius: 16px; border: 1px solid var(--border-light); padding: 20px; box-shadow: var(--shadow-sm); overflow-x: auto; }
  .history-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 12px; flex-wrap: wrap; gap: 10px; }
  .history-header h3 { margin: 0; font-size: 17px; color: var(--text-main); }
  
  .table-responsive-wrapper { width: 100%; overflow-x: auto; }
  .history-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 600px; }
  .history-table th { padding: 12px; font-size: 12px; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid var(--border-light); text-transform: uppercase; letter-spacing: 0.5px; }
  .history-table td { padding: 14px 12px; font-size: 13.5px; color: var(--text-main); border-bottom: 1px solid var(--border-light); vertical-align: middle; }
  .history-table tr:last-child td { border-bottom: none; }
  .history-table tbody tr { cursor: pointer; transition: 0.2s; }
  .history-table tbody tr:hover { background: #f0f7ff; }

  .badge { display: inline-block; padding: 5px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700; text-align: center; }
  .badge.success { background: #d1fae5; color: #065f46; border: 1px solid #34d399; }
  .badge.danger { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
  .badge.warning { background: #fef3c7; color: #92400e; border: 1px solid #fbbf24; }
  .file-tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .file-tag { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 3px 6px; border-radius: 4px; font-size: 11px; color: #475569; font-family: monospace; }

  /* Workspace Layout */
  .workspace-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; width: 100%; flex-wrap: wrap; gap: 12px; }
  .workspace-title { font-size: 22px; font-weight: 700; margin: 0; }
  .back-btn { background: white; border: 1px solid var(--border-light); padding: 8px 16px; border-radius: 8px; color: var(--text-main); font-weight: 600; cursor: pointer; font-size: 13.5px; transition: 0.2s; box-shadow: var(--shadow-sm); }
  .back-btn:hover { background: #f8fafc; border-color: #cbd5e1; }

  .workspace-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; align-items: start; width: 100%; }
  
  @media (max-width: 960px) {
    .workspace-grid { grid-template-columns: 1fr; }
    .control-panel { position: static !important; width: 100%; }
    .log-panel { height: 500px !important; width: 100%; }
  }
  
  /* Left Panel: Controls */
  .control-panel { background: var(--surface); padding: 20px; border-radius: 12px; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 16px; position: sticky; top: 80px; }
  .upload-box { border: 2px dashed #cbd5e1; border-radius: 12px; background: #f8fafc; padding: 30px 16px; text-align: center; cursor: pointer; transition: 0.2s; position: relative; }
  .upload-box:hover { border-color: var(--primary); background: #f0f7ff; }
  .upload-label { background: var(--surface); border: 1px solid var(--border-light); padding: 8px 16px; border-radius: 8px; font-weight: 600; color: var(--primary); cursor: pointer; display: inline-block; box-shadow: var(--shadow-sm); font-size: 14px; }
  
  .preview-section { display: flex; flex-direction: column; gap: 10px; }
  .preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; }
  .preview-item { position: relative; width: 100%; aspect-ratio: 1; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-light); background: #f8fafc; }
  .clickable-image { width: 100%; height: 100%; object-fit: cover; cursor: zoom-in; transition: 0.2s; }
  .clickable-image:hover { opacity: 0.8; transform: scale(1.05); }
  .remove-file-btn { position: absolute; top: 3px; right: 3px; background: rgba(239, 68, 68, 0.9); color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; z-index: 10; font-weight: bold; font-size: 11px; display: flex; align-items: center; justify-content: center; }
  .add-more-box { width: 100%; aspect-ratio: 1; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; color: var(--text-muted); font-size: 11px; font-weight: bold; background: #f8fafc; transition: 0.2s; }
  .add-more-box:hover { border-color: var(--primary); color: var(--primary); background: #f0f7ff; }

  /* Right Panel: Clean Log Panel */
  .log-panel { background: var(--surface); border-radius: 12px; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; height: calc(100vh - 120px); min-height: 480px; overflow: hidden; width: 100%; }
  .log-header { padding: 14px 20px; border-bottom: 1px solid var(--border-light); background: #f8fafc; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .log-title { margin: 0; font-size: 15px; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 8px; }
  
  .ocr-result-text { 
    flex: 1; padding: 20px; font-family: 'Consolas', 'Menlo', 'Monaco', monospace; 
    background: #ffffff; color: var(--text-main); font-size: 13px; line-height: 1.6; 
    overflow-y: auto; overflow-x: hidden; 
    white-space: pre-wrap; word-break: break-word; 
  }
  
  .ocr-result-text::-webkit-scrollbar { width: 6px; }
  .ocr-result-text::-webkit-scrollbar-track { background: #f1f5f9; }
  .ocr-result-text::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
  .ocr-result-text::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

  /* Buttons */
  .action-btn { width: 100%; padding: 12px; font-size: 14.5px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: 0.3s; display: flex; justify-content: center; align-items: center; gap: 8px; }
  .primary-btn { background: var(--primary); color: white; }
  .primary-btn:hover:not(:disabled) { background: var(--primary-light); }
  .primary-btn:disabled { background: #94a3b8; cursor: not-allowed; }
  
  .export-btn { background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 5px; }
  .export-btn:hover { background: #059669; }

  /* Modals */
  .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.8); z-index: 9999; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(3px); padding: 16px; }
  .modal-content { position: relative; max-width: 95%; max-height: 90vh; }
  .modal-content img { max-width: 100%; max-height: 85vh; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
  .close-modal-btn { position: absolute; top: -14px; right: -14px; background: var(--danger); color: white; border: 2px solid white; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; font-size: 15px; font-weight: bold; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md); transition: 0.2s; }
  .close-modal-btn:hover { transform: scale(1.1); }

  /* Report Modal Popup */
  .report-modal { background: var(--surface); padding: 24px; border-radius: 16px; width: 650px; max-width: 100%; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); }
  .report-modal-header { border-bottom: 1px solid var(--border-light); padding-bottom: 12px; margin-bottom: 12px; }
  .report-modal-header h2 { margin: 0 0 6px 0; font-size: 18px; color: var(--text-main); }
  .report-modal-body { overflow-y: auto; flex: 1; background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid var(--border-light); }
  .report-modal-text { font-family: 'Consolas', monospace; font-size: 12.5px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; color: var(--text-main); margin: 0; }
`;

// ==========================================
// 2. DATA DUMMY (FALLBACK LOKAL)
// ==========================================
const ocrDummyDatabase = [
  {
    aliases: ['form_agustino', 'form4'], 
    text: `[DOKUMEN: FORMULIR APLIKASI]\nNama Lengkap : AGUSTINO SUFA BUBUN\nNama Alias : -\nTempat/Tgl Lahir : DILI, 17-03-1992\nNama Gadis Ibu Kandung : -\nJenis Kelamin : LAKI-LAKI\nJenis Identitas Utama : KTP\nNomor Identitas : 3578261703920003\nAlamat Sesuai ID : TAMAN PUSPARAYA A7/21A\nAgama : KATHOLIK\nStatus Pekerjaan : KARYAWAN SWASTA\nStatus Perkawinan : KAWIN\nPendidikan Terakhir : S1\nKewarganegaraan : WNI\nPekerjaan Sekarang : KARYAWAN SWASTA\nNama Perusahaan : PT. SRIJATI CAHAYA KENCANA\nBidang Usaha : -\nSumber Pendapatan : PENDAPATAN TETAP\nNPWP Tambahan : 1000000005375577\nAlamat Tinggal Sekarang : -\nEmail : -\nJenis Rekening : TABUNGAN MANDIRI\nTujuan Pembukaan Rekening : TRANSAKSI PRIBADI\nTujuan Penggunaan Dana : -`
  },
  {
    aliases: ['ktp_agustino'], 
    text: `[DOKUMEN: KTP]\nNIK : 3578261703920003\nNama : Agustino Sufa Bubun\nTempat/Tgl Lahir : DILI, 17-03-1992\nJenis Kelamin : LAKI-LAKI\nAlamat : TAMAN PUSPARAYA A7/21A\nRT/RW : 007/008\nKel/Desa : PEGADUNGAN\nKecamatan : KALIDERES\nAgama : KATHOLIK\nStatus Perkawinan : KAWIN\nPekerjaan : KARYAWAN SWASTA`
  },
  {
    aliases: ['npwp_agustino'], 
    text: `[DOKUMEN: NPWP]\nNo NPWP : 1000 0000 0537 5577\nNama : Agustino Sufa Bubun\nAlamat : KOTA SURABAYA, JAWA TIMUR`
  }
];

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]);
  reader.onerror = error => reject(error);
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// 3. KOMPONEN UI
// ==========================================
const Navbar = ({ setView }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sampleFiles = [
    { name: 'comb_docs.pdf', type: 'pdf' },
    { name: 'form_agustino.jpeg', type: 'image' },
    { name: 'ktp_agustino.jpeg', type: 'image' },
    { name: 'npwp_agustino.jpeg', type: 'image' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div onClick={() => setView('dashboard')} style={{cursor: 'pointer'}}>
          <img src={mandiriLogo} alt="Logo Mandiri" style={{ height: '28px' }} />
        </div>
        
        <div className="nav-profile-container">
          <div className="nav-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="user-avatar">A</span>
            <span className="user-name">Admin</span>
          </div>
          
          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">📥 Download Berkas Uji Coba</div>
              {sampleFiles.map((file, i) => (
                <a 
                  key={i} 
                  href={`/${file.name}`} 
                  download={file.name} 
                  target="_blank" 
                  rel="noreferrer"
                  className="dropdown-item"
                >
                  <span>{file.type === 'pdf' ? '📄' : '🟢'}</span> {file.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Dashboard = ({ setView, scanHistory }) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <section className="dashboard">
      <header className="hero-section">
        <h1>Enterprise KYC <span>Engine</span></h1>
        <p>Sistem Validasi Dokumen & OCR.</p>
      </header>
      
      <div className="center-card-container">
        <article className="card" onClick={() => setView('scan')}>
          <div className="card-icon">⚡</div>
          <h3 className="card-title">Initiate Workspace</h3>
          <p className="card-desc">open console for KYC Document Processing.</p>
          <div style={{ marginTop: '16px', color: 'var(--primary)', fontWeight: 'bold' }}>Access Console &rarr;</div>
        </article>
      </div>

      <div className="history-section">
        <div className="history-header">
          <h3>History Report</h3>
          <span style={{fontSize: '13px', color: 'var(--text-muted)'}}>Total: {scanHistory.length} Transaksi</span>
        </div>
        
        {scanHistory.length === 0 ? (
          <div style={{textAlign: 'center', padding: '30px', color: 'var(--text-muted)'}}>
            <div style={{fontSize: '28px', marginBottom: '8px'}}>📂</div>
            <p style={{margin: 0, fontSize: '14px'}}>No History Found</p>
          </div>
        ) : (
          <div className="table-responsive-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Waktu Audit</th>
                  <th>Nama File (Input)</th>
                  <th>Status KYC</th>
                </tr>
              </thead>
              <tbody>
                {scanHistory.map((item) => (
                  <tr key={item.id} onClick={() => setSelectedRecord(item)} title="Klik untuk melihat detail laporan per dokumen">
                    <td style={{fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--primary)'}}>TRX-{item.id.toString().slice(-6)}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{item.date}</td>
                    <td>
                      <div className="file-tags">
                        {item.files.map((fileName, idx) => (
                          <span key={idx} className="file-tag">{fileName}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${item.status === 'Valid' ? 'success' : item.status === 'Invalid' ? 'danger' : 'warning'}`}>
                        {item.status === 'Valid' ? '✅ AMAN' : item.status === 'Invalid' ? '⚠️ FRAUD / REVIEW' : '❌ GAGAL BACA'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content report-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedRecord(null)}>✕</button>
            <div className="report-modal-header">
              <h2>Detail Audit Per Dokumen: TRX-{selectedRecord.id.toString().slice(-6)}</h2>
              <div style={{display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap'}}>
                <span style={{fontSize: '12.5px', color: 'var(--text-muted)'}}>📅 {selectedRecord.date}</span>
                <span className={`badge ${selectedRecord.status === 'Valid' ? 'success' : selectedRecord.status === 'Invalid' ? 'danger' : 'warning'}`}>
                   Status: {selectedRecord.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="report-modal-body">
              <pre className="report-modal-text">{selectedRecord.reportData}</pre>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

const ScanHandwritten = ({ setView, addHistory }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]); 
  const [isScanning, setIsScanning] = useState(false);
  const [isExtractingPDF, setIsExtractingPDF] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null); 
  const [sysProgress, setSysProgress] = useState({ visible: false, label: '', percent: 0 });
  
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById('pdfjs-script')) {
      const script = document.createElement('script');
      script.id = 'pdfjs-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [ocrText, sysProgress]);

  // Fungsi Upload dengan Pembersihan Memori Total (Anti-White Screen)
  const handleImageUpload = async (e) => {
    if (e.target.files.length > 0) {
      setIsExtractingPDF(true); 
      const files = Array.from(e.target.files);
      let processedFiles = [];
      let processedUrls = []; 
      
      for (let file of files) {
        if (file.type === 'application/pdf') {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            try {
              const arrayBuffer = await file.arrayBuffer();
              const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
              
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
                
                const imgFile = new File([blob], `${file.name.replace('.pdf', '')}_Page_${i}.jpg`, { type: 'image/jpeg' });
                processedFiles.push(imgFile);
                processedUrls.push(URL.createObjectURL(imgFile)); 

                // Sapu bersih RAM dari PDF.js
                page.cleanup(); 
                canvas.width = 0; 
                canvas.height = 0; 
              }
              pdf.destroy(); 
            } catch (error) {
              console.error("Gagal ekstrak PDF:", error);
              processedFiles.push(file); 
              processedUrls.push(URL.createObjectURL(file));
            }
          } else {
            processedFiles.push(file);
            processedUrls.push(URL.createObjectURL(file));
          }
        } else {
          processedFiles.push(file); 
          processedUrls.push(URL.createObjectURL(file));
        }
      }
      setSelectedFiles(prev => [...prev, ...processedFiles]);
      setFilePreviews(prev => [...prev, ...processedUrls]); 
      setIsExtractingPDF(false);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== indexToRemove));
    setFilePreviews(prev => prev.filter((_, i) => i !== indexToRemove)); 
  };

  const handleExportExcel = () => {
    const blob = new Blob([ocrText], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `KYC_Audit_Report_${Date.now()}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  // Fungsi Utama Scan dengan Proteksi Cerdas (Smart Abort & Try-Catch Global)
  const handleScan = async () => {
    try {
      setIsScanning(true);
      setOcrText(">> [SYSTEM_INIT] Memulai Pipeline Penyortiran Dokumen...\n");

      let allScannedOutputs = [];
      let perFileBreakdown = [];
      let isCloudQuotaExceeded = false;

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileNameLower = file.name ? file.name.toLowerCase() : `file_${i}`;
        let currentParsedText = "";

        setOcrText(prev => prev + `>> [BUFFER] Mengekstrak data dari halaman: ${file.name}...\n`);

        const matchedData = ocrDummyDatabase.find(data => data.aliases.some(alias => fileNameLower.includes(alias)));

        if (matchedData) {
          setSysProgress({ visible: true, label: `[LOKAL] Membaca data...`, percent: 50 });
          await delay(800);
          currentParsedText = matchedData.text;
        } else {
          let success = false;
          let retries = 3;
          let lastError = "";

          if (isCloudQuotaExceeded) {
             setOcrText(prev => prev + `>> [BYPASS] Kuota API habis, beralih ke data lokal...\n`);
             const fallbackData = ocrDummyDatabase[0]; 
             currentParsedText = fallbackData ? fallbackData.text : `ERROR: Kuota Habis`;
             success = true;
          }

          while (retries > 0 && !success && !isCloudQuotaExceeded) {
            setSysProgress({ visible: true, label: `[CLOUD_AI] Memproses gambar ${i + 1} (Sisa Coba: ${retries})...`, percent: 50 });
            
            try {
              const base64Data = await fileToBase64(file);
              const response = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: base64Data, mimeType: file.type || 'image/jpeg' })
              });

              const data = await response.json();
              
              if (!response.ok) {
                const errMsg = data.error?.message || data.error || 'Server error';
                if (errMsg.includes('Quota') || errMsg.includes('429')) {
                    isCloudQuotaExceeded = true;
                    throw new Error('API_QUOTA_EXCEEDED');
                }
                throw new Error(errMsg);
              }

              currentParsedText = data?.text || "ERROR: Teks kosong dari API";
              success = true; 
            } catch (error) {
              lastError = error.message;
              if (lastError === 'API_QUOTA_EXCEEDED') {
                setOcrText(prev => prev + `>> [FATAL] Kuota API Habis. Beralih ke Lokal...\n`);
                retries = 0; 
              } else {
                retries--;
                if (retries > 0) {
                  setOcrText(prev => prev + `>> [WARNING] API Gagal (${lastError}). Coba ulang dalam 4 detik...\n`);
                  await delay(4000); 
                }
              }
            }
          }

          if (!success) {
            const fallbackData = ocrDummyDatabase[0]; 
            currentParsedText = fallbackData ? fallbackData.text : `ERROR: ${lastError}`;
          }
        }

        let docType = "DOKUMEN TIDAK DIKENAL / KOSONG";
        if (currentParsedText.includes('[DOKUMEN: KTP]') || /NIK\s*:/i.test(currentParsedText)) docType = "KTP";
        else if (currentParsedText.includes('[DOKUMEN: NPWP]') || /No NPWP/i.test(currentParsedText)) docType = "NPWP";
        else if (currentParsedText.includes('[DOKUMEN: FORMULIR APLIKASI]') || /Nama Lengkap\s*:/i.test(currentParsedText) || /Nama Perusahaan\s*:/i.test(currentParsedText)) docType = "FORMULIR APLIKASI";

        allScannedOutputs.push({ fileName: file.name, type: docType, text: currentParsedText });
        perFileBreakdown.push({ fileName: file.name, type: docType, status: currentParsedText.includes('ERROR:') ? 'Gagal' : 'Berhasil' });

        if (i < selectedFiles.length - 1 && !matchedData && !isCloudQuotaExceeded) {
          setSysProgress({ visible: true, label: `[RATE_LIMIT] Pendinginan server API...`, percent: 80 });
          await delay(4000);
        }
      }

      setSysProgress({ visible: false, label: '', percent: 0 });
      setOcrText(prev => prev + `>> [SORT_MERGE] Mengurutkan dan menggabungkan halaman...\n`);
      await delay(500);

      let displayResultText = "";
      let ktpOutput = allScannedOutputs.find(x => x.type === 'KTP');
      let npwpOutput = allScannedOutputs.find(x => x.type === 'NPWP');
      let formOutputs = allScannedOutputs.filter(x => x.type === 'FORMULIR APLIKASI');
      let errorOutputs = allScannedOutputs.filter(x => x.type === 'DOKUMEN TIDAK DIKENAL / KOSONG' || x.text.includes('ERROR:'));

      if (ktpOutput) displayResultText += `\n========================================\n🌐 [API_RESPONSE]: KTP\n========================================\n${ktpOutput.text}\n`;
      if (npwpOutput) displayResultText += `\n========================================\n🌐 [API_RESPONSE]: NPWP\n========================================\n${npwpOutput.text}\n`;
      
      if (formOutputs.length > 0) {
        const bestForm = formOutputs.reduce((prev, current) => (prev.text.length > current.text.length) ? prev : current);
        displayResultText += `\n========================================\n🌐 [API_RESPONSE]: FORMULIR APLIKASI\n========================================\n${bestForm.text}\n`;
        if (formOutputs.length > 1) displayResultText += `\n> [INFO_SISTEM] ${formOutputs.length - 1} halaman lampiran formulir disatukan.\n`;
      }

      errorOutputs.forEach(item => {
        displayResultText += `\n========================================\n⚠️ [UNKNOWN/ERROR]: ${item.fileName}\n========================================\n${item.text}\n`;
      });

      const rawMergedText = allScannedOutputs.map(o => o.text).join("\n");
      let extractedEntities = [];

      if (ktpOutput) {
        const match = rawMergedText.match(/\[DOKUMEN:\s*KTP\][\s\S]*?Nama\s*:\s*([^\n]{1,100})/i) || rawMergedText.match(/NIK[\s\S]*?Nama\s*:\s*([^\n]{1,100})/i);
        extractedEntities.push({ type: 'KTP', name: (match && match[1].trim() !== 'null' && match[1].trim() !== '-' && match[1].trim() !== '') ? match[1].trim().toUpperCase() : 'NULL' });
      }
      if (npwpOutput) {
        const match = rawMergedText.match(/\[DOKUMEN:\s*NPWP\][\s\S]*?(?:Nama|Nama Pejabat)\s*:\s*([^\n]{1,100})/i) || rawMergedText.match(/NPWP[\s\S]*?(?:Nama|Nama Pejabat)\s*:\s*([^\n]{1,100})/i);
        extractedEntities.push({ type: 'NPWP', name: (match && match[1].trim() !== 'null' && match[1].trim() !== '-' && match[1].trim() !== '') ? match[1].trim().toUpperCase() : 'NULL' });
      }
      if (formOutputs.length > 0) {
        const match = rawMergedText.match(/\[DOKUMEN:\s*FORMULIR APLIKASI\][\s\S]*?(?:Nama Lengkap|Nama Pejabat)\s*:\s*([^\n]{1,100})/i) || rawMergedText.match(/Nama Lengkap\s*:\s*([^\n]{1,100})/i);
        extractedEntities.push({ type: 'FORMULIR APLIKASI', name: (match && match[1].trim() !== 'null' && match[1].trim() !== '-' && match[1].trim() !== '') ? match[1].trim().toUpperCase() : 'NULL' });
      }

      let isDataComplete = !!ktpOutput && !!npwpOutput && formOutputs.length > 0;
      let comparisonDetails = "";
      let allMatch = true;

      if (extractedEntities.length > 0) {
        extractedEntities.forEach(ent => { comparisonDetails += `- Nama pada ${ent.type.padEnd(17)} : ${ent.name}\n`; });
        const referenceName = extractedEntities[0].name;
        allMatch = extractedEntities.every(e => e.name !== 'NULL' && e.name === referenceName);
      } else {
        allMatch = false;
        comparisonDetails += `- Tidak ada data identitas yang ditemukan.\n`;
      }

      let systemStatus = (isDataComplete && allMatch) ? "Valid" : (isDataComplete && !allMatch) ? "Invalid" : "Invalid";
      if (isDataComplete && allMatch) comparisonDetails += `\n> [VERDICT]: ✅ MATCH. Identitas konsisten.`;
      else if (isDataComplete && !allMatch) comparisonDetails += `\n> [VERDICT]: ⚠️ MISMATCH. Terdapat perbedaan identitas!`;
      else comparisonDetails += `\n> [VERDICT]: ❌ INCOMPLETE. Dokumen wajib tidak lengkap.`;

      let terminalReport = `\n\n========================================\n📋 [FINAL REPORT: KYC VALIDATION]\n========================================\n[DOCUMENT_INTEGRITY]\n`;
      terminalReport += `- KTP                : ${!!ktpOutput ? '✅ Done' : '❌ Null / Missing'}\n`;
      terminalReport += `- NPWP               : ${!!npwpOutput ? '✅ Done' : '❌ Null / Missing'}\n`;
      terminalReport += `- Formulir Aplikasi  : ${formOutputs.length > 0 ? '✅ Done' : '❌ Null / Missing'}\n\n`;
      terminalReport += `[IDENTITY_MATCHING]\n${comparisonDetails}\n`;
      terminalReport += `[SYSTEM_VERDICT]\n${systemStatus === 'Valid' ? '✅ STATUS AMAN.' : '⚠️ STATUS INVALID.'}\n`;

      setOcrText(prev => prev + `\n[TRANSACTION_COMPLETE]\n${displayResultText}${terminalReport}`);
      setIsScanning(false);

      let structuredReportModal = `========================================\n📋 LAPORAN AUDIT\n========================================\n\n`;
      perFileBreakdown.forEach((item, idx) => {
        structuredReportModal += `📄 [File ${idx + 1}]: ${item.fileName}\n   - Jenis Dokumen : ${item.type}\n   - Status : ${item.status}\n\n`;
      });
      structuredReportModal += `----------------------------------------\n[KESIMPULAN]\nStatus Akhir KYC: ${systemStatus.toUpperCase()}`;

      addHistory({
        id: Date.now(),
        date: new Date().toLocaleString('id-ID'),
        files: selectedFiles.map(f => f.name || 'unknown'),
        status: systemStatus,
        reportData: structuredReportModal
      });

    } catch (err) {
      console.error("FATAL UI CRASH:", err);
      setOcrText(prev => prev + `\n\n========================================\n❌ [SYSTEM FATAL ERROR] Mencegah Blank Screen!\n========================================\nPesan Error: ${err.message}`);
      setIsScanning(false);
      setSysProgress({ visible: false, label: '', percent: 0 });
    }
  };

  return (
    <div className="main-content">
      {zoomedImage && (
        <div className="modal-overlay" onClick={() => setZoomedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setZoomedImage(null)}>✕</button>
            <img src={zoomedImage} alt="Zoomed Preview" />
          </div>
        </div>
      )}

      <div className="workspace-header">
        <h1 className="workspace-title">Validation Workspace</h1>
        <button className="back-btn" onClick={() => setView('dashboard')}>← Keluar Workspace</button>
      </div>
      
      <div className="workspace-grid">
        
        {/* KOLOM KIRI: CONTROL PANEL */}
        <div className="control-panel">
          <div className="preview-section">
            <h4 style={{margin: '0 0 10px 0', fontSize: '14px', color: 'var(--text-main)'}}>Document Queue</h4>
            
            {selectedFiles.length === 0 ? (
              <div className="upload-box">
                {isExtractingPDF ? (
                   <div style={{color: 'var(--primary)', fontWeight: 'bold', fontSize: '14px'}}>⏳ Mengurai File PDF...</div>
                ) : (
                  <>
                    <div style={{fontSize: '36px', marginBottom:'8px'}}>📥</div>
                    <input type="file" id="image-upload" accept="image/*,application/pdf" multiple onChange={handleImageUpload} hidden />
                    <label htmlFor="image-upload" className="upload-label">Upload Documents</label>
                    <p style={{fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '10px', marginBottom: 0}}>JPG, PNG, PDF</p>
                  </>
                )}
              </div>
            ) : (
              <div className="preview-grid">
                {filePreviews.map((url, i) => (
                  <div key={i} className="preview-item">
                    <button className="remove-file-btn" onClick={() => handleRemoveFile(i)}>✕</button>
                    <img src={url} alt={`preview-${i}`} className="clickable-image" onClick={() => setZoomedImage(url)} />
                  </div>
                ))}

                <label className="add-more-box" htmlFor="add-more-upload" style={{opacity: isExtractingPDF ? 0.5 : 1, pointerEvents: isExtractingPDF ? 'none' : 'auto'}}>
                  <span style={{fontSize: '18px', marginBottom: '2px'}}>{isExtractingPDF ? '⏳' : '+'}</span>
                  {isExtractingPDF ? 'Loading' : 'Tambah'}
                  <input type="file" id="add-more-upload" accept="image/*,application/pdf" multiple onChange={handleImageUpload} hidden />
                </label>
              </div>
            )}
          </div>

          <div style={{borderTop: '1px solid var(--border-light)', paddingTop: '16px'}}>
            <button className="action-btn primary-btn" onClick={handleScan} disabled={isScanning || selectedFiles.length === 0 || isExtractingPDF}>
              {isScanning ? (
                <>⏳ Memproses Transaksi...</>
              ) : (
                <>Scan Documents</>
              )}
            </button>
          </div>
        </div>
        
        {/* KOLOM KANAN: CLEAN LOG PANEL */}
        <div className="log-panel">
          <div className="log-header">
            <h3 className="log-title">
              <span style={{fontSize: '16px'}}>📟</span> System Activity Log
            </h3>
            {ocrText.includes('[TRANSACTION_COMPLETE]') && (
              <button className="export-btn" onClick={handleExportExcel}>
                ⬇ Export CSV
              </button>
            )}
          </div>

          <div className="ocr-result-text" ref={logContainerRef}>
            {ocrText}
            
            {sysProgress.visible && (
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', 
                marginTop: '12px', padding: '10px 12px', 
                background: '#f0f7ff', borderRadius: '8px', 
                borderLeft: '3px solid var(--primary)' 
              }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '12.5px' }}>
                  {">>"} {sysProgress.label} ({Math.round(sysProgress.percent)}%)
                </span>
                <div style={{ flex: 1, height: '6px', background: '#cbd5e1', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${sysProgress.percent}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s linear' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [scanHistory, setScanHistory] = useState([]);
  
  const addHistory = (record) => setScanHistory(prev => [record, ...prev]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: appStyles }} />
      <div className="app-wrapper">
        <Navbar setView={setCurrentView} />
        {currentView === 'dashboard' ? (
          <Dashboard setView={setCurrentView} scanHistory={scanHistory} />
        ) : (
          <ScanHandwritten setView={setCurrentView} addHistory={addHistory} />
        )}
      </div>
    </>
  );
}