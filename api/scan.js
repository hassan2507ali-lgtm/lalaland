export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Mengizinkan upload gambar beresolusi tinggi
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { imageBase64, mimeType } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Data gambar tidak ditemukan' });
  }

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY belum dikonfigurasi di environment variables");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

    // PROMPT ENGINE: Menerapkan Strict Schema & Null Enforcement
    const requestBody = {
      contents: [{
        parts: [
          { 
            text: `Anda adalah mesin ekstraksi data (OCR) perbankan tingkat lanjut. 
Tugas Anda adalah membaca gambar/dokumen yang diberikan, mengidentifikasi apakah itu KTP, NPWP, atau Formulir Aplikasi, dan HANYA mengekstrak data menggunakan salah satu dari 3 format di bawah ini.

ATURAN KETAT:
1. JANGAN berikan kalimat pengantar atau penutup.
2. JANGAN tambahkan field yang tidak ada di format.
3. JIKA kotak isian pada formulir/dokumen kosong (tidak diisi oleh nasabah), Anda WAJIB menuliskan kata null. Jangan gunakan tanda strip (-), jangan dikosongkan, tulis persis: null.
4. Output harus persis mengikuti susunan baris di bawah ini.

====================
Jika dokumen adalah KTP, gunakan format ini:
[DOKUMEN: KTP]
NIK : [Isi atau null]
Nama : [Isi atau null]
Tempat/Tgl Lahir : [Isi atau null]
Jenis Kelamin : [Isi atau null]
Alamat : [Isi atau null]
RT/RW : [Isi atau null]
Kel/Desa : [Isi atau null]
Kecamatan : [Isi atau null]
Agama : [Isi atau null]
Status Perkawinan : [Isi atau null]
Pekerjaan : [Isi atau null]

====================
Jika dokumen adalah NPWP, gunakan format ini:
[DOKUMEN: NPWP]
No NPWP : [Isi atau null]
Nama : [Isi atau null]
Alamat : [Isi atau null]

====================
Jika dokumen adalah Formulir Aplikasi, gunakan format ini (berdasarkan field Formulir Bank Mandiri):
[DOKUMEN: FORMULIR APLIKASI]
Nama Lengkap : [Isi atau null]
Nama Alias : [Isi atau null]
Tempat/Tgl Lahir : [Isi atau null]
Nama Gadis Ibu Kandung : [Isi atau null]
Jenis Kelamin : [Isi atau null]
Jenis Identitas Utama : [Isi atau null]
Nomor Identitas : [Isi atau null]
Alamat Sesuai ID : [Isi atau null]
Agama : [Isi atau null]
Status Pekerjaan : [Isi atau null]
Status Perkawinan : [Isi atau null]
Pendidikan Terakhir : [Isi atau null]
Kewarganegaraan : [Isi atau null]
Pekerjaan Sekarang : [Isi atau null]
Nama Perusahaan : [Isi atau null]
Bidang Usaha : [Isi atau null]
Sumber Pendapatan : [Isi atau null]
NPWP Tambahan : [Isi atau null]
Alamat Tinggal Sekarang : [Isi atau null]
Email : [Isi atau null]
Jenis Rekening : [Isi atau null]
Tujuan Pembukaan Rekening : [Isi atau null]
Tujuan Penggunaan Dana : [Isi atau null]
` 
          },
          { inline_data: { mime_type: mimeType || "image/jpeg", data: imageBase64 } }
        ]
      }]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Gagal menghubungi Gemini API' });
    }

    const extractedText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ text: extractedText });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}