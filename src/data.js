export const featuresData = [
  { 
    id: 1, 
    title: 'Scan Excel', 
    desc: 'baris & kolom data spreadsheet.', 
    icon: '📊', 
    category: 'Document',
    stat: 'Spreadsheet'
  },
  { 
    id: 2, 
    title: 'Scan Word', 
    desc: 'Validasi format dokumen Word ', 
    icon: '📝', 
    category: 'Document',
    stat: 'Text Doc'
  },
  { 
    id: 3, 
    title: 'Scan Tulis Tangan', 
    desc: 'OCR', 
    icon: '✍️', 
    category: 'Handwritten',
    stat: 'Image/OCR'
  }
];

export const filterOptions = ['All', 'Document', 'Handwritten'];

// Dummy data untuk tabel riwayat scan
export const historyData = [
  { id: 'TRX-001', date: '04/09/2026', type: 'Excel', filename: 'report_Q3.xlsx', status: 'Match' },
  { id: 'TRX-002', date: '03/09/2026', type: 'Handwritten', filename: 'catatan_rapat.jpg', status: 'Extracted' },
  { id: 'TRX-003', date: '01/09/2026', type: 'Word', filename: 'template_surat.docx', status: 'Unmatch' },
  { id: 'TRX-004', date: '28/08/2026', type: 'Excel', filename: 'data_karyawan.xls', status: 'Match' },
];