import React from 'react';

// ==========================================
// 1. DAFTAR PERMOHONAN (QUEUE)
// ==========================================
export function QueueTable({ setScreen, ticketNumber, requestType, docStatus, setTicketNumber, setRequestType, setDocStatus, setOcrResult }) {
  const hasTicket = ticketNumber !== '';
  // Grid tanpa kolom AKSI
  const gridCols = '145px 1.4fr 115px 1.5fr 70px 140px 80px 100px 80px';
  
  const getStatusStyle = (status) => {
    if (status === 'DRAFT') return { bg: '#f2f5f9', color: '#67718a' };
    if (status === 'SIAP DIKIRIM') return { bg: '#f2f7f4', color: '#137a51' };
    if (status === 'PERLU PERBAIKAN') return { bg: '#fdf3f1', color: '#b3382a', isRed: true };
    if (status === 'DIPERIKSA AI') return { bg: 'transparent', color: '#1c4e9c', dot: true };
    return { bg: '#f2f5f9', color: '#67718a' };
  };
  const dynamicStatus = getStatusStyle(docStatus);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a', letterSpacing: '-0.02em' }}>Daftar Permohonan</h1>
          <div style={{ fontSize: '13px', color: '#67718a', marginTop: '6px' }}>9 permohonan aktif · KCU Surabaya Pemuda</div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div onClick={() => setScreen('empty')} className="hover-bg-gray2" style={{ padding: '9px 14px', border: '1px solid #d3dae5', borderRadius: '7px', background: '#fff', fontSize: '12.5px', fontWeight: 600, color: '#3d4759', cursor: 'pointer' }}>Lihat kondisi kosong</div>
          <div onClick={() => setScreen('new')} className="hover-bg-darkblue" style={{ padding: '9px 16px', borderRadius: '7px', background: '#1c4e9c', color: '#fff', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}>+ Permohonan Baru</div>
        </div>
      </div>
      
      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e8edf4', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ padding: '7px 12px', borderRadius: '6px', background: '#12345a', color: '#fff', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}>Semua 9</div>
          <div className="hover-bg-gray3" style={{ padding: '7px 12px', borderRadius: '6px', background: '#f8fafc', color: '#67718a', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>Draft 2</div>
          <div className="hover-bg-gray3" style={{ padding: '7px 12px', borderRadius: '6px', background: '#f8fafc', color: '#67718a', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>Sedang diperiksa AI 1</div>
          <div className="hover-bg-gray3" style={{ padding: '7px 12px', borderRadius: '6px', background: '#f8fafc', color: '#67718a', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>Perlu perbaikan 3</div>
          <div className="hover-bg-gray3" style={{ padding: '7px 12px', borderRadius: '6px', background: '#f8fafc', color: '#67718a', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>Siap dikirim ke Ops 3</div>
          <div style={{ flex: 1 }}></div>
          <div style={{ padding: '7px 12px', border: '1px solid #e0e6ef', borderRadius: '6px', fontSize: '11.5px', color: '#8a95a8', width: '240px' }}>Cari perusahaan / no. permohonan</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '12px 16px', background: '#fcfdfe', borderBottom: '1px solid #e8edf4', gap: '10px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>NO. PERMOHONAN</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>NAMA PERUSAHAAN</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>COMPANY ID</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>JENIS KEBUTUHAN</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8', textAlign: 'center' }}>TEMUAN</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>STATUS</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>SISA SLA</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>DIUNGGAH</div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.06em', color: '#8a95a8' }}>PETUGAS</div>
        </div>

        {/* BARIS DINAMIS - Hasil Upload User */}
        {hasTicket && (
          <div onClick={() => setScreen(docStatus === 'DRAFT' ? 'upload' : 'result_detail')} className="hover-bg-yellow" style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '14px 16px', borderBottom: '1px solid #f0f3f8', gap: '10px', alignItems: 'center', cursor: 'pointer', background: '#fffcf7' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#1c4e9c', fontWeight: 500 }}>{ticketNumber}</div>
            <div style={{ fontSize: '13px', color: '#1a2333', fontWeight: 700 }}>-</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', color: '#3d4759' }}>-</div>
            <div style={{ fontSize: '12.5px', color: '#4a5568' }}>{requestType}</div>
            <div style={{ textAlign: 'center' }}>
              {docStatus === 'PERLU PERBAIKAN' ? <div style={{ display: 'inline-block', minWidth: '22px', padding: '3px 6px', borderRadius: '5px', background: '#e05c4a', color: '#fff', fontSize: '11px', fontWeight: 800 }}>!</div> : <span style={{color: '#c9d2e0'}}>-</span>}
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: dynamicStatus.bg !== 'transparent' ? '4px 8px' : '0', borderRadius: '5px', background: dynamicStatus.bg, color: dynamicStatus.color, fontSize: '11px', fontWeight: 700 }}>
                {dynamicStatus.dot && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1c4e9c' }}></div>}
                {docStatus}
              </div>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: dynamicStatus.isRed ? '#b3382a' : '#3d4759', fontWeight: 500 }}>04:00</div>
            <div style={{ fontSize: '12px', color: '#67718a' }}>Barusan</div>
            <div style={{ fontSize: '12px', color: '#67718a' }}>Anda</div>
          </div>
        )}

        {/* BARIS DUMMY 1: PT Rizky Gemilang (Sync data saat diklik) */}
        <div 
          className="hover-bg-gray2" 
          style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '14px 16px', borderBottom: '1px solid #f0f3f8', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => {
            if(setTicketNumber) setTicketNumber('REQ-2026-004182');
            if(setRequestType) setRequestType('Perubahan/Penambahan Layanan');
            if(setDocStatus) setDocStatus('PERLU PERBAIKAN');
            if(setOcrResult) setOcrResult(null); // Kosongkan OCR agar muncul dummy checklist PT Rizky
            setScreen('result_detail');
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#1c4e9c', fontWeight: 500 }}>REQ-2026-004182</div>
          <div style={{ fontSize: '13px', color: '#1a2333', fontWeight: 800 }}>PT Rizky Gemilang</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', color: '#3d4759' }}>KPR-00184920</div>
          <div style={{ fontSize: '12.5px', color: '#4a5568' }}>Perubahan/Penambahan Layanan</div>
          <div style={{ textAlign: 'center' }}><div style={{ display: 'inline-block', minWidth: '22px', padding: '3px 6px', borderRadius: '5px', background: '#e05c4a', color: '#fff', fontSize: '11px', fontWeight: 800 }}>4</div></div>
          <div><div style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '5px', background: '#fdf3f1', color: '#b3382a', fontSize: '11px', fontWeight: 700 }}>Perlu perbaikan</div></div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#b3382a', fontWeight: 500 }}>03:42</div>
          <div style={{ fontSize: '12px', color: '#67718a' }}>04 Sep 09:14</div>
          <div style={{ fontSize: '12px', color: '#67718a' }}>Anisa R.</div>
        </div>

        {/* BARIS DUMMY 2: PT ABC (Sync data saat diklik) */}
        <div 
          className="hover-bg-gray2" 
          style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '14px 16px', borderBottom: '1px solid #f0f3f8', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => {
            if(setTicketNumber) setTicketNumber('REQ-2026-004178');
            if(setRequestType) setRequestType('Pemeliharaan User — Reset Password');
            if(setDocStatus) setDocStatus('SIAP DIKIRIM');
            if(setOcrResult) setOcrResult(null); 
            setScreen('result_detail');
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#1c4e9c', fontWeight: 500 }}>REQ-2026-004178</div>
          <div style={{ fontSize: '13px', color: '#1a2333', fontWeight: 800 }}>PT ABC</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', color: '#3d4759' }}>KPR-00179043</div>
          <div style={{ fontSize: '12.5px', color: '#4a5568' }}>Pemeliharaan User — Reset Password</div>
          <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#137a51' }}>0</div>
          <div><div style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '5px', background: '#f2f7f4', color: '#137a51', fontSize: '11px', fontWeight: 700 }}>Siap dikirim ke Ops</div></div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#3d4759', fontWeight: 500 }}>07:05</div>
          <div style={{ fontSize: '12px', color: '#67718a' }}>04 Sep 08:40</div>
          <div style={{ fontSize: '12px', color: '#67718a' }}>Anisa R.</div>
        </div>
      </div>
    </>
  );
}

export function EmptyState({ setScreen }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', padding: '76px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: '72px', height: '88px', border: '2px dashed #c9d2e0', borderRadius: '6px', position: 'relative', marginBottom: '22px' }}>
        <div style={{ position: 'absolute', top: '16px', left: '14px', right: '14px', height: '3px', borderRadius: '2px', background: '#e4e9f1' }}></div>
      </div>
      <div style={{ fontSize: '16px', fontWeight: 800, color: '#12345a' }}>Belum ada permohonan</div>
      <div style={{ fontSize: '12.5px', color: '#67718a', lineHeight: 1.65, marginTop: '8px', maxWidth: '400px' }}>Buat permohonan baru, unggah dokumen nasabah, dan AI akan membaca serta memvalidasi datanya.</div>
      <div onClick={() => setScreen('new')} className="hover-bg-darkblue" style={{ marginTop: '20px', padding: '9px 18px', borderRadius: '7px', background: '#1c4e9c', color: '#fff', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}>+ Permohonan Baru</div>
    </div>
  );
}

// ==========================================
// 2. PERMOHONAN BARU
// ==========================================
export function NewRequest({ setScreen, requestType, setRequestType, onNext }) {
  const CardOption = ({ title, desc, mandatoryDocs }) => {
    const isSelected = requestType === title;
    return (
      <div onClick={() => setRequestType(title)} className="hover-border-blue" style={{ background: '#fff', border: isSelected ? '2px solid #1c4e9c' : '1px solid #dde3ec', borderRadius: '10px', padding: '16px', position: 'relative', cursor: 'pointer', boxShadow: isSelected ? '0 2px 10px rgba(28,78,156,.1)' : 'none', display: 'flex', flexDirection: 'column' }}>
        {isSelected && <div style={{ position: 'absolute', top: '14px', right: '14px', width: '20px', height: '20px', borderRadius: '50%', background: '#1c4e9c', color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#12345a', marginBottom: '8px', paddingRight: '24px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#67718a', lineHeight: 1.6, flex: 1 }}>{desc}</div>
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f0f3f8', fontSize: '11px', color: '#8a95a8', fontWeight: 500 }}>{mandatoryDocs}</div>
      </div>
    );
  };
  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <div onClick={() => setScreen('queue')} className="hover-text-blue" style={{ fontSize: '12px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '8px', display: 'inline-block' }}>← Daftar Permohonan</div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a', letterSpacing: '-0.02em' }}>Permohonan Baru</h1>
        <div style={{ fontSize: '13px', color: '#67718a', marginTop: '8px', lineHeight: 1.6, maxWidth: '750px' }}>Pilih jenis kebutuhan nasabah. Data perusahaan, rekening, dan token tidak perlu diisi manual — semuanya diambil dari dokumen yang Anda unggah pada langkah berikutnya.</div>
      </div>
    
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px', maxWidth: '850px' }}>
        <CardOption title="Perubahan / Penambahan Layanan" desc="Tambah layanan, rekening perusahaan, rekening pihak ketiga, atau token pada Company ID yang sudah aktif." mandatoryDocs="Dokumen wajib: Form Aplikasi · Form Bank · Surat Kuasa (jika pihak ke-3)" />
        <CardOption title="Registrasi Baru" desc="Pendaftaran nasabah wholesale baru ke Kopra Cash Management, termasuk Company ID dan administrator." mandatoryDocs="Dokumen wajib: Form Aplikasi · Form Bank" />
        <CardOption title="Pemeliharaan User" desc="Reset password, reaktivasi User ID, deaktivasi token, atau unlock token untuk user yang sudah terdaftar." mandatoryDocs="Dokumen wajib: Form Pemeliharaan User" />
        <CardOption title="Perubahan / Penggantian Token" desc="Permohonan hard token baru atau penggantian token rusak, disertai nota eksepsi bila diperlukan." mandatoryDocs="Dokumen wajib: Form Exception · Nota/Surat Eksepsi" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px', maxWidth: '850px' }}>
        <div style={{ fontSize: '12px', color: '#8a95a8' }}>Nomor permohonan dibuat otomatis setelah dokumen diunggah.</div>
        <div style={{ flex: 1 }}></div>
        <div onClick={() => setScreen('queue')} className="hover-bg-gray2" style={{ padding: '9px 20px', border: '1px solid #d3dae5', borderRadius: '7px', background: '#fff', fontSize: '12.5px', fontWeight: 600, color: '#3d4759', cursor: 'pointer' }}>Batal</div>
        <div onClick={onNext} className="hover-bg-darkblue" style={{ padding: '10px 20px', borderRadius: '7px', background: '#1c4e9c', color: '#fff', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}>Lanjut ke Unggah Dokumen →</div>
      </div>
    </>
  );
}

// ==========================================
// 3. UNGGAH DOKUMEN (UPLOAD DOCS)
// ==========================================
export function UploadDocs({ setScreen, uploadedFiles, setUploadedFiles, ticketNumber, requestType }) {
  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (file) setUploadedFiles(prev => ({ ...prev, [docType]: file }));
  };
  const removeFile = (docType, e) => {
    e.stopPropagation(); e.preventDefault();
    setUploadedFiles(prev => { const n = { ...prev }; delete n[docType]; return n; });
  };
  const hasFiles = Object.keys(uploadedFiles || {}).length > 0;

  const UploadCard = ({ title, docType, desc, iconColor }) => {
    const file = uploadedFiles?.[docType];
    return (
      <label className="hover-border-blue" style={{ background: '#fff', border: file ? `2px solid ${iconColor}` : '1.5px dashed #c9d2e0', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', cursor: 'pointer', minHeight: '140px' }}>
        <input type="file" accept=".pdf, image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, docType)} />
        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#12345a' }}>{title}</div>
        <div style={{ fontSize: '11px', color: '#8a95a8', marginTop: '3px' }}>{desc}</div>
        <div style={{ flex: 1 }}></div>
        {file ? (
          <div style={{ padding: '10px', background: '#f7fcf9', border: '1px solid #cfe6da', borderRadius: '6px', marginTop: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a2333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <div style={{ fontSize: '10px', color: '#137a51', fontWeight: 700 }}>Terunggah</div>
              <div onClick={(e) => removeFile(docType, e)} style={{ fontSize: '10.5px', color: '#e05c4a', fontWeight: 700, cursor: 'pointer' }}>Hapus</div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '10px', background: '#fafbfd', borderRadius: '6px', textAlign: 'center', marginTop: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#3d4759' }}>Klik untuk upload</div>
          </div>
        )}
      </label>
    );
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div>
          <div onClick={() => setScreen('new')} style={{ fontSize: '11.5px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '7px' }}>← Jenis Kebutuhan</div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#12345a' }}>Unggah Dokumen</h1>
          <div style={{ fontSize: '12px', color: '#67718a', marginTop: '6px' }}>{ticketNumber} · {requestType}</div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div onClick={() => hasFiles && setScreen('progress')} style={{ padding: '9px 18px', borderRadius: '7px', background: hasFiles ? '#1c4e9c' : '#c9d2e0', color: '#fff', fontSize: '12.5px', fontWeight: 700, cursor: hasFiles ? 'pointer' : 'not-allowed' }}>Mulai Pemeriksaan AI →</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', maxWidth: '1000px' }}>
        <UploadCard title="Form Aplikasi" docType="form" desc="Halaman form yang diisi nasabah" iconColor="#12345a" />
        <UploadCard title="KTP" docType="ktp" desc="KTP Direktur/Pejabat berwenang" iconColor="#1f9d6b" />
        <UploadCard title="NPWP" docType="npwp" desc="NPWP Perusahaan" iconColor="#e08a00" />
        <UploadCard title="Dokumen Gabungan" docType="full_pdf" desc="File PDF multi-halaman utuh" iconColor="#1c4e9c" />
      </div>
    </>
  );
}

// ==========================================
// PROGRESS AI (DINAMIS SESUAI YANG DI-UPLOAD)
// ==========================================
export function ProgressAI({ ticketNumber, uploadedFiles }) {
  const gridCols = 'minmax(250px, 2fr) 1fr 1fr 1fr 1.2fr 80px';

  // Komponen Indikator Status
  const StatusSelesai = () => <div style={{ color: '#1f9d6b', fontSize: '12px', fontWeight: 700 }}>✓ Selesai</div>;
  const StatusBerjalan = () => (
    <div style={{ color: '#1c4e9c', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '12px', height: '12px', border: '2px solid #1c4e9c', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      Berjalan
    </div>
  );
  const StatusMenunggu = () => <div style={{ color: '#8a95a8', fontSize: '12px', fontWeight: 600 }}>Menunggu</div>;

  // Daftar mapping khusus untuk form kita
  const documentMap = [
    { id: 'form', label: 'Form Aplikasi', fields: '14/14' },
    { id: 'ktp', label: 'KTP Direktur/Pejabat', fields: '11/11' },
    { id: 'npwp', label: 'NPWP Perusahaan', fields: '3/3' },
    { id: 'full_pdf', label: 'Dokumen Gabungan (PDF)', fields: 'Multi' }
  ];

  // Filter: HANYA tampilkan baris yang file-nya benar-benar diunggah oleh user
  const activeDocs = uploadedFiles && Object.keys(uploadedFiles).length > 0 
    ? documentMap.filter(doc => uploadedFiles[doc.id])
    : documentMap; // (Fallback kalau state belum kebaca, tampilin 4 defaultnya)

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', color: '#8a95a8', fontWeight: 500, marginBottom: '6px' }}>{ticketNumber || 'REQ-2026-004182'} · PT Rizky Gemilang</div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a', letterSpacing: '-0.02em' }}>Pemeriksaan AI Sedang Berjalan</h1>
        <div style={{ fontSize: '13px', color: '#67718a', marginTop: '6px' }}>Anda dapat menutup halaman ini — Anda akan diberi tahu saat pemeriksaan selesai.</div>
      </div>

      <div style={{ background: '#12345a', borderRadius: '10px', padding: '24px 30px', display: 'flex', alignItems: 'center', gap: '40px', boxShadow: '0 4px 20px rgba(18,52,90,.08)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '.08em', color: '#fdba12', marginBottom: '10px' }}>PROGRES KESELURUHAN</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '44px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>68%</div>
            <div style={{ fontSize: '13px', color: '#8a95a8', fontWeight: 500 }}>Memproses {activeDocs.length} dokumen</div>
          </div>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.1)', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{ width: '68%', height: '6px', background: '#fdba12', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'pulse 1.5s infinite' }}></div>
            </div>
          </div>
        </div>
        <div style={{ width: '1px', height: '80px', background: 'rgba(255,255,255,.1)' }}></div>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div><div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '8px' }}>Field terbaca</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '24px', fontWeight: 700, color: '#fff' }}>12</div></div>
          <div><div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '8px' }}>Keyakinan rata-rata</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '24px', fontWeight: 700, color: '#fff' }}>93%</div></div>
          <div><div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '8px' }}>Temuan sementara</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '24px', fontWeight: 700, color: '#ff6b6b' }}>1</div></div>
          <div><div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '8px' }}>Estimasi selesai</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '24px', fontWeight: 700, color: '#fff' }}>~40s</div></div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', marginTop: '20px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '14px 20px', background: '#f8fafc', borderBottom: '1px solid #e8edf4', gap: '10px' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>DOKUMEN</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>UNGGAH</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>KLASIFIKASI</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>OCR</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>VALIDASI SILANG</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8', textAlign: 'right' }}>FIELD</div>
        </div>

        {/* RENDERING BARIS SESUAI YANG DIUPLOAD */}
        {activeDocs.map((doc, index) => {
          // Buat animasi beruntun: Dokumen pertama "Selesai", yang tengah "Berjalan", yang terakhir "Menunggu"
          const isFirst = index === 0;
          const isLast = index === activeDocs.length - 1 && activeDocs.length > 1;

          return (
            <div key={doc.id} style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '16px 20px', borderBottom: '1px solid #f0f3f8', gap: '10px', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#12345a' }}>{index + 1} · {doc.label}</div>
              <StatusSelesai /> 
              {isFirst || !isLast ? <StatusSelesai /> : <StatusMenunggu />}
              {isFirst ? <StatusSelesai /> : (isLast ? <StatusMenunggu /> : <StatusBerjalan />)}
              {isFirst ? <StatusSelesai /> : <StatusMenunggu />}
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#67718a' }}>{isFirst ? doc.fields : '-'}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ==========================================
// 4. HASIL PEMERIKSAAN (RESULT LIST VIEW & DETAIL VIEW)
// ==========================================
export function ResultListView({ setScreen, ticketNumber, requestType, docStatus }) {
  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#12345a' }}>Hasil Pemeriksaan AI</h1>
      </div>
      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1.5fr 1.5fr 150px 120px', padding: '12px 16px', borderBottom: '1px solid #e8edf4', background: '#fcfdfe' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8' }}>NO. TIKET</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8' }}>NAMA PERUSAHAAN</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8' }}>KEBUTUHAN</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8' }}>STATUS</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8', textAlign: 'right' }}>AKSI</div>
        </div>
        {ticketNumber && (
          <div style={{ display: 'grid', gridTemplateColumns: '150px 1.5fr 1.5fr 150px 120px', padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid #f0f3f8' }}>
            <div style={{ fontSize: '12px', color: '#67718a' }}>{ticketNumber}</div>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#12345a' }}>-</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>{requestType}</div>
            <div><span style={{ padding: '4px 8px', background: '#fdf3f1', color: '#b3382a', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>{docStatus}</span></div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setScreen('result_detail')} style={{ padding: '6px 14px', background: '#1c4e9c', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Lihat Detail</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// HASIL PEMERIKSAAN (RINGKASAN & CHECKLIST DINAMIS CROSS-CHECK)
// ==========================================
export function ResultDetailView({ setScreen, ocrResult, ticketNumber, docStatus, setActiveDocIndex }) {
  const hasData = ocrResult && ocrResult.length > 0;
  const docCount = hasData ? ocrResult.length : 0;

  // ==========================================
  // LOGIKA VALIDASI SILANG (Otomatis Cek Kesamaan Antar Dokumen)
  // ==========================================
  const getMismatchCount = (docIndex) => {
    if (!hasData || docCount <= 1) return 0;
    
    const currentDoc = ocrResult[docIndex];
    const parsedFields = currentDoc.text.split('\n').filter(line => line.includes(':'));
    let mismatches = 0;

    // Helper: menyamakan kata kunci (Nama Lengkap == Nama)
    const isSimilarKey = (k1, k2) => {
       if (k1 === k2) return true;
       if (k1.includes('nama') && k2.includes('nama')) return true;
       if (k1.includes('npwp') && k2.includes('npwp')) return true;
       if (k1.includes('alamat') && k2.includes('alamat')) return true;
       if (k1.includes('nik') && k2.includes('nik')) return true;
       return false;
    };

    parsedFields.forEach(field => {
      const [key, ...valueArr] = field.split(':');
      const cleanKey = key.trim().toLowerCase();
      const cleanVal = valueArr.join(':').trim().toLowerCase().replace(/\(data fallback\)/g, '').trim();

      let hasMismatch = false;

      // Bandingkan dengan isi dokumen lain
      ocrResult.forEach((otherDoc, otherIdx) => {
        if (otherIdx === docIndex) return; // Jangan bandingkan dengan diri sendiri
        
        const otherDocLines = otherDoc.text.split('\n');
        const matchedLine = otherDocLines.find(line => {
           if (!line.includes(':')) return false;
           const lineKey = line.split(':')[0].trim().toLowerCase();
           return isSimilarKey(lineKey, cleanKey);
        });
        
        // Jika kolom yang sama ditemukan di dokumen lain, cek isinya!
        if (matchedLine) {
           const [, ...otherVArr] = matchedLine.split(':');
           const otherVal = otherVArr.join(':').trim().toLowerCase().replace(/\(data fallback\)/g, '').trim();
           
           if (otherVal !== cleanVal) {
              hasMismatch = true; // Isinya beda! Flag merah!
           }
        }
      });

      if (hasMismatch) mismatches++;
    });

    return mismatches;
  };

  // Hitung status setiap dokumen dan total keseluruhan
  const docMismatchCounts = [];
  let totalMismatches = 0;
  if (hasData) {
    ocrResult.forEach((_, idx) => {
      const count = getMismatchCount(idx);
      docMismatchCounts.push(count);
      totalMismatches += count;
    });
  }

  // Dinamiskan status banner dan tombol
  const displayStatus = totalMismatches > 0 ? 'PERLU PERBAIKAN' : 'SIAP DIKIRIM';
  const isReady = displayStatus === 'SIAP DIKIRIM';

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '6px' }}>{ticketNumber} · Diunggah Barusan</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#12345a' }}>{hasData ? '-' : 'PT Rizky Gemilang'}</h1>
            <div style={{ padding: '3px 8px', borderRadius: '4px', background: isReady ? '#f2f7f4' : '#fdf3f1', color: isReady ? '#137a51' : '#b3382a', fontSize: '10px', fontWeight: 700, border: isReady ? '1px solid #cfe6da' : '1px solid #f3cfc9' }}>
              {displayStatus}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setScreen('queue')} className="hover-bg-gray2" style={{ padding: '8px 16px', background: '#fff', color: '#3d4759', border: '1px solid #dde3ec', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Kembali ke Daftar</button>
          {!isReady ? (
            <button onClick={() => setScreen('findings')} className="hover-bg-darkblue" style={{ padding: '8px 16px', background: '#1c4e9c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Selesaikan Temuan</button>
          ) : (
            <button onClick={() => setScreen('tracking')} className="hover-bg-darkblue" style={{ padding: '8px 16px', background: '#137a51', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Kirim ke Operation</button>
          )}
        </div>
      </div>

      {!isReady ? (
        <div style={{ background: '#fdf3f1', border: '1px solid #f3cfc9', borderRadius: '8px', padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e05c4a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>!</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#8a2a20' }}>Belum dapat dikirim ke Operation</div>
            <div style={{ fontSize: '12px', color: '#b3382a', marginTop: '2px' }}>Pemeriksaan OCR mendeteksi {totalMismatches} data yang berbeda antar dokumen. Buka dokumen yang bersangkutan untuk periksa detailnya.</div>
          </div>
        </div>
      ) : (
        <div style={{ background: '#f2f7f4', border: '1px solid #cfe6da', borderRadius: '8px', padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1f9d6b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#137a51' }}>Data Tervalidasi dan Sesuai</div>
            <div style={{ fontSize: '12px', color: '#1f9d6b', marginTop: '2px' }}>Seluruh data antar dokumen cocok. Dokumen siap dikirim ke Operation tanpa perlu direview ulang.</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8', marginBottom: '8px' }}>DOKUMEN DIPROSES</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#12345a' }}>{docCount > 0 ? docCount : '4'} <span style={{ fontSize: '12px', fontWeight: 500, color: '#67718a' }}>berhasil dibaca</span></div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8', marginBottom: '8px' }}>STATUS EKSTRAKSI</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#12345a' }}>Selesai <span style={{ fontSize: '12px', fontWeight: 500, color: '#67718a' }}>diekstrak AI</span></div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8', marginBottom: '8px' }}>TINJAUAN</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: isReady ? '#137a51' : '#e05c4a' }}>Cek List <span style={{ fontSize: '12px', fontWeight: 500, color: '#67718a' }}>{isReady ? 'bersih' : 'klik periksa'}</span></div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#8a95a8', marginBottom: '8px' }}>KEYAKINAN OCR</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#12345a' }}>93% <span style={{ fontSize: '12px', fontWeight: 500, color: '#67718a' }}>rata-rata</span></div>
        </div>
      </div>

      <div style={{ fontSize: '14px', fontWeight: 800, color: '#12345a', marginBottom: '10px' }}>Checklist Dokumen yang Diunggah</div>
      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', overflow: 'hidden' }}>
        
        {/* CHECKLIST DINAMIS HASIL UPLOAD OCR */}
        {hasData && ocrResult.map((res, index) => {
          const mismatches = docMismatchCounts[index];
          const isClean = mismatches === 0;

          return (
            <div key={index} className="hover-bg-gray2" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderBottom: '1px solid #f0f3f8', cursor: 'pointer' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#1c4e9c', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{index + 1}</div>
              <div style={{ width: '230px', flex: 'none' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1a2333', textTransform: 'capitalize' }}>{res.source.toLowerCase()}</div>
                <div style={{ fontSize: '10.5px', color: '#8a95a8', marginTop: '2px' }}>Terekstrak via Gemini AI</div>
              </div>
              <div style={{ flex: 1, fontSize: '11.5px', color: '#5a6478', lineHeight: 1.5, maxHeight: '34px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {res.text.replace(/\n/g, ' · ').substring(0, 100)}...
              </div>
              <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isClean ? (
                   <div style={{ padding: '3px 8px', borderRadius: '5px', background: '#f2f7f4', color: '#137a51', fontSize: '10.5px', fontWeight: 700 }}>Sesuai</div>
                ) : (
                   <div style={{ padding: '3px 8px', borderRadius: '5px', background: '#fdf3f1', color: '#b3382a', fontSize: '10.5px', fontWeight: 700 }}>Perlu ditinjau</div>
                )}
                <div onClick={() => { setActiveDocIndex(index); setScreen('detail'); }} style={{ fontSize: '11.5px', color: '#1c4e9c', fontWeight: 700, cursor: 'pointer', padding: '6px' }}>Periksa Detail →</div>
              </div>
            </div>
          );
        })}

      </div>
    </>
  );
}

// ==========================================
// 5. DETAIL VIEW (TABS, GAMBAR & CROSS-VALIDATION LINTAS DOKUMEN)
// ==========================================
export function DetailView({ setScreen, ocrResult, ticketNumber, activeDocIndex, setActiveDocIndex, requestType }) {
  const activeDoc = ocrResult && ocrResult[activeDocIndex] ? ocrResult[activeDocIndex] : null;
  const parsedFields = activeDoc ? activeDoc.text.split('\n').filter(line => line.includes(':')) : [];
  const [showMismatchOnly, setShowMismatchOnly] = React.useState(false);

  // ==========================================
  // LOGIKA VALIDASI SILANG OTOMATIS
  // ==========================================
  const checkMatch = (currentKey, currentValue) => {
    if (!ocrResult || ocrResult.length <= 1) return 'neutral'; // Tidak bisa cross-check jika cuma 1 dokumen
    
    let isMatch = true;
    let hasOther = false;
    
    const cleanKey = currentKey.trim().toLowerCase();
    // Bersihkan embel-embel data acak untuk murni perbandingan
    const cleanVal = currentValue.trim().toLowerCase().replace(/\(data fallback\)/g, '').trim();

    // Helper untuk mendeteksi kesamaan kolom (agar "Nama" dan "Nama Perusahaan" dianggap membandingkan hal yang sama)
    const isSimilarKey = (k1, k2) => {
       if (k1 === k2) return true;
       if (k1.includes('nama') && k2.includes('nama')) return true;
       if (k1.includes('npwp') && k2.includes('npwp')) return true;
       if (k1.includes('alamat') && k2.includes('alamat')) return true;
       if (k1.includes('nik') && k2.includes('nik')) return true;
       return false;
    };

    // Cek field ini di dokumen lain
    ocrResult.forEach((doc, idx) => {
      if (idx === activeDocIndex) return; // Skip dokumen yang sedang dibuka ini
      
      const docLines = doc.text.split('\n');
      const matchedLine = docLines.find(line => {
         const lineKey = line.split(':')[0].trim().toLowerCase();
         return isSimilarKey(lineKey, cleanKey);
      });
      
      if (matchedLine) {
         hasOther = true;
         const [, ...vArr] = matchedLine.split(':');
         const docValue = vArr.join(':').trim().toLowerCase().replace(/\(data fallback\)/g, '').trim();
         
         // Jika ditemukan perbedaan sekecil apapun di dokumen lain, flag sebagai mismatch
         if (docValue !== cleanVal) {
            isMatch = false;
         }
      }
    });
    
    if (!hasOther) return 'neutral'; // Berarti data ini unik, cuma ada di dokumen ini
    return isMatch ? 'match' : 'mismatch';
  };

  // Hitung jumlah temuan mismatch di dokumen yang sedang dibuka
  const mismatchCount = parsedFields.filter(field => {
     const [k, ...vArr] = field.split(':');
     return checkMatch(k, vArr.join(':')) === 'mismatch';
  }).length;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
        <div style={{ minWidth: 0 }}>
          <div onClick={() => setScreen('result_detail')} style={{ fontSize: '11.5px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '10px' }}>← Hasil Pemeriksaan · {ticketNumber}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#12345a', textTransform: 'capitalize' }}>
              {activeDoc ? activeDoc.source.toLowerCase() : 'Detail Dokumen'}
            </h1>
            {mismatchCount > 0 ? (
               <div style={{ padding: '4px 10px', borderRadius: '6px', background: '#fdf3f1', color: '#b3382a', fontSize: '11px', fontWeight: 800, border: '1px solid #f3cfc9' }}>{mismatchCount} PERLU PERBAIKAN</div>
            ) : (
               <div style={{ padding: '4px 10px', borderRadius: '6px', background: '#f2f7f4', color: '#137a51', fontSize: '11px', fontWeight: 800, border: '1px solid #cfe6da' }}>DATA SESUAI</div>
            )}
          </div>
          <div style={{ fontSize: '13px', color: '#67718a', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>PT Dummy (Simulasi)</span> <span style={{color: '#c9d2e0'}}>|</span> <span>{parsedFields.length > 0 ? parsedFields.length : '0'} data terekstrak</span>
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setScreen('upload')} className="hover-bg-gray2" style={{ padding: '9px 18px', border: '1px solid #d3dae5', borderRadius: '8px', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#3d4759', cursor: 'pointer' }}>Unggah Ulang (Tambah)</button>
          <button onClick={() => setScreen('result_detail')} className="hover-bg-darkblue" style={{ padding: '9px 20px', borderRadius: '8px', background: '#1c4e9c', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none' }}>Simpan Perbaikan</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #dde3ec' }}>
        {ocrResult && ocrResult.map((doc, idx) => {
          const isActive = idx === activeDocIndex;
          return (
            <div key={idx} onClick={() => setActiveDocIndex && setActiveDocIndex(idx)} style={{ padding: '14px 20px', background: isActive ? '#12345a' : '#fff', border: isActive ? '1px solid #12345a' : '1px solid #dde3ec', borderRadius: '8px', cursor: 'pointer', minWidth: '200px', boxShadow: isActive ? '0 4px 12px rgba(18,52,90,0.15)' : 'none', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.7)' : '#8a95a8', marginBottom: '4px' }}>{idx + 1} · {doc.source}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isActive ? '#ff6b6b' : '#1f9d6b' }}></div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: isActive ? '#fff' : '#1a2333' }}>{isActive ? 'Sedang dilihat' : 'Selesai'}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* PANEL KIRI: DATA VALIDASI DINAMIS */}
        <div style={{ width: '420px', flex: 'none', background: '#fff', border: '1px solid #dde3ec', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8edf4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#12345a' }}>Data Validasi · {parsedFields.length > 0 ? parsedFields.length : '0'} field</div>
            <div style={{ display: 'flex', background: '#f0f3f8', borderRadius: '6px', padding: '3px' }}>
              <div style={{ padding: '4px 12px', background: '#12345a', color: '#fff', fontSize: '11px', fontWeight: 700, borderRadius: '4px' }}>Semua</div>
              <div style={{ padding: '4px 12px', color: '#67718a', fontSize: '11px', fontWeight: 600 }}>Temuan ({mismatchCount})</div>
            </div>
          </div>
          
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <div style={{ padding: '16px 20px 8px', fontSize: '11px', fontWeight: 800, letterSpacing: '.08em', color: '#8a95a8' }}>HASIL EKSTRAKSI LINTAS DOKUMEN</div>
            
            {/* RENDER HASIL OCR & MATCHING LOGIC */}
            {parsedFields.length > 0 ? parsedFields.filter(field => {
              if (!showMismatchOnly) return true;
              const [k, ...v] = field.split(':');
              return checkMatch(k, v.join(':')) === 'mismatch';
            }).map((field, idx) => {
              const [key, ...valueArr] = field.split(':');
              const fieldKey = key.trim();
              const fieldVal = valueArr.join(':').trim();
              const matchStatus = checkMatch(fieldKey, fieldVal);

              const isMismatch = matchStatus === 'mismatch';
              const isMatch = matchStatus === 'match';

              return (
                <div key={idx} style={{ padding: '16px 20px', borderBottom: '1px solid #f0f3f8', background: showMismatchOnly && isMismatch ? '#fff8f6' : '#fff', borderLeft: showMismatchOnly && isMismatch ? '3px solid #e05c4a' : '3px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontSize: '12px', color: '#67718a' }}>{fieldKey}</div>
                    
                    {/* Indikator Cross-Validation */}
                    {isMatch && <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#137a51', background: '#eef8f3', padding: '2px 8px', borderRadius: '4px' }}>✓ MATCH SEMUA</div>}
                    {isMismatch && <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#b3382a', background: '#fdf3f1', padding: '2px 8px', borderRadius: '4px' }}>! BEDA DGN DOK. LAIN</div>}
                    {matchStatus === 'neutral' && <div style={{ fontSize: '11px', fontWeight: 800, color: '#1f9d6b' }}>98%</div>}
                  </div>
                  
                  <div style={{ fontSize: '14px', fontWeight: 700, color: isMismatch ? '#b3382a' : '#1a2333' }}>
                    {fieldVal || '-'}
                  </div>
                  
                  {isMismatch && (
                    <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '7px 14px', background: '#1c4e9c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}>Jadikan Data Utama</button>
                    </div>
                  )}
                </div>
              );
            }) : (
              <div style={{ padding: '20px', fontSize: '13px', color: '#8a95a8', textAlign: 'center' }}>
                Bentuk teks tidak dikenali sebagai format data terstruktur.<br/><br/>
                <b>Teks Mentah:</b><br/>{activeDoc ? activeDoc.text : ''}
              </div>
            )}
          </div>
        </div>

        {/* PANEL KANAN: PREVIEW FOTO DOKUMEN */}
        <div style={{ flex: 1, minWidth: 0, background: '#eef1f6', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 20px', background: '#fff', borderBottom: '1px solid #dde3ec', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#12345a' }}>{activeDoc ? activeDoc.source : 'Dokumen'}_Upload.{activeDoc?.mimeType === 'application/pdf' ? 'pdf' : 'jpg'}</div>
            {mismatchCount > 0 && <button style={{ padding: '7px 14px', background: '#fff3d6', color: '#8a6200', border: '1px solid #ffe499', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>Sorot temuan</button>}
          </div>
          <div style={{ flex: 1, background: '#d3dae5', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            
            {activeDoc && activeDoc.imageBase64 ? (
              <img src={`data:${activeDoc.mimeType || 'image/jpeg'};base64,${activeDoc.imageBase64}`} alt={activeDoc.source} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            ) : (
              <div style={{ width: '100%', maxWidth: '600px', height: '100%', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#c9d2e0', marginBottom: '10px' }}>PREVIEW GAMBAR</div>
                <div style={{ fontSize: '13px', color: '#8a95a8', maxWidth: '300px' }}>Menunggu gambar di-load dari memori (base64). Pastikan proses unggah tidak terputus.</div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// 6. FINDINGS & LAINNYA
// ==========================================
export function FindingsView({ setScreen, ticketNumber }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div>
          <div onClick={() => setScreen('result_detail')} style={{ fontSize: '11.5px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '7px' }}>← Kembali ke Ringkasan Hasil</div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#12345a' }}>Selesaikan Temuan</h1>
          <div style={{ fontSize: '12px', color: '#67718a', marginTop: '6px' }}>{ticketNumber} · Pastikan data sudah sesuai dengan dokumen asli</div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hover-bg-gray2" style={{ padding: '7px 12px', border: '1px solid #d3dae5', borderRadius: '7px', background: '#fff', fontSize: '12px', fontWeight: 600, color: '#3d4759', cursor: 'pointer' }}>Simpan sebagai draft</button>
          <button onClick={() => setScreen('tracking')} className="hover-bg-darkblue" style={{ padding: '7px 14px', borderRadius: '7px', background: '#1c4e9c', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Kirim ke Operation</button>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', overflow: 'hidden', borderLeft: '3px solid #e05c4a', maxWidth: '1080px' }}>
        <div style={{ padding: '13px 15px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: '#e05c4a', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>1</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a2333' }}>Konfirmasi Pengiriman Data (Simulasi)</div>
              <div style={{ padding: '2px 7px', borderRadius: '5px', background: '#fdf3f1', color: '#b3382a', fontSize: '10px', fontWeight: 700 }}>WAJIB TINJAU</div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#67718a', marginTop: '4px' }}>Pastikan Anda sudah mengecek seluruh tab dokumen di halaman detail sebelum mengirim.</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// 6. STATUS PENGIRIMAN (LIST VIEW & DETAIL VIEW)
// ==========================================
export function TrackingListView({ setScreen, ticketNumber, requestType, docStatus }) {
  const gridCols = '150px 1.5fr 1.5fr 150px 120px';
  
  // Simulasi: Hanya memunculkan tiket jika statusnya sudah diselesaikan (SIAP DIKIRIM)
  const isTicketSent = docStatus === 'SIAP DIKIRIM';

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a', letterSpacing: '-0.02em' }}>Status Pengiriman</h1>
        <div style={{ fontSize: '13px', color: '#67718a', marginTop: '6px' }}>Daftar permohonan yang telah divalidasi AI dan terkirim ke Operation</div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(18,52,90,.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '14px 16px', borderBottom: '1px solid #e8edf4', background: '#f8fafc' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>NO. TIKET</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>NAMA PERUSAHAAN</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>KEBUTUHAN</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8' }}>STATUS</div>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', color: '#8a95a8', textAlign: 'right' }}>AKSI</div>
        </div>

        {/* Baris Dinamis (Hanya muncul di tabel ini jika statusnya SIAP DIKIRIM) */}
        {ticketNumber && isTicketSent && (
          <div className="hover-bg-yellow" style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '14px 16px', alignItems: 'center', borderBottom: '1px solid #f0f3f8', background: '#fffcf7' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#1c4e9c', fontWeight: 600 }}>{ticketNumber}</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#12345a' }}>-</div>
            <div style={{ fontSize: '12.5px', color: '#4a5568' }}>{requestType}</div>
            <div><span style={{ padding: '5px 10px', background: '#eef3fb', color: '#1c4e9c', borderRadius: '6px', fontSize: '10.5px', fontWeight: 700 }}>MENUNGGU OPS</span></div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setScreen('tracking_detail')} className="hover-bg-darkblue" style={{ padding: '7px 14px', background: '#1c4e9c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}>Lihat Detail</button>
            </div>
          </div>
        )}

        {/* Baris Dummy (Item yang sudah dikirim ke Ops) */}
        <div className="hover-bg-gray2" style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '14px 16px', alignItems: 'center', borderBottom: '1px solid #f0f3f8', cursor: 'pointer' }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#1c4e9c', fontWeight: 600 }}>REQ-2026-004182</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#12345a' }}>PT Rizky Gemilang</div>
          <div style={{ fontSize: '12.5px', color: '#4a5568' }}>Perubahan/Penambahan Layanan</div>
          <div><span style={{ padding: '5px 10px', background: '#eef3fb', color: '#1c4e9c', borderRadius: '6px', fontSize: '10.5px', fontWeight: 700 }}>MENUNGGU OPS</span></div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setScreen('tracking_detail')} style={{ padding: '7px 14px', background: '#fff', color: '#3d4759', border: '1px solid #dde3ec', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}>Lihat Detail</button>
          </div>
        </div>
      </div>
    </>
  );
}

export function TrackingDetailView({ setScreen, ticketNumber, setDocStatus }) {
  // Otomatis update status ke "SIAP DIKIRIM" kalau user masuk layar ini dari FindingsView
  React.useEffect(() => { if(setDocStatus) setDocStatus('SIAP DIKIRIM'); }, []);

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <div onClick={() => setScreen('tracking')} className="hover-text-blue" style={{ fontSize: '12px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '8px', display: 'inline-block' }}>← Daftar Permohonan</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a', letterSpacing: '-0.02em' }}>Status Pengiriman</h1>
          <div style={{ padding: '4px 10px', borderRadius: '4px', background: '#eef3fb', color: '#1c4e9c', fontSize: '11px', fontWeight: 700, letterSpacing: '.05em' }}>MENUNGGU OPS CHECKER</div>
        </div>
        <div style={{ fontSize: '13px', color: '#67718a', marginTop: '8px' }}>{ticketNumber || 'REQ-2026-004182'} · PT Rizky Gemilang · dikirim 04 Sep 2026, 10:07 oleh Anisa Rahmawati</div>
      </div>

      {/* Banner Hijau Sukses */}
      <div style={{ background: '#fff', border: '1px solid #cfe6da', borderRadius: '10px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px', boxShadow: '0 2px 10px rgba(19,122,81,.04)' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f2f7f4', color: '#137a51', fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>✓</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#137a51' }}>Permohonan berhasil dikirim ke Operation</div>
          <div style={{ fontSize: '12.5px', color: '#5a6478', lineHeight: 1.5, marginTop: '4px' }}>Seluruh 4 temuan telah diselesaikan dan 41 data validasi dinyatakan sesuai oleh pemeriksaan AI. Berkas beserta jejak audit ikut terkirim.</div>
        </div>
      </div>

      {/* Stepper / Tracker Horizontal */}
      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', padding: '30px 40px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '140px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1f9d6b', color: '#fff', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>✓</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a2333' }}>Cabang</div>
          <div style={{ fontSize: '11px', color: '#67718a', marginTop: '4px', lineHeight: 1.4 }}>Unggah & perbaikan<br/>selesai 10:07</div>
        </div>
        <div style={{ width: '120px', height: '3px', background: '#1f9d6b', borderRadius: '2px', margin: '0 10px', alignSelf: 'flex-start', marginTop: '15px' }}></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '140px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1c4e9c', color: '#fff', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 0 0 4px rgba(28,78,156,.1)' }}>2</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#12345a' }}>Ops Checker</div>
          <div style={{ fontSize: '11px', color: '#1c4e9c', marginTop: '4px', lineHeight: 1.4, fontWeight: 600 }}>Sedang diverifikasi<br/>estimasi 2 jam kerja</div>
        </div>
        <div style={{ width: '120px', height: '3px', background: '#e4e9f1', borderRadius: '2px', margin: '0 10px', alignSelf: 'flex-start', marginTop: '15px' }}></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '140px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e4e9f1', color: '#8a95a8', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>3</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#8a95a8' }}>Ops Approver</div>
          <div style={{ fontSize: '11px', color: '#a0abbf', marginTop: '4px', lineHeight: 1.4 }}>Belum dimulai</div>
        </div>
        <div style={{ width: '120px', height: '3px', background: '#e4e9f1', borderRadius: '2px', margin: '0 10px', alignSelf: 'flex-start', marginTop: '15px' }}></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '140px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e4e9f1', color: '#8a95a8', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>4</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#8a95a8' }}>Layanan Aktif</div>
          <div style={{ fontSize: '11px', color: '#a0abbf', marginTop: '4px', lineHeight: 1.4 }}>Belum dimulai</div>
        </div>
      </div>

      {/* Grid Box Bawah */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
        {/* Kiri: Berkas Terkirim */}
        <div style={{ flex: 1.8, background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', padding: '20px' }}>
           <div style={{ fontSize: '14px', fontWeight: 800, color: '#12345a', marginBottom: '16px' }}>Berkas Terkirim</div>
           <div style={{ display: 'flex', flexDirection: 'column' }}>
             {[
               { name: 'Form Aplikasi · 14 field sesuai', size: '1,8 MB' },
               { name: 'Form Bank · 5 field sesuai', size: '640 KB' },
               { name: 'Form Pemeliharaan User · 5 field sesuai', size: '210 KB' },
               { name: 'Surat Kuasa · 17 field sesuai', size: '2,4 MB' },
               { name: 'Nota / Surat Eksepsi · 7 field sesuai', size: '480 KB' },
             ].map((file, i, arr) => (
               <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i === arr.length - 1 ? 'none' : '1px solid #f0f3f8' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1f9d6b' }}></div>
                   <div style={{ fontSize: '12.5px', color: '#4a5568' }}>{file.name}</div>
                 </div>
                 <div style={{ fontSize: '12px', color: '#8a95a8' }}>{file.size}</div>
               </div>
             ))}
           </div>
        </div>

        {/* Kanan: Ringkasan Pemeriksaan AI */}
        <div style={{ flex: 1, background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
           <div style={{ fontSize: '14px', fontWeight: 800, color: '#12345a', marginBottom: '16px' }}>Ringkasan Pemeriksaan AI</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             {[
               { label: 'Field tervalidasi', value: '48/48', bold: true },
               { label: 'Keyakinan OCR rata-rata', value: '96%', bold: true },
               { label: 'Temuan diselesaikan', value: '4' },
               { label: 'Perbaikan manual', value: '2' },
               { label: 'Dokumen diunggah ulang', value: '2' },
               { label: 'Waktu proses cabang', value: '53 mnt', font: 'monospace' },
             ].map((stat, i) => (
               <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ fontSize: '12px', color: '#67718a' }}>{stat.label}</div>
                 <div style={{ fontSize: stat.font === 'monospace' ? '13.5px' : '12.5px', fontWeight: stat.bold ? 800 : 600, color: '#1a2333', fontFamily: stat.font === 'monospace' ? "'JetBrains Mono',monospace" : 'inherit' }}>{stat.value}</div>
               </div>
             ))}
           </div>
           <div style={{ flex: 1 }}></div>
           <button onClick={() => setScreen('audit')} className="hover-bg-gray2" style={{ width: '100%', padding: '10px 0', marginTop: '20px', background: '#fff', border: '1px solid #dde3ec', borderRadius: '6px', color: '#1c4e9c', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
             Lihat Riwayat Lengkap
           </button>
        </div>
      </div>
    </>
  );
}

export function AuditTrail({ setScreen, ticketNumber }) {
  return (
    <>
      <div style={{ marginBottom: '18px' }}>
        <div onClick={() => setScreen('result_list')} className="hover-text-blue" style={{ fontSize: '11.5px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '7px' }}>← Kembali ke Hasil Pemeriksaan</div>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#12345a' }}>Riwayat Permohonan</h1>
        <div style={{ fontSize: '12px', color: '#67718a', marginTop: '6px' }}>{ticketNumber} · seluruh langkah tercatat otomatis dan tidak dapat diubah</div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', padding: '22px 24px', maxWidth: '920px' }}>
        <div style={{ display: 'flex', gap: '14px' }}>
          <div style={{ width: '22px', flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#1c4e9c', border: '3px solid #dbe6f7' }}></div></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}><div style={{ fontSize: '12.5px', fontWeight: 800, color: '#12345a' }}>Permohonan dibuat</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#8a95a8' }}>Hari ini</div></div>
          </div>
        </div>
      </div>
    </>
  );
}