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
// 2. DATA DUMMY (FALLBACK LOKAL - MURNI AGUSTINO)
// ==========================================
const ocrDummyDatabase = [
  {
    aliases: ['form_agustino', 'form4'], 
    text: `[DOKUMEN: FORMULIR APLIKASI]\nNama Lengkap : AGUSTINO SUFA BUBUN\nNama Alias : null\nTempat/Tgl Lahir : DILI, 17-03-1992\nNama Gadis Ibu Kandung : null\nJenis Kelamin : LAKI-LAKI\nJenis Identitas Utama : KTP\nNomor Identitas : 3578261703920003\nAlamat Sesuai ID : TAMAN PUSPARAYA A7/21A\nAgama : KATHOLIK\nStatus Pekerjaan : KARYAWAN SWASTA\nStatus Perkawinan : KAWIN\nPendidikan Terakhir : S1\nKewarganegaraan : WNI\nPekerjaan Sekarang : KARYAWAN SWASTA\nNama Perusahaan : PT. SRIJATI CAHAYA KENCANA\nBidang Usaha : null\nSumber Pendapatan : PENDAPATAN TETAP\nNPWP Tambahan : 1000000005375577\nAlamat Tinggal Sekarang : null\nEmail : null\nJenis Rekening : TABUNGAN MANDIRI\nTujuan Pembukaan Rekening : TRANSAKSI PRIBADI\nTujuan Penggunaan Dana : null`
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
  const [isScanning, setIsScanning] = useState(false);
  const [isExtractingPDF, setIsExtractingPDF] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null); 
  const [sysProgress, setSysProgress] = useState({ visible: false, label: '', percent: 0 });
  
  const logContainerRef = useRef(null);

  // Injeksi Script Library PDF.js untuk membedah PDF
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

  const handleImageUpload = async (e) => {
    if (e.target.files.length > 0) {
      setIsExtractingPDF(true); // Tampilkan loading saat membongkar PDF
      const files = Array.from(e.target.files);
      let processedFiles = [];
      
      for (let file of files) {
        if (file.type === 'application/pdf') {
          // LOGIKA UNPACK PDF MENJADI MULTIPLE IMAGE
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            try {
              const arrayBuffer = await file.arrayBuffer();
              const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
              
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 }); // Pertajam resolusi untuk AI
                const canvas = document.createElement('canvas');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
                
                // Ubah nama menjadi MIRA_SETIAWAN_Page_1, Page_2, dll
                const imgFile = new File([blob], `${file.name.replace('.pdf', '')}_Page_${i}.jpg`, { type: 'image/jpeg' });
                processedFiles.push(imgFile);
              }
            } catch (error) {
              console.error("Gagal ekstrak PDF:", error);
              processedFiles.push(file); 
            }
          } else {
            processedFiles.push(file);
          }
        } else {
          processedFiles.push(file); // Bukan PDF, biarkan gambar utuh
        }
      }
      setSelectedFiles(prev => [...prev, ...processedFiles]);
      setIsExtractingPDF(false);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleExportExcel = () => {
    const blob = new Blob([ocrText], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `KYC_Audit_Report_${Date.now()}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const handleScan = async () => {
    setIsScanning(true);
    setOcrText(">> [SYSTEM_INIT] Memulai siklus OCR (1 By 1 Image Node)...\n");
    let resultText = "";
    let systemStatus = "Failed";
    let perFileBreakdown = [];

    // Looping scan persis "1-by-1 image" seperti yang Anda minta
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileNameLower = file.name.toLowerCase();
      let currentParsedText = "";
      
      setOcrText(prev => prev + `\n>> [PROCESS_QUEUE] Analysing: ${file.name}\n`);
      
      const matchedData = ocrDummyDatabase.find(data => data.aliases.some(alias => fileNameLower.includes(alias)));

      if (matchedData) {
        setSysProgress({ visible: true, label: `[LOCAL_CACHE] Reading...`, percent: 0 });
        for(let p=0; p<=100; p+=25) { setSysProgress(prev => ({...prev, percent: p})); await delay(100); }
        setSysProgress({ visible: false, label: '', percent: 0 });

        currentParsedText = matchedData.text;
      } 
      else {
        setSysProgress({ visible: true, label: `[API] Extracting File...`, percent: 0 });
        setOcrText(prev => prev + `>> [NET_TRANSMIT] Sending payload...\n`);
        
        const progressInterval = setInterval(() => {
          setSysProgress(prev => ({ 
            ...prev, percent: prev.percent < 95 ? prev.percent + (95 - prev.percent) * 0.1 : prev.percent 
          }));
        }, 300);

        try {
          const base64Data = await fileToBase64(file);
          const response = await fetch('/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64Data, mimeType: file.type })
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || 'Timeout gateway server.');
          
          currentParsedText = data.text;
          
          clearInterval(progressInterval);
          setSysProgress(prev => ({ ...prev, percent: 100 }));
          await delay(300); 
          setSysProgress({ visible: false, label: '', percent: 0 });
        } catch (error) {
          clearInterval(progressInterval);
          setSysProgress({ visible: false, label: '', percent: 0 });
          currentParsedText = `ERROR: ${error.message}`;
        }
      }

      let detectedDocTypes = [];
      if (currentParsedText.includes('[DOKUMEN: KTP]') || /NIK\s*:/i.test(currentParsedText)) {
        detectedDocTypes.push("KTP");
      }
      if (currentParsedText.includes('[DOKUMEN: NPWP]') || /NPWP\s*:|No NPWP|KPP\s*:/i.test(currentParsedText)) {
        detectedDocTypes.push("NPWP");
      }
      if (currentParsedText.includes('[DOKUMEN: FORMULIR APLIKASI]') || /Nama Lengkap\s*:/i.test(currentParsedText) || /Pt Critati Cahaya kencana|Aplikasi Mandiri/i.test(currentParsedText)) {
        detectedDocTypes.push("FORMULIR APLIKASI");
      }

      if (detectedDocTypes.length === 0) {
        detectedDocTypes.push("DOKUMEN TIDAK DIKENAL / KOSONG");
      }

      if (currentParsedText.includes('ERROR:')) {
        resultText += `\n========================================\n❌ [ERR_EXCEPTION]: GAGAL MEMBACA (${file.name})\n========================================\nStatus: ${currentParsedText}\n`;
        perFileBreakdown.push({ fileName: file.name, type: 'GAGAL', status: 'Gagal Dibaca (Quota Limit / Error)' });
      } else {
        resultText += `\n========================================\n🌐 [API_RESPONSE]: ${detectedDocTypes.join(' & ')}\n========================================\n${currentParsedText}\n`;
        perFileBreakdown.push({ fileName: file.name, type: detectedDocTypes.join(', '), status: 'Berhasil Diekstrak' });
      }
      
      // Delay agar AI API tidak kena Rate Limit (Karena kita men-scan 3 image beruntun dari hasil pecahan PDF)
      if (i < selectedFiles.length - 1 && !matchedData) {
        setSysProgress({ visible: true, label: `[RATE_LIMIT] Waiting limit...`, percent: 50 });
        await delay(5000); 
        setSysProgress({ visible: false, label: '', percent: 0 });
      }
    }

    setOcrText(prev => prev + `\n>> [VALIDATION_NODE] Cross-Validation KYC...\n`);
    setSysProgress({ visible: true, label: `[SECURITY_CHECK] Identity Matching...`, percent: 0 });
    for(let p=0; p<=100; p+=10) { setSysProgress(prev => ({...prev, percent: p})); await delay(80); }
    setSysProgress({ visible: false, label: '', percent: 0 });
    
    // ==========================================
    // LOGIKA PENCOCOKAN ENTITAS PER DOKUMEN
    // ==========================================
    const hasKTP = resultText.includes('[DOKUMEN: KTP]') || /NIK\s*:/i.test(resultText);
    const hasNPWP = resultText.includes('[DOKUMEN: NPWP]') || /No NPWP\s*:/i.test(resultText);
    const hasForm = resultText.includes('[DOKUMEN: FORMULIR APLIKASI]') || /Nama Lengkap\s*:/i.test(resultText);

    let extractedEntities = [];

    // Ambil nama dari KTP
    if (hasKTP) {
      const match = resultText.match(/\[DOKUMEN:\s*KTP\][\s\S]*?Nama\s*:\s*([^\n]+)/i) || resultText.match(/NIK[\s\S]*?Nama\s*:\s*([^\n]+)/i);
      extractedEntities.push({ type: 'KTP', name: (match && match[1].trim().toLowerCase() !== 'null' && match[1].trim() !== '') ? match[1].trim().toUpperCase() : 'NULL' });
    }
    // Ambil nama dari NPWP
    if (hasNPWP) {
      const match = resultText.match(/\[DOKUMEN:\s*NPWP\][\s\S]*?(?:Nama|Nama Pejabat)\s*:\s*([^\n]+)/i) || resultText.match(/NPWP[\s\S]*?(?:Nama|Nama Pejabat)\s*:\s*([^\n]+)/i);
      extractedEntities.push({ type: 'NPWP', name: (match && match[1].trim().toLowerCase() !== 'null' && match[1].trim() !== '') ? match[1].trim().toUpperCase() : 'NULL' });
    }
    // Ambil nama dari FORMULIR
    if (hasForm) {
      const match = resultText.match(/\[DOKUMEN:\s*FORMULIR APLIKASI\][\s\S]*?Nama Lengkap\s*:\s*([^\n]+)/i) || resultText.match(/Nama Lengkap\s*:\s*([^\n]+)/i);
      extractedEntities.push({ type: 'FORMULIR APLIKASI', name: (match && match[1].trim().toLowerCase() !== 'null' && match[1].trim() !== '') ? match[1].trim().toUpperCase() : 'NULL' });
    }

    let isDataComplete = hasKTP && hasNPWP && hasForm;
    let comparisonDetails = "";
    let allMatch = true;

    // Evaluasi Kecocokan (Strict Match)
    if (extractedEntities.length > 0) {
      extractedEntities.forEach(ent => {
        comparisonDetails += `- Nama pada ${ent.type.padEnd(17)} : ${ent.name}\n`;
      });
      
      const referenceName = extractedEntities[0].name;
      // Valid jika SEMUA dokumen ada nama (TIDAK NULL) dan namanya sama persis!
      allMatch = extractedEntities.every(e => e.name !== 'NULL' && e.name === referenceName);
    } else {
      allMatch = false;
      comparisonDetails += `- Tidak ada data identitas (Nama) yang ditemukan untuk divalidasi.\n`;
    }

    if (isDataComplete && allMatch) {
      systemStatus = "Valid";
      comparisonDetails += `\n> [VERDICT]: ✅ MATCH. Identitas konsisten di semua dokumen wajib.`;
    } else if (isDataComplete && !allMatch) {
      systemStatus = "Invalid";
      comparisonDetails += `\n> [VERDICT]: ⚠️ MISMATCH / FRAUD ALERT. Terdapat perbedaan identitas atau data terdeteksi Null!`;
    } else {
      systemStatus = "Invalid";
      comparisonDetails += `\n> [VERDICT]: ❌ INCOMPLETE. Dokumen wajib (KTP, NPWP, Formulir) tidak lengkap.`;
    }

    // Susun Format Laporan
    let structuredReportModal = `========================================\n📋 LAPORAN AUDIT DETAIL PER DOKUMEN\n========================================\n\n`;
    perFileBreakdown.forEach((item, idx) => {
      structuredReportModal += `📄 [File ${idx + 1}]: ${item.fileName}\n`;
      structuredReportModal += `   - Jenis Dokumen Terdeteksi : ${item.type}\n`;
      structuredReportModal += `   - Status Ekstraksi         : ${item.status}\n\n`;
    });

    structuredReportModal += `----------------------------------------\n`;
    structuredReportModal += `[ANALISIS KECOCOKAN IDENTITAS]\n`;
    structuredReportModal += `${comparisonDetails}\n`;
    
    structuredReportModal += `----------------------------------------\n`;
    structuredReportModal += `[KESIMPULAN AKHIR SISTEM]\n`;
    if (systemStatus === 'Valid') {
      structuredReportModal += `👉 Dokumen lengkap (KTP, NPWP, Formulir) dan identitas terverifikasi MATCH. Siap diproses ke core banking.`;
    } else {
      structuredReportModal += `⚠️ PERINGATAN: Berkas dokumen tidak lengkap atau terdapat ketidakcocokan data/Fraud! Wajib ditinjau manual.`;
    }

    let terminalReport = `\n\n========================================\n📋 [FINAL REPORT: KYC VALIDATION]\n========================================\n`;
    terminalReport += `[DOCUMENT_INTEGRITY]\n`;
    terminalReport += `- KTP                : ${hasKTP ? '✅ Done' : '❌ Null / Missing'}\n`;
    terminalReport += `- NPWP               : ${hasNPWP ? '✅ Done' : '❌ Null / Missing'}\n`;
    terminalReport += `- Formulir Aplikasi  : ${hasForm ? '✅ Done' : '❌ Null / Missing'}\n\n`;
    terminalReport += `[IDENTITY_MATCHING]\n${comparisonDetails}\n`;
    terminalReport += `[SYSTEM_VERDICT]\n${systemStatus === 'Valid' ? '✅ STATUS AMAN. Terverifikasi valid.' : '⚠️ STATUS INVALID / REVIEW. Manual action required.'}\n`;

    resultText += `\n\n${terminalReport}`;
    setOcrText(`[TRANSACTION_COMPLETE]\n${resultText}`);
    setIsScanning(false);

    const fileNamesArray = selectedFiles.map(f => f.name);
    addHistory({
      id: Date.now(),
      date: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      files: fileNamesArray,
      status: systemStatus,
      reportData: structuredReportModal
    });
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
                {selectedFiles.map((file, i) => {
                  const fileUrl = URL.createObjectURL(file);
                  return (
                    <div key={i} className="preview-item">
                      <button className="remove-file-btn" onClick={() => handleRemoveFile(i)}>✕</button>
                      <img src={fileUrl} alt={`preview-${i}`} className="clickable-image" onClick={() => setZoomedImage(fileUrl)} />
                    </div>
                  );
                })}

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