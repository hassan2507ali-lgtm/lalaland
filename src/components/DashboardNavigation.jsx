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
    </div>
  );
}

export function Sidebar({ screen, setScreen, ticketNumber }) {
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
        <div onClick={() => setScreen('result_list')} className={!['result_list', 'result_detail', 'detail', 'findings'].includes(screen) ? "hover-text-blue" : ""} style={getNavStyle(['result_list', 'result_detail', 'detail', 'findings'])}>Hasil Pemeriksaan</div>
        <div onClick={() => setScreen('tracking')} className={!['tracking', 'tracking_detail'].includes(screen) ? "hover-text-blue" : ""} style={getNavStyle(['tracking', 'tracking_detail'])}>Status Pengiriman</div>
        <div onClick={() => setScreen('audit')} className={screen !== 'audit' ? "hover-text-blue" : ""} style={getNavStyle(['audit'])}>Riwayat</div>
      </div>

      {!['new', 'empty'].includes(screen) && (
        <>
          <div style={{ margin: '18px 12px 0', padding: '12px', background: '#12345a', borderRadius: '9px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#fdba12', letterSpacing: '.07em', marginBottom: '7px' }}>SISA SLA</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '21px', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em' }}>03:42</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.55)', marginTop: '3px', lineHeight: 1.4 }}>jam menuju batas kirim<br/>{ticketNumber || 'REQ-2026-004182'}</div>
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