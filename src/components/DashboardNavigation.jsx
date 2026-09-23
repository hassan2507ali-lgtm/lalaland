import React from 'react';

export function Topbar({ setScreen, notifOpen, setNotifOpen }) {
  return (
    <div style={{ height: '56px', background: '#12345a', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '20px', flex: 'none', position: 'relative', zIndex: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#fdba12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#12345a' }}>K</div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em' }}>Kopra Cash Management</div>
        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,.22)' }}></div>
        <div style={{ color: 'rgba(255,255,255,.72)', fontSize: '12px', fontWeight: 500 }}>Pemeriksaan Dokumen AI</div>
      </div>
      <div style={{ flex: 1 }}></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div onClick={() => setNotifOpen(!notifOpen)} className="hover-bg-light" style={{ position: 'relative', cursor: 'pointer', padding: '6px 8px', borderRadius: '7px' }}>
          <div style={{ width: '16px', height: '16px', border: '1.6px solid rgba(255,255,255,.8)', borderRadius: '5px 5px 3px 3px' }}></div>
          <div style={{ position: 'absolute', top: '3px', right: '4px', minWidth: '15px', height: '15px', padding: '0 4px', borderRadius: '8px', background: '#e05c4a', color: '#fff', fontSize: '9px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #12345a' }}>4</div>
        </div>
        <div style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,.18)' }}></div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#fff', fontSize: '11.5px', fontWeight: 600, lineHeight: 1.3 }}>Anisa Rahmawati</div>
          <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '10.5px' }}>KCU Surabaya Pemuda · RM</div>
        </div>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#2b5fa8', color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AR</div>
      </div>

      {notifOpen && (
        <div style={{ position: 'absolute', top: '52px', right: '150px', width: '352px', background: '#fff', border: '1px solid #dde3ec', borderRadius: '11px', boxShadow: '0 12px 32px rgba(18,52,90,.18)', zIndex: 30, overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #e8edf4', display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#12345a' }}>Notifikasi</div>
            <div style={{ flex: 1 }}></div>
            <div onClick={() => setNotifOpen(false)} style={{ fontSize: '11px', color: '#1c4e9c', fontWeight: 700, cursor: 'pointer' }}>Tandai terbaca</div>
          </div>
          <div onClick={() => { setScreen('progress'); setNotifOpen(false); }} className="hover-bg-gray" style={{ padding: '12px 14px', borderBottom: '1px solid #f0f3f8', display: 'flex', gap: '10px', cursor: 'pointer', background: '#fbfcfe' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1f9d6b', marginTop: '5px', flex: 'none' }}></div>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#1a2333', lineHeight: 1.4 }}>Ekstraksi AI selesai</div>
              <div style={{ fontSize: '11px', color: '#67718a', lineHeight: 1.5, marginTop: '2px' }}>REQ-2026-004182 · PT Rizky Gemilang · 47 field terbaca dari 6 dokumen</div>
              <div style={{ fontSize: '10px', color: '#8a95a8', marginTop: '4px' }}>4 menit lalu</div>
            </div>
          </div>
          <div onClick={() => { setScreen('findings'); setNotifOpen(false); }} className="hover-bg-gray" style={{ padding: '12px 14px', borderBottom: '1px solid #f0f3f8', display: 'flex', gap: '10px', cursor: 'pointer', background: '#fbfcfe' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e05c4a', marginTop: '5px', flex: 'none' }}></div>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#1a2333', lineHeight: 1.4 }}>4 temuan baru ditemukan</div>
              <div style={{ fontSize: '11px', color: '#67718a', lineHeight: 1.5, marginTop: '2px' }}>REQ-2026-004182 · 2 kritis, 2 peringatan. Perlu diperbaiki sebelum kirim.</div>
              <div style={{ fontSize: '10px', color: '#8a95a8', marginTop: '4px' }}>4 menit lalu</div>
            </div>
          </div>
          <div className="hover-bg-gray2" style={{ padding: '12px 14px', borderBottom: '1px solid #f0f3f8', display: 'flex', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e08a00', marginTop: '5px', flex: 'none' }}></div>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#1a2333', lineHeight: 1.4 }}>Batas SLA mendekat</div>
              <div style={{ fontSize: '11px', color: '#67718a', lineHeight: 1.5, marginTop: '2px' }}>REQ-2026-004156 · PT Anugrah Perkasa · sisa 1 jam 12 menit</div>
              <div style={{ fontSize: '10px', color: '#8a95a8', marginTop: '4px' }}>1 jam lalu</div>
            </div>
          </div>
          <div className="hover-bg-gray2" style={{ padding: '12px 14px', display: 'flex', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#c9d2e0', marginTop: '5px', flex: 'none' }}></div>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#3d4759', lineHeight: 1.4 }}>Permohonan dikembalikan Ops</div>
              <div style={{ fontSize: '11px', color: '#67718a', lineHeight: 1.5, marginTop: '2px' }}>REQ-2026-004097 · PT Universal · Surat Kuasa kurang materai</div>
              <div style={{ fontSize: '10px', color: '#8a95a8', marginTop: '4px' }}>Kemarin, 16:32</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ screen, setScreen }) {
  const getNavStyle = (targets) => {
    const isActive = targets.includes(screen);
    return {
      padding: '9px 16px',
      fontSize: '12.5px',
      fontWeight: isActive ? 700 : 500,
      color: isActive ? '#12345a' : '#4a5568',
      background: isActive ? '#eef3fb' : 'transparent',
      borderLeft: `3px solid ${isActive ? '#1c4e9c' : 'transparent'}`,
      cursor: 'pointer'
    };
  };

  return (
    <div style={{ width: '200px', background: '#fff', borderRight: '1px solid #dde3ec', padding: '16px 0', flex: 'none' }}>
      <div style={{ padding: '0 16px 10px', fontSize: '10px', fontWeight: 700, letterSpacing: '.09em', color: '#8a95a8' }}>MENU</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div onClick={() => setScreen('queue')} className={!['queue', 'empty'].includes(screen) ? "hover-text-blue" : ""} style={getNavStyle(['queue', 'empty'])}>Daftar Permohonan</div>
        <div onClick={() => setScreen('new')} className={!['new', 'upload', 'progress'].includes(screen) ? "hover-text-blue" : ""} style={getNavStyle(['new', 'upload', 'progress'])}>Permohonan Baru</div>
        <div onClick={() => setScreen('result')} className={!['result', 'detail', 'findings'].includes(screen) ? "hover-text-blue" : ""} style={getNavStyle(['result', 'detail', 'findings'])}>Hasil Pemeriksaan</div>
        <div onClick={() => setScreen('tracking')} className={screen !== 'tracking' ? "hover-text-blue" : ""} style={getNavStyle(['tracking'])}>Status Pengiriman</div>
        <div onClick={() => setScreen('audit')} className={screen !== 'audit' ? "hover-text-blue" : ""} style={getNavStyle(['audit'])}>Riwayat</div>
      </div>

      {!['new', 'empty'].includes(screen) && (
        <>
          <div style={{ margin: '18px 12px 0', padding: '12px', background: '#12345a', borderRadius: '9px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#fdba12', letterSpacing: '.07em', marginBottom: '7px' }}>SISA SLA</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '21px', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em' }}>03:42</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.55)', marginTop: '3px', lineHeight: 1.4 }}>jam menuju batas kirim<br/>REQ-2026-004182</div>
            <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.16)', marginTop: '10px', overflow: 'hidden' }}><div style={{ width: '54%', height: '4px', background: '#fdba12' }}></div></div>
          </div>
          <div style={{ margin: '12px 12px 0', padding: '11px 12px', border: '1px solid #e0e6ef', borderRadius: '9px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.07em', color: '#8a95a8', marginBottom: '8px' }}>RINGKASAN HARI INI</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ fontSize: '11px', color: '#67718a' }}>Draft</div><div style={{ fontSize: '11px', fontWeight: 700, color: '#1a2333' }}>2</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ fontSize: '11px', color: '#67718a' }}>Diperiksa AI</div><div style={{ fontSize: '11px', fontWeight: 700, color: '#1a2333' }}>1</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ fontSize: '11px', color: '#67718a' }}>Perlu perbaikan</div><div style={{ fontSize: '11px', fontWeight: 700, color: '#b3382a' }}>3</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ fontSize: '11px', color: '#67718a' }}>Siap dikirim</div><div style={{ fontSize: '11px', fontWeight: 700, color: '#137a51' }}>3</div></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}