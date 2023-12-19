export interface IPPH3FormSchema {
  idKegiatanAnggaran: string;
  noPengajuan: string;
  noDokumentasi: string;
  jenisDokumentasi: string;
  buktiBayar: string;
  pic: string;
  badanUsaha: string;
  npwp: string;
  // create
  namaBank: string;
  noRekening: string;
  namaRekening: string;
  jenisPenghasilan: string;

  objekPajak: string;
  bruto: string;
  tarifPajak: string;
  potonganPajak: string;
  penghasilanDiterima: string;
  tanggalPotong: string;
  tanggalTransaksi: string;
}

/**
 * return a fields metadata that used on pph23 forms (create and update)
 */
export const getFieldsMetadata: { [K in keyof IPPH3FormSchema]: { id: K; label: string; subLabel?: string } } = {
  idKegiatanAnggaran: {
    label: 'Uraian Kegiatan',
    id: 'idKegiatanAnggaran',
    subLabel:
      '* Berisi nama imbalan, kegiatan, subyek prodi (jika ada), periode (ke- atau bulan tahun), PTT/BP atau PT (jika waktu penerimaan dibedakan untuk PT dan PTT)',
  },
  noPengajuan: {
    label: 'No Pengajuan Anggaran',
    id: 'noPengajuan',
  },
  noDokumentasi: {
    label: 'No Dokumentasi Referensi',
    id: 'noDokumentasi',
  },
  jenisDokumentasi: {
    label: 'Jenis Dokumentasi Terkait',
    id: 'jenisDokumentasi',
  },
  buktiBayar: {
    label: 'Upload Bukti Pendukung',
    id: 'buktiBayar',
  },
  pic: {
    label: 'PIC (Pencairan Penghasilan)',
    id: 'pic',
  },
  badanUsaha: {
    label: 'Nama Badan Usaha',
    id: 'badanUsaha',
  },
  npwp: {
    label: 'NPWP',
    id: 'npwp',
  },
  namaBank: {
    label: 'Nama Bank',
    id: 'namaBank',
  },
  noRekening: {
    label: 'No Rekening',
    id: 'noRekening',
  },
  namaRekening: {
    label: 'Nama Rekening',
    id: 'namaRekening',
  },
  jenisPenghasilan: {
    label: 'Jenis Penghasilan',
    id: 'jenisPenghasilan',
  },
  objekPajak: {
    label: 'Objek Pajak',
    id: 'objekPajak',
  },
  bruto: {
    label: 'Penghasilan Bruto',
    id: 'bruto',
  },
  tarifPajak: {
    label: 'Tarif Pajak',
    id: 'tarifPajak',
  },
  potonganPajak: {
    label: 'Potongan Pajak',
    id: 'potonganPajak',
  },
  penghasilanDiterima: {
    label: 'Penghasilan Diterima',
    id: 'penghasilanDiterima',
  },
  tanggalPotong: {
    label: 'Tanggal Potong',
    id: 'tanggalPotong',
  },
  tanggalTransaksi: {
    label: 'Tanggal Transaksi',
    id: 'tanggalTransaksi',
  },
};
