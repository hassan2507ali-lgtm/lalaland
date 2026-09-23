import React, { useState, useEffect } from 'react';

export function QueueTable({ setScreen }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#12345a' }}>Daftar Permohonan</h1>
        <div onClick={() => setScreen('new')} className="hover-bg-darkblue" style={{ background: '#1c4e9c', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>+ Permohonan Baru</div>
      </div>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #dde3ec' }}>
        <div style={{ fontSize: '14px', color: '#67718a', fontWeight: 600 }}>Belum ada antrean permohonan saat ini.</div>
      </div>
    </div>
  );
}

export function EmptyState({ setScreen }) {
  return <QueueTable setScreen={setScreen} />;
}

export function NewRequest({ setScreen, requestType, setRequestType }) {
  const OptionCard = ({ id, title, desc, docs }) => {
    const isSelected = requestType === id;
    return (
      <div 
        onClick={() => setRequestType(id)} 
        className={isSelected ? "" : "hover-border-gray"}
        style={{ 
          background: '#fff', 
          border: isSelected ? '2px solid #1c4e9c' : '1px solid #dde3ec', 
          borderRadius: '10px', padding: '16px', position: 'relative', 
          cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: isSelected ? '0 2px 10px rgba(28,78,156,.1)' : 'none'
        }}
      >
        {isSelected && (
          <div style={{ position: 'absolute', top: '14px', right: '14px', width: '18px', height: '18px', borderRadius: '50%', background: '#1c4e9c', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
        )}
        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#12345a', marginBottom: '6px', paddingRight: '20px' }}>{title}</div>
        <div style={{ fontSize: '11.5px', color: '#67718a', lineHeight: 1.6 }}>{desc}</div>
        <div style={{ marginTop: '12px', paddingTop: '11px', borderTop: '1px solid #f0f3f8', fontSize: '10.5px', color: '#8a95a8', fontWeight: 600 }}>{docs}</div>
      </div>
    );
  };

  return (
    <>
      <div style={{ marginBottom: '18px' }}>
        <div onClick={() => setScreen('queue')} style={{ fontSize: '11.5px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '7px' }}>← Daftar Permohonan</div>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#12345a', letterSpacing: '-0.02em' }}>Permohonan Baru</h1>
        <div style={{ fontSize: '12.5px', color: '#67718a', marginTop: '6px', lineHeight: 1.6, maxWidth: '620px' }}>Pilih jenis kebutuhan nasabah. Data perusahaan, rekening, dan token tidak perlu diisi manual — semuanya diambil dari dokumen yang Anda unggah pada langkah berikutnya.</div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px', maxWidth: '820px' }}>
        <OptionCard id="perubahan" title="Perubahan / Penambahan Layanan" desc="Tambah layanan, rekening perusahaan, rekening pihak ketiga, atau token pada Company ID yang sudah aktif." docs="Dokumen wajib: Form Aplikasi · Form Bank · Surat Kuasa (jika pihak ke-3)" />
        <OptionCard id="registrasi" title="Registrasi Baru" desc="Pendaftaran nasabah wholesale baru ke Kopra Cash Management, termasuk Company ID dan administrator." docs="Dokumen wajib: Form Aplikasi · Form Bank" />
        <OptionCard id="pemeliharaan" title="Pemeliharaan User" desc="Reset password, reaktivasi User ID, deaktivasi token, atau unlock token untuk user yang sudah terdaftar." docs="Dokumen wajib: Form Pemeliharaan User" />
        <OptionCard id="token" title="Perubahan / Penggantian Token" desc="Permohonan hard token baru atau penggantian token rusak, disertai nota eksepsi bila diperlukan." docs="Dokumen wajib: Form Exception · Nota/Surat Eksepsi" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '22px', maxWidth: '820px' }}>
        <div style={{ fontSize: '11.5px', color: '#8a95a8' }}>Nomor permohonan dibuat otomatis setelah dokumen diunggah.</div>
        <div style={{ flex: 1 }}></div>
        <div onClick={() => setScreen('queue')} style={{ padding: '8px 14px', border: '1px solid #d3dae5', borderRadius: '7px', background: '#fff', fontSize: '12px', fontWeight: 600, color: '#3d4759', cursor: 'pointer' }}>Batal</div>
        <div onClick={() => setScreen('upload')} className="hover-bg-darkblue" style={{ padding: '8px 16px', borderRadius: '7px', background: '#1c4e9c', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Lanjut ke Unggah Dokumen →</div>
      </div>
    </>
  );
}

export function UploadDocs({ setScreen, uploadedFiles, setUploadedFiles, requestType }) {
  const handleFileChange = (event, docType) => {
    const file = event.target.files[0];
    if (file) setUploadedFiles(prev => ({ ...prev, [docType]: file }));
  };

  const removeFile = (docType, e) => {
    e.stopPropagation(); e.preventDefault();
    setUploadedFiles(prev => { const newFiles = { ...prev }; delete newFiles[docType]; return newFiles; });
  };

  const hasFiles = Object.keys(uploadedFiles || {}).length > 0;

  let uploadConfig = [];
  if (requestType === 'registrasi') {
    uploadConfig = [
      { id: 'form', title: 'Form Aplikasi', desc: 'Wajib', color: '#12345a' },
      { id: 'ktp', title: 'KTP Pengurus', desc: 'Wajib', color: '#1f9d6b' },
      { id: 'npwp', title: 'NPWP Perusahaan', desc: 'Wajib', color: '#e08a00' },
      { id: 'full_pdf', title: 'Dokumen Gabungan', desc: 'Jadikan 1 PDF', color: '#1c4e9c' }
    ];
  } else if (requestType === 'perubahan') {
    uploadConfig = [
      { id: 'form', title: 'Form Bank', desc: 'Wajib', color: '#12345a' },
      { id: 'surat_kuasa', title: 'Surat Kuasa', desc: 'Jika ada pihak ke-3', color: '#e05c4a' },
      { id: 'ktp', title: 'KTP (Opsional)', desc: 'Upload jika ada perubahan', color: '#8a95a8' },
      { id: 'full_pdf', title: 'Dokumen Gabungan', desc: 'Jadikan 1 PDF', color: '#1c4e9c' }
    ];
  } else {
    uploadConfig = [
      { id: 'form', title: 'Form Pemeliharaan', desc: 'Wajib', color: '#12345a' },
      { id: 'eksepsi', title: 'Surat Eksepsi', desc: 'Jika diperlukan', color: '#8a95a8' },
      { id: 'full_pdf', title: 'Dokumen Gabungan', desc: 'Jadikan 1 PDF', color: '#1c4e9c' }
    ];
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div>
          <div onClick={() => setScreen('new')} style={{ fontSize: '11.5px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '7px' }}>← Kembali ke Pilihan</div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#12345a', letterSpacing: '-0.02em' }}>Unggah Dokumen Nasabah</h1>
          <div style={{ fontSize: '12px', color: '#67718a', marginTop: '6px', textTransform: 'capitalize' }}>
            Untuk Kebutuhan: <b>{requestType?.replace('_', ' ')}</b>
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div 
          onClick={() => hasFiles && setScreen('progress')} 
          style={{ padding: '9px 18px', borderRadius: '7px', background: hasFiles ? '#1c4e9c' : '#c9d2e0', color: '#fff', fontSize: '12.5px', fontWeight: 700, cursor: hasFiles ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
        >
          Mulai Pemeriksaan AI →
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', maxWidth: '1000px' }}>
        {uploadConfig.map((conf, idx) => {
          const file = uploadedFiles?.[conf.id];
          return (
            <label key={conf.id} className="hover-border-blue" style={{ flex: '1 1 200px', background: '#fff', border: file ? `2px solid ${conf.color}` : '1.5px dashed #c9d2e0', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
              <input type="file" accept=".pdf, image/jpeg, image/png" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, conf.id)} />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: file ? conf.color : '#e4e9f1', color: file ? '#fff' : '#8a95a8', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  {file ? '✓' : (idx + 1)}
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#12345a', lineHeight: 1.3 }}>{conf.title}</div>
                  <div style={{ fontSize: '11px', color: '#8a95a8', marginTop: '3px' }}>{conf.desc}</div>
                </div>
              </div>
              {file ? (
                <div style={{ marginTop: 'auto', padding: '10px', background: '#f7fcf9', border: '1px solid #cfe6da', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a2333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <div style={{ fontSize: '10px', color: '#137a51', fontWeight: 700 }}>Siap diproses</div>
                    <div onClick={(e) => removeFile(conf.id, e)} style={{ fontSize: '10.5px', color: '#e05c4a', fontWeight: 700, cursor: 'pointer' }}>Hapus</div>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 'auto', padding: '12px', background: '#fafbfd', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#3d4759' }}>Klik untuk memilih file</div>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </>
  );
}

export function ProgressAI({ uploadedFiles, requestType }) {
  let expectedDocs = [];
  if (requestType === 'registrasi') {
    expectedDocs = [
      { id: 'form', title: 'Form Aplikasi' },
      { id: 'ktp', title: 'KTP Pengurus' },
      { id: 'npwp', title: 'NPWP Perusahaan' },
      { id: 'full_pdf', title: 'Dokumen Gabungan' }
    ];
  } else if (requestType === 'perubahan') {
    expectedDocs = [
      { id: 'form', title: 'Form Bank' },
      { id: 'surat_kuasa', title: 'Surat Kuasa' },
      { id: 'ktp', title: 'KTP (Opsional)' },
      { id: 'full_pdf', title: 'Dokumen Gabungan' }
    ];
  } else {
    expectedDocs = [
      { id: 'form', title: 'Form Pemeliharaan / Exception' },
      { id: 'eksepsi', title: 'Surat Eksepsi' },
      { id: 'full_pdf', title: 'Dokumen Gabungan' }
    ];
  }

  const uploadedCount = Object.keys(uploadedFiles || {}).length;
  const totalExpected = expectedDocs.length;
  const percentage = totalExpected > 0 ? Math.round((uploadedCount / totalExpected) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 100px)' }}>
      <div style={{ fontSize: '12px', color: '#8a95a8', marginBottom: '8px' }}>REQ-2026-004182 · PT Rizky Gemilang</div>
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a' }}>Pemeriksaan AI Sedang Berjalan</h1>
      <div style={{ fontSize: '13px', color: '#67718a', marginTop: '6px', marginBottom: '24px' }}>
        Anda dapat menutup halaman ini — Anda akan diberi tahu saat pemeriksaan selesai.
      </div>

      <div style={{ background: '#12345a', borderRadius: '12px', padding: '24px 32px', color: '#fff', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#e08a00', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' }}>Progres Data Disiapkan</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '36px', fontWeight: 800 }}>{percentage}%</span>
            <span style={{ fontSize: '13px', color: '#8a95a8' }}>{uploadedCount} dari {totalExpected} dokumen valid</span>
          </div>
          <div style={{ height: '6px', background: '#2a4a70', borderRadius: '4px', overflow: 'hidden', width: '80%' }}>
            <div style={{ width: `${percentage}%`, height: '100%', background: '#e08a00', borderRadius: '4px', transition: 'width 0.5s' }}></div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '40px', borderLeft: '1px solid #2a4a70', paddingLeft: '40px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '6px' }}>Status Mesin</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#1f9d6b' }}>Aktif (Anti-Spam)</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '6px' }}>Estimasi selesai</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>~{(uploadedCount * 4) + 2}s</div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #dde3ec', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #dde3ec', color: '#67718a', fontSize: '11px', fontWeight: 700 }}>
              <th style={{ padding: '16px 24px' }}>DOKUMEN</th>
              <th style={{ padding: '16px 24px' }}>UNGGAH</th>
              <th style={{ padding: '16px 24px' }}>KLASIFIKASI</th>
              <th style={{ padding: '16px 24px' }}>OCR</th>
              <th style={{ padding: '16px 24px' }}>VALIDASI SILANG</th>
            </tr>
          </thead>
          <tbody>
            {expectedDocs.map((doc, idx) => {
              const isUploaded = !!uploadedFiles[doc.id];
              return (
                <tr key={doc.id} style={{ borderBottom: '1px solid #f0f3f8' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 700, color: isUploaded ? '#12345a' : '#8a95a8' }}>{idx + 1} · {doc.title}</div>
                    {!isUploaded && <div style={{ fontSize: '11px', color: '#8a95a8', marginTop: '4px' }}>Tidak diunggah / dilewati</div>}
                  </td>
                  {isUploaded ? (
                    <>
                      <td style={{ padding: '16px 24px', color: '#1f9d6b', fontWeight: 600 }}>✓ Selesai</td>
                      <td style={{ padding: '16px 24px', color: '#1f9d6b', fontWeight: 600 }}>✓ Selesai</td>
                      <td style={{ padding: '16px 24px', color: '#1c4e9c', fontWeight: 600 }}>
                        <span style={{ display: 'inline-block', animation: 'spin 2s linear infinite', marginRight: '6px' }}>↻</span> Berjalan
                      </td>
                      <td style={{ padding: '16px 24px', color: '#8a95a8' }}>Menunggu</td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: '16px 24px', color: '#8a95a8' }}>—</td>
                      <td style={{ padding: '16px 24px', color: '#8a95a8' }}>—</td>
                      <td style={{ padding: '16px 24px', color: '#8a95a8' }}>—</td>
                      <td style={{ padding: '16px 24px', color: '#8a95a8' }}>—</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '24px', color: '#8a95a8', fontSize: '11px' }}>
        <div>mesin OCR v4.2 · Jeda auto-retry aktif · seluruh langkah tercatat di Riwayat</div>
        <button style={{ padding: '10px 16px', background: '#c9d2e0', border: 'none', borderRadius: '8px', fontWeight: 700, color: '#fff', cursor: 'not-allowed' }}>Proses Sedang Berjalan</button>
      </div>
    </div>
  );
}

export function ResultList({ setScreen }) {
  return (
    <div>
      <h1 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: 800, color: '#12345a' }}>Hasil Pemeriksaan AI</h1>
      
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #dde3ec', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #dde3ec', color: '#67718a', fontSize: '11px', fontWeight: 700 }}>
              <th style={{ padding: '16px 24px' }}>NO. TIKET</th>
              <th style={{ padding: '16px 24px' }}>NAMA PERUSAHAAN</th>
              <th style={{ padding: '16px 24px' }}>KEBUTUHAN</th>
              <th style={{ padding: '16px 24px' }}>STATUS</th>
              <th style={{ padding: '16px 24px', textAlign: 'right' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #dde3ec' }}>
              <td style={{ padding: '16px 24px', color: '#67718a' }}>REQ-2026-004182</td>
              <td style={{ padding: '16px 24px', fontWeight: 700, color: '#12345a' }}>PT Rizky Gemilang</td>
              <td style={{ padding: '16px 24px', color: '#3d4759' }}>Perubahan Layanan</td>
              <td style={{ padding: '16px 24px' }}>
                <span style={{ padding: '4px 10px', background: '#fef2f2', color: '#e05c4a', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>PERLU PERBAIKAN</span>
              </td>
              <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                <button onClick={() => setScreen('result')} style={{ padding: '6px 14px', background: '#1c4e9c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Lihat Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ResultChecklist({ setScreen, ocrResult }) {
  const getDocName = (source) => {
    const map = { form: 'Form Aplikasi', ktp: 'KTP Pengurus', npwp: 'NPWP Perusahaan', surat_kuasa: 'Surat Kuasa', eksepsi: 'Surat Eksepsi' };
    return map[source] || source.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#8a95a8', marginBottom: '8px' }}>REQ-2026-004182 · Diunggah Barusan</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a' }}>PT Rizky Gemilang</h1>
            <span style={{ padding: '4px 10px', background: '#fef2f2', border: '1px solid #f8b4b4', color: '#e05c4a', fontSize: '11px', fontWeight: 700, borderRadius: '4px' }}>PERLU PERBAIKAN</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setScreen('result_list')} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #dde3ec', borderRadius: '8px', fontWeight: 600, color: '#3d4759', cursor: 'pointer' }}>Kembali ke Daftar</button>
          <button style={{ padding: '10px 16px', background: '#1c4e9c', border: 'none', borderRadius: '8px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Selesaikan Temuan</button>
        </div>
      </div>

      <div style={{ background: '#fef2f2', border: '1px solid #f8b4b4', borderRadius: '10px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e05c4a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flex: 'none' }}>!</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#991b1b', marginBottom: '4px' }}>Belum dapat dikirim ke Operation</div>
          <div style={{ fontSize: '13px', color: '#991b1b' }}>Seluruh temuan — harus diselesaikan terlebih dahulu. Setelah semua bersih, tombol kirim akan aktif secara otomatis.</div>
        </div>
        <button style={{ padding: '8px 16px', background: '#f3f4f6', color: '#9ca3af', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'not-allowed' }}>Kirim ke Operation</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[{ title: 'DOKUMEN DIPROSES', val: `${ocrResult?.length || 0}`, sub: 'berhasil dibaca' },
          { title: 'STATUS EKSTRAKSI', val: 'Selesai', sub: 'diekstrak AI' },
          { title: 'TINJAUAN', val: 'Cek List', sub: 'klik periksa', color: '#e05c4a' },
          { title: 'KEYAKINAN OCR', val: '93%', sub: 'rata-rata' }
        ].map((card, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '10px', padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#8a95a8', fontWeight: 700, marginBottom: '12px' }}>{card.title}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: card.color || '#12345a' }}>{card.val}</span>
              <span style={{ fontSize: '12px', color: '#8a95a8' }}>{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#12345a', marginBottom: '16px' }}>Checklist Dokumen Validasi</h3>
      <div style={{ background: '#fff', border: '1px solid #dde3ec', borderRadius: '12px', overflow: 'hidden' }}>
        
        {ocrResult && ocrResult.map((res, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '20px', borderBottom: index !== ocrResult.length - 1 ? '1px solid #dde3ec' : 'none' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e05c4a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginRight: '16px' }}>
              {index + 1}
            </div>
            
            <div style={{ width: '220px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#12345a', marginBottom: '4px' }}>{getDocName(res.source)}</div>
              <div style={{ fontSize: '11px', color: '#8a95a8' }}>Hasil Ekstraksi OCR Selesai</div>
            </div>

            <div style={{ width: '150px', marginRight: '24px' }}>
              <div style={{ fontSize: '11px', color: '#8a95a8', marginBottom: '6px' }}>
                Menunggu Tinjauan
              </div>
              <div style={{ height: '4px', background: '#f0f3f8', borderRadius: '2px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '70%', background: '#1f9d6b' }}></div>
                <div style={{ width: '30%', background: '#e05c4a' }}></div>
              </div>
            </div>

            <div style={{ flex: 1, fontSize: '12px', color: '#67718a', paddingRight: '24px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontFamily: 'monospace' }}>
              {res.text.substring(0, 100)}...
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#e05c4a' }}>Tinjau</div>
              <div onClick={() => setScreen('detail')} style={{ fontSize: '13px', fontWeight: 700, color: '#1c4e9c', cursor: 'pointer' }}>
                Periksa →
              </div>
            </div>
          </div>
        ))}

        {!ocrResult && (
          <div style={{ padding: '40px', textAlign: 'center', fontSize: '14px', color: '#8a95a8' }}>Tidak ada data hasil. Silakan ulangi proses upload.</div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// TAMPILAN DETAIL 100% DINAMIS (PARSING OCR TEXT & RENDER GAMBAR UPLOAD)
// ==========================================
export function DetailView({ setScreen, ocrResult, uploadedFiles }) {
  // State Interaktif
  const [activeTab, setActiveTab] = useState(ocrResult?.[0]?.source || 'form');
  const [zoom, setZoom] = useState(100);
  const [highlight, setHighlight] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState('');

  // 1. Dapatkan teks mentah dari AI berdasarkan tab yang diklik
  const currentOcrText = ocrResult?.find(r => r.source === activeTab)?.text || '';
  
  // 2. Parser Pintar: Ubah baris teks Gemini ("Nama : Budi") jadi objek
  let docTitle = 'Dokumen Tidak Dikenal';
  let fields = [];
  
  const lines = currentOcrText.split('\n').filter(l => l.trim() !== '');
  lines.forEach(line => {
    if (line.startsWith('[DOKUMEN:')) {
      docTitle = line.replace('[DOKUMEN:', '').replace(']', '').trim();
    } else if (line.includes(' : ')) {
      const parts = line.split(' : ');
      fields.push({ 
        key: parts[0].trim(), 
        value: parts.slice(1).join(' : ').trim() // Gabungkan sisa string jika ada titik dua ganda
      });
    }
  });

  // Hitung berapa field yang berstatus "null" (Temuan)
  const temuanCount = fields.filter(f => f.value === 'null').length;

  // 3. Render Gambar Asli dari File yang di-Upload
  useEffect(() => {
    const file = uploadedFiles?.[activeTab];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileType(file.type);
      setFileName(file.name);
      return () => URL.revokeObjectURL(url);
    } else {
      setFileUrl(null);
    }
  }, [activeTab, uploadedFiles]);

  const handleZoomIn = () => setZoom(z => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom(z => Math.max(z - 10, 50));

  const getDocName = (source) => {
    const map = { form: 'Form Aplikasi', ktp: 'KTP Pengurus', npwp: 'NPWP Perusahaan', surat_kuasa: 'Surat Kuasa', eksepsi: 'Surat Eksepsi' };
    return map[source] || source.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)', margin: '-20px -24px -32px', background: '#f0f3f8' }}>
      
      {/* HEADER ATAS */}
      <div style={{ background: '#fff', padding: '20px 24px', borderBottom: '1px solid #dde3ec' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div onClick={() => setScreen('result')} style={{ fontSize: '12px', color: '#1c4e9c', fontWeight: 600, cursor: 'pointer', marginBottom: '8px' }}>
              ← Hasil Pemeriksaan · REQ-2026-004182
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#12345a' }}>{docTitle}</h1>
              {temuanCount > 0 && (
                <span style={{ padding: '4px 8px', background: '#fef2f2', color: '#e05c4a', fontSize: '11px', fontWeight: 700, borderRadius: '4px' }}>
                  {temuanCount} TEMUAN
                </span>
              )}
            </div>
            <div style={{ fontSize: '13px', color: '#8a95a8', marginTop: '6px' }}>
              Pengecekan Teks OCR Dinamis <span style={{ margin: '0 8px' }}>|</span> {fields.length} data validasi
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setScreen('upload')} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #dde3ec', borderRadius: '8px', fontWeight: 600, color: '#3d4759', cursor: 'pointer' }}>Unggah Ulang</button>
            <button onClick={() => setScreen('result')} style={{ padding: '10px 16px', background: '#1c4e9c', border: 'none', borderRadius: '8px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Simpan Perbaikan</button>
          </div>
        </div>

        {/* TABS BERDASARKAN DOKUMEN YANG ADA SAJA */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {ocrResult && ocrResult.map((res, index) => {
            const isActive = activeTab === res.source;
            const hasNull = res.text.includes('null');
            return (
              <div 
                key={res.source} 
                onClick={() => { setActiveTab(res.source); setZoom(100); setHighlight(false); }}
                style={{ minWidth: '180px', padding: '12px 16px', background: isActive ? '#12345a' : '#fff', border: isActive ? 'none' : '1px solid #dde3ec', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ fontSize: '11px', color: isActive ? '#8ba2c4' : '#8a95a8', marginBottom: '4px' }}>
                  {index + 1} · {getDocName(res.source)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: isActive ? '#fff' : '#12345a' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: hasNull ? '#e05c4a' : '#1f9d6b' }}></div>
                  {hasNull ? 'Perlu Diperiksa' : 'Sesuai'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', padding: '20px', gap: '20px' }}>
        
        {/* PANEL KIRI: DATA VALIDASI DINAMIS DARI OCR */}
        <div style={{ width: '45%', background: '#fff', borderRadius: '12px', border: '1px solid #dde3ec', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #dde3ec', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#12345a' }}>Data Validasi · {fields.length} field</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '4px 12px', background: '#12345a', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Semua</button>
            </div>
          </div>

          <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            
            {fields.length === 0 && (
              <div style={{ textAlign: 'center', color: '#8a95a8', marginTop: '40px', fontSize: '13px' }}>Tidak ada data yang berhasil diekstrak.</div>
            )}

            {fields.map((field, idx) => {
              const isMissing = field.value === 'null';
              return (
                <div key={idx} style={{ marginBottom: '20px', paddingLeft: isMissing ? '16px' : '0', borderLeft: isMissing ? '4px solid #e05c4a' : 'none', marginLeft: isMissing ? '-20px' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#67718a' }}>{field.key}</span>
                  </div>
                  
                  {isMissing ? (
                    <div>
                      <input 
                        type="text" 
                        defaultValue="" 
                        placeholder="Tidak diisi oleh nasabah (Ketik manual)" 
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #f8b4b4', background: '#fef2f2', borderRadius: '6px', fontSize: '14px', fontFamily: 'monospace', color: '#991b1b', outline: 'none' }} 
                      />
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#e05c4a', marginTop: '6px' }}>TEMUAN · Field kosong di dokumen asli</div>
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      defaultValue={field.value} 
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #dde3ec', borderRadius: '6px', fontSize: '14px', fontWeight: 600, color: '#12345a', outline: 'none', fontFamily: 'monospace' }} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL KANAN: FILE VIEWER (INTERAKTIF & RENDER ASLI) */}
        <div style={{ width: '55%', background: '#fff', borderRadius: '12px', border: '1px solid #dde3ec', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #dde3ec', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#12345a', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {fileName || "Dokumen Tidak Ditemukan"}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dde3ec', borderRadius: '6px', background: '#fff' }}>
                <button onClick={handleZoomOut} style={{ padding: '4px 10px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}>-</button>
                <span style={{ fontSize: '12px', fontWeight: 600, padding: '0 8px', minWidth: '45px', textAlign: 'center' }}>{zoom}%</span>
                <button onClick={handleZoomIn} style={{ padding: '4px 10px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}>+</button>
              </div>
              <button 
                onClick={() => setHighlight(!highlight)}
                style={{ padding: '6px 12px', background: highlight ? '#fcd34d' : '#fff8ec', color: highlight ? '#92400e' : '#b45309', border: '1px solid #fcd34d', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {highlight ? 'Tutup Sorotan' : 'Sorot Temuan'}
              </button>
            </div>
          </div>

          <div style={{ flex: 1, background: '#eef1f6', padding: '30px', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            
            {fileUrl ? (
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s ease', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#fff' }}>
                
                {/* Tampilkan PDF lewat Iframe, atau Gambar lewat Img */}
                {fileType === 'application/pdf' ? (
                   <iframe src={`${fileUrl}#toolbar=0&navpanes=0`} width="800px" height="1000px" style={{ border: 'none' }} title="Document Viewer" />
                ) : (
                   <img src={fileUrl} alt="Uploaded Doc" style={{ maxWidth: '800px', display: 'block' }} />
                )}

                {/* Overlay Sorotan Buatan Jika Tombol Diklik */}
                {highlight && temuanCount > 0 && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(224, 92, 74, 0.1)', pointerEvents: 'none', border: '4px solid #e05c4a' }}>
                    <div style={{ position: 'absolute', top: '20%', left: '10%', background: '#e05c4a', color: '#fff', padding: '10px 20px', fontSize: '24px', fontWeight: 800, borderRadius: '8px', opacity: 0.8 }}>
                      Area Temuan Dideteksi (Simulasi)
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginTop: '100px', color: '#8a95a8', fontSize: '14px' }}>Pratinjau tidak tersedia.</div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export function FindingsView({ setScreen, ocrResult }) {
  return <div><h2 onClick={() => setScreen('result')} style={{cursor: 'pointer', color: '#1c4e9c', padding: '20px'}}>← Kembali ke Hasil Pemeriksaan</h2></div>;
}

export function TrackingView({ setScreen }) {
  return <div><h2 onClick={() => setScreen('queue')} style={{cursor: 'pointer', color: '#1c4e9c', padding: '20px'}}>← Kembali ke Antrean</h2></div>;
}

export function AuditTrail({ setScreen }) {
  return <div><h2 onClick={() => setScreen('queue')} style={{cursor: 'pointer', color: '#1c4e9c', padding: '20px'}}>← Kembali ke Antrean</h2></div>;
}