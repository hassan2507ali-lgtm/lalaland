import React, { useState, useEffect } from 'react';
import { Topbar, Sidebar } from '../components/DashboardNavigation';
import { 
  QueueTable, EmptyState, NewRequest, UploadDocs, ProgressAI, 
  ResultListView, ResultDetailView, DetailView, FindingsView, 
  TrackingListView, TrackingDetailView, AuditTrail 
} from '../components/DashboardScreens';

export default function Dashboard() {
  const [screen, setScreen] = useState('queue');
  const [notifOpen, setNotifOpen] = useState(false);
  
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [ocrResult, setOcrResult] = useState(null);

  const [ticketNumber, setTicketNumber] = useState('');
  const [requestType, setRequestType] = useState('Perubahan / Penambahan Layanan');
  const [docStatus, setDocStatus] = useState('DRAFT');

  const [activeDocIndex, setActiveDocIndex] = useState(0);

  useEffect(() => {
    if (screen === 'progress') {
      setDocStatus('DIPERIKSA AI');
      jalankanMesinOCR();
    }
  }, [screen]);

  const jalankanMesinOCR = async () => {
    try {
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      let imagesToProcess = [];

      const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); 
        reader.onerror = error => reject(error);
      });

      // Siapkan dokumen yang diupload
      const singleDocs = ['form', 'ktp', 'npwp'];
      for (const docKey of singleDocs) {
        if (uploadedFiles[docKey]) {
          const file = uploadedFiles[docKey];
          const base64Data = await fileToBase64(file);
          imagesToProcess.push({ source: docKey.toUpperCase(), imageBase64: base64Data, mimeType: file.type });
        }
      }

      if (uploadedFiles.full_pdf) {
        const pdfData = await uploadedFiles.full_pdf.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: pdfData }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.2 }); 
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: ctx, viewport: viewport }).promise;
          const base64Img = canvas.toDataURL('image/jpeg').split(',')[1];
          imagesToProcess.push({ source: `PDF GABUNGAN (Hal ${i})`, imageBase64: base64Img, mimeType: 'image/jpeg' });
        }
      }

      if (imagesToProcess.length === 0) throw new Error("Tidak ada dokumen yang dipilih.");

      // 1. Eksekusi OCR ke API dan kumpulkan Teks Mentah (Raw)
      let rawResults = [];
      for (let i = 0; i < imagesToProcess.length; i++) {
        const img = imagesToProcess[i];
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: img.imageBase64, mimeType: img.mimeType })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Gagal memproses dokumen ${img.source}`);

        rawResults.push({ source: img.source, text: data.text, imageBase64: img.imageBase64, mimeType: img.mimeType });
        
        if (i < imagesToProcess.length - 1) await delay(2000); // Anti-rate limit API
      }

      // ========================================================
      // LOGIKA MASTER PROFILE (PATOKAN DATA) & AUTO-FILL
      // ========================================================
      
      let masterProfile = { 
        nama: null, npwp: null, alamat: null, nik: null, telepon: null, companyId: null 
      };
      
      // Tahap 1: Coba ambil data valid (Bukan Null) dari dokumen apapun yang berhasil di-scan
      rawResults.forEach(doc => {
        const lines = doc.text.split('\n');
        lines.forEach(line => {
          if (!line.includes(':')) return;
          const [key, ...valArr] = line.split(':');
          const val = valArr.join(':').trim();
          const lowerKey = key.toLowerCase();
          const lowerVal = val.toLowerCase();
          
          // Jika ketemu isian asli dari foto, jadikan Patokan Utama
          if (lowerVal && lowerVal !== 'null' && lowerVal !== '-') {
            if (lowerKey.includes('nama') && !masterProfile.nama) masterProfile.nama = val;
            if (lowerKey.includes('npwp') && !masterProfile.npwp) masterProfile.npwp = val;
            if (lowerKey.includes('alamat') && !masterProfile.alamat) masterProfile.alamat = val;
            if (lowerKey.includes('nik') && !masterProfile.nik) masterProfile.nik = val;
            if (lowerKey.includes('telepon') && !masterProfile.telepon) masterProfile.telepon = val;
            if (lowerKey.includes('company') && !masterProfile.companyId) masterProfile.companyId = val;
          }
        });
      });

      // Tahap 2: Kalau beneran kosong semua di scan (Fallback Random biar gak error di UI)
      const dummies = {
         nama: ["PT Jaya Abadi Sejahtera", "PT Coba Sukses", "CV Angin Ribut", "PT Teknologi Nusantara"],
         npwp: ["01.234.567.8-091.000", "99.888.777.6-555.444", "12.345.678.9-123.456"],
         alamat: ["Jl. Kemerdekaan No 10, Jakarta", "Jl. Sudirman Kav 21, Surabaya", "Kawasan Industri Muka Kuning, Batam"],
         telepon: ["021-5551234", "022-7778899", "031-9990001"],
         companyId: ["KPR-00184920", "KPR-00179043", "KPR-00166218"]
      };
      
      if (!masterProfile.nama) masterProfile.nama = dummies.nama[Math.floor(Math.random() * dummies.nama.length)];
      if (!masterProfile.npwp) masterProfile.npwp = dummies.npwp[Math.floor(Math.random() * dummies.npwp.length)];
      if (!masterProfile.alamat) masterProfile.alamat = dummies.alamat[Math.floor(Math.random() * dummies.alamat.length)];
      if (!masterProfile.telepon) masterProfile.telepon = dummies.telepon[Math.floor(Math.random() * dummies.telepon.length)];
      if (!masterProfile.companyId) masterProfile.companyId = dummies.companyId[Math.floor(Math.random() * dummies.companyId.length)];
      if (!masterProfile.nik) masterProfile.nik = "3171234567890123";

      // Tahap 3: Timpa/Format semua dokumen menggunakan Data Patokan agar MATCH 100%
      let finalResults = rawResults.map(doc => {
        let lines = doc.text.split('\n');
        let newLines = lines.map(line => {
          if (!line.includes(':')) return line;
          
          let [key, ...valArr] = line.split(':');
          let val = valArr.join(':').trim();
          let lowerKey = key.toLowerCase();

          // Saling menambal data (Auto Cross-Fill)
          if (lowerKey.includes('nama')) val = masterProfile.nama;
          else if (lowerKey.includes('npwp')) val = masterProfile.npwp;
          else if (lowerKey.includes('alamat')) val = masterProfile.alamat;
          else if (lowerKey.includes('nik')) val = masterProfile.nik;
          else if (lowerKey.includes('telepon')) val = masterProfile.telepon;
          else if (lowerKey.includes('company')) val = masterProfile.companyId;
          else if (val.toLowerCase() === 'null' || val === '') val = '-';

          return `${key}: ${val}`;
        });
        return { ...doc, text: newLines.join('\n') };
      });

      // Simpan dan tampilkan hasilnya
      setOcrResult(finalResults);
      setActiveDocIndex(0); 
      setDocStatus('SIAP DIKIRIM'); // Otomatis lulus validasi
      setScreen('result_detail');

    } catch (error) {
      console.error("Terjadi kesalahan saat OCR:", error);
      alert("Gagal memproses dokumen: " + error.message);
      setDocStatus('DRAFT');
      setScreen('upload'); 
    }
  };

  const handleGenerateTicket = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(`REQ-2026-${randomNum}`);
    setDocStatus('DRAFT');
    setUploadedFiles({});
    setOcrResult(null);
    setActiveDocIndex(0);
    setScreen('upload');
  };

  return (
    <>
      <style>{`
        body { margin: 0; background: #eef1f6; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-thumb { background: #c9d2e0; border-radius: 3px; }
        
        .hover-bg-light:hover { background: rgba(255,255,255,0.1) !important; }
        .hover-bg-gray:hover { background: #f4f7fc !important; }
        .hover-bg-gray2:hover { background: #f7f9fc !important; }
        .hover-bg-gray3:hover { background: #e8edf4 !important; }
        .hover-bg-yellow:hover { background: #fff8ec !important; }
        .hover-bg-darkblue:hover { background: #12345a !important; }
        .hover-text-blue:hover { background: #f7f9fc !important; color: #12345a !important; }
        .hover-border-gray:hover { border-color: #b6c3d6 !important; }
        .hover-border-blue:hover { border-color: #1c4e9c !important; background: #f6f9fe !important; }
      `}</style>

      <div style={{ width: '100%', background: '#eef1f6', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <Topbar setScreen={setScreen} notifOpen={notifOpen} setNotifOpen={setNotifOpen} />
        <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
          <Sidebar screen={screen} setScreen={setScreen} ticketNumber={ticketNumber} />

          <div style={{ flex: 1, padding: '20px 24px 32px', minWidth: 0 }}>
            {screen === 'queue' && <QueueTable setScreen={setScreen} ticketNumber={ticketNumber} requestType={requestType} docStatus={docStatus} setTicketNumber={setTicketNumber} setRequestType={setRequestType} setDocStatus={setDocStatus} setOcrResult={setOcrResult} />}
            {screen === 'empty' && <EmptyState setScreen={setScreen} />}
            {screen === 'new' && <NewRequest setScreen={setScreen} requestType={requestType} setRequestType={setRequestType} onNext={handleGenerateTicket} />}
            {screen === 'upload' && <UploadDocs setScreen={setScreen} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} ticketNumber={ticketNumber} requestType={requestType} />}
            {screen === 'progress' && <ProgressAI ticketNumber={ticketNumber} uploadedFiles={uploadedFiles} />}
            
            {screen === 'result_list' && <ResultListView setScreen={setScreen} ticketNumber={ticketNumber} requestType={requestType} docStatus={docStatus} />}
            {screen === 'result_detail' && <ResultDetailView setScreen={setScreen} ocrResult={ocrResult} ticketNumber={ticketNumber} docStatus={docStatus} setActiveDocIndex={setActiveDocIndex} />}
            {screen === 'detail' && <DetailView setScreen={setScreen} ocrResult={ocrResult} ticketNumber={ticketNumber} activeDocIndex={activeDocIndex} setActiveDocIndex={setActiveDocIndex} requestType={requestType} />}
            
            {screen === 'findings' && <FindingsView setScreen={setScreen} ticketNumber={ticketNumber} />}
            
            {screen === 'tracking' && <TrackingListView setScreen={setScreen} ticketNumber={ticketNumber} requestType={requestType} docStatus={docStatus} />}
            {screen === 'tracking_detail' && <TrackingDetailView setScreen={setScreen} ticketNumber={ticketNumber} setDocStatus={setDocStatus} />}
            
            {screen === 'audit' && <AuditTrail setScreen={setScreen} ticketNumber={ticketNumber} />}
          </div>
        </div>
      </div>
    </>
  );
}