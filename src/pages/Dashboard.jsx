import React, { useState, useEffect } from 'react';
import { Topbar, Sidebar } from '../components/DashboardNavigation';
import { 
  QueueTable, EmptyState, NewRequest, UploadDocs, ProgressAI, 
  ResultList, ResultChecklist, DetailView, FindingsView, TrackingView, AuditTrail 
} from '../components/DashboardScreens';

export default function Dashboard() {
  const [screen, setScreen] = useState('queue');
  const [notifOpen, setNotifOpen] = useState(false);
  
  const [requestType, setRequestType] = useState('perubahan');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [ocrResult, setOcrResult] = useState(null);

  useEffect(() => {
    if (screen === 'progress') {
      jalankanMesinOCR();
    }
  }, [screen]);

  const jalankanMesinOCR = async () => {
    try {
      console.log("Memulai penyiapan gambar dari file:", uploadedFiles);
      let imagesToProcess = [];

      const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); 
        reader.onerror = error => reject(error);
      });

      const potentialDocs = ['form', 'ktp', 'npwp', 'surat_kuasa', 'eksepsi'];
      for (const docKey of potentialDocs) {
        if (uploadedFiles[docKey]) {
          const file = uploadedFiles[docKey];
          const base64Data = await fileToBase64(file);
          imagesToProcess.push({
            source: docKey,
            imageBase64: base64Data,
            mimeType: file.type
          });
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
          
          imagesToProcess.push({
            source: `full_pdf_page_${i}`,
            imageBase64: base64Img,
            mimeType: 'image/jpeg'
          });
        }
      }

      if (imagesToProcess.length === 0) {
        throw new Error("Tidak ada dokumen yang dipilih.");
      }

      console.log(`Mengirim ${imagesToProcess.length} request ke API...`);
      let allResults = [];

      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
      const fetchWithRetry = async (url, options, retries = 4) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
          const response = await fetch(url, options);
          if (response.ok) return response;
          
          if (response.status === 503 || response.status === 429) {
            console.warn(`[PERCOBAAN ${attempt}] Server Google sibuk (503). Menunggu 10 detik...`);
            await delay(10000); 
            continue;
          }
          const errText = await response.text();
          throw new Error(`Server Error ${response.status}: ${errText.substring(0, 100)}`);
        }
        throw new Error("Gagal mengekstrak data karena server AI sedang penuh (High Demand). Silakan coba lagi.");
      };

      for (let i = 0; i < imagesToProcess.length; i++) {
        const img = imagesToProcess[i];
        console.log(`Memproses file: ${img.source}`);
        
        const response = await fetchWithRetry('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            imageBase64: img.imageBase64, 
            mimeType: img.mimeType 
          })
        });

        const data = await response.json();
        allResults.push({
          source: img.source,
          text: data.text 
        });

        if (i < imagesToProcess.length - 1) {
          console.log("Menunggu 5 detik untuk file selanjutnya...");
          await delay(5000); 
        }
      }

      console.log("Hasil Semua Ekstraksi OCR:", allResults);
      setOcrResult(allResults);
      setScreen('result');

    } catch (error) {
      console.error("Terjadi kesalahan saat OCR:", error);
      alert(error.message);
      setScreen('upload'); 
    }
  };

  return (
    <>
      <style>{`
        body { margin: 0; background: #eef1f6; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
        
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
          <Sidebar screen={screen} setScreen={setScreen} />
          <div style={{ flex: 1, padding: '20px 24px 32px', minWidth: 0 }}>
            {screen === 'queue' && <QueueTable setScreen={setScreen} />}
            {screen === 'empty' && <EmptyState setScreen={setScreen} />}
            {screen === 'new' && <NewRequest setScreen={setScreen} requestType={requestType} setRequestType={setRequestType} />}
            {screen === 'upload' && <UploadDocs setScreen={setScreen} requestType={requestType} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />}
            
            {screen === 'progress' && <ProgressAI setScreen={setScreen} uploadedFiles={uploadedFiles} requestType={requestType} />}
            
            {screen === 'result_list' && <ResultList setScreen={setScreen} />}
            {screen === 'result' && <ResultChecklist setScreen={setScreen} ocrResult={ocrResult} requestType={requestType} />}
            
            {/* PERBAIKAN: Meneruskan uploadedFiles ke DetailView */}
            {screen === 'detail' && <DetailView setScreen={setScreen} ocrResult={ocrResult} uploadedFiles={uploadedFiles} />}
            
            {screen === 'findings' && <FindingsView setScreen={setScreen} ocrResult={ocrResult} />}
            {screen === 'tracking' && <TrackingView setScreen={setScreen} />}
            {screen === 'audit' && <AuditTrail setScreen={setScreen} />}
          </div>
        </div>
      </div>
    </>
  );
}