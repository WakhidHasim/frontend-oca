import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';

enum JenisDokumenTerkait {
  faktur_pajak = 'Faktur Pajak',
  invoice = 'Invoice',
  bukti_pembayaran = 'Bukti Pembayaran',
}

enum PIC {
  dpk = 'DPK',
}

interface PengajuanAnggaran {
  id_kegiatan_anggaran: string;
  tahun: string;
  kegiatan: string;
  no_pengajuan: string;
  idl: string;
  jumlah_pengajuan: number;
  metode_pengajuan: string;
  status_pengajuan: string;
  tanggal_pengajuan: string;
}

interface WajibPajakBadanUsaha {
  kode_wpbadan: string;
  nama_badan: string;
  email: string;
  npwp: string;
  nama_npwp: string;
  kota_npwp: string;
  bank_transfer: string;
  no_rekening: string;
  nama_rekening: string;
  nama_narahubung: string;
  kontak_narahubung: string;
  ada_skb_pph23: boolean;
  masa_berlaku_bebas_pph23: string | null;
  file_foto_identitas_badan: string;
  file_foto_bukti_rekening: string;
  file_foto_npwp: string | null;
  file_surat_bebas_pph23: string | null;
  status_pkp: string;
}

interface ObjekPajak {
  kode_objek: string;
  kode_jenis_pajak_id: number;
  objek_pajak: string;
  tarif_npwp: number;
  tarif_non_npwp: number;
}

interface JenisPenghasilan {
  kode_jenis_penghasilan: number;
  kode_akun: number;
  jenis_pajak_terkait: number;
  jenis_penghasilan: string;
}

const FormTambahKegiatan: React.FC = () => {
  const [formData, setFormData] = useState({
    // Initialize form data here
    uraian: '',
    noPengajuan: '',
    noDokumentasiReferensi: '',
    jenisDokumentasiTerkait: 'invoice',
    uploadBuktiBayar: null,
    pic: 'pic1',
    kodeWpBadan: '',
    jenisPenghasilan: '',
    kodeObjekPajak: '',
    penghasilanBruto: '',
    tanggal: '',
  });

  const [pengajuanAnggaranOptions, setPengajuanAnggaranOptions] = useState<
    PengajuanAnggaran[]
  >([]);

  const [badanUsahaOptions, setBadanUsahaOptions] = useState<
    WajibPajakBadanUsaha[]
  >([]);
  const [selectedBadanUsaha, setSelectedBadanUsaha] =
    useState<WajibPajakBadanUsaha | null>(null);

  const [objekPajakOptions, setObjekPajakOptions] = useState<ObjekPajak[]>([]);
  const [selectedObjekPajak, setSelectedObjekPajak] =
    useState<ObjekPajak | null>(null);

  const [jenisPenghasilanOptions, setJenisPenghasilanOptions] = useState<
    JenisPenghasilan[]
  >([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/pengajuan-anggaran')
      .then((response) => response.json())
      .then(
        (data: {
          status: { code: number; description: string };
          result: PengajuanAnggaran[];
        }) => {
          if (data.status.code === 200) {
            setPengajuanAnggaranOptions(data.result);
          } else {
            console.error('Error fetching data:', data.status.description);
          }
        }
      );

    fetch('http://localhost:3000/api/wajib-pajak-badan-usaha')
      .then((response) => response.json())
      .then(
        (data: {
          status: { code: number; description: string };
          result: WajibPajakBadanUsaha[];
        }) => {
          if (data.status.code === 200) {
            setBadanUsahaOptions(data.result);
          } else {
            console.error('Error fetching data:', data.status.description);
          }
        }
      );

    fetch('http://localhost:3000/api/jenis-penghasilan-pph23')
      .then((response) => response.json())
      .then(
        (data: {
          status: { code: number; description: string };
          result: JenisPenghasilan[];
        }) => {
          if (data.status.code === 200) {
            setJenisPenghasilanOptions(data.result);
          } else {
            console.error('Error fetching data:', data.status.description);
          }
        }
      );

    fetch('http://localhost:3000/api/objek-pajak-pph23')
      .then((response) => response.json())
      .then(
        (data: {
          status: { code: number; description: string };
          result: ObjekPajak[];
        }) => {
          if (data.status.code === 200) {
            setObjekPajakOptions(data.result);
          } else {
            console.error('Error fetching data:', data.status.description);
          }
        }
      );
  }, []);

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full'>
        <div className='mb-5'>
          <label className='block'>Uraian Kegiatan</label>
          <span className='text-gray-600 text-xs'>
            {' '}
            * Berisi nama imbalan, kegiatan, subyek prodi (jika ada), periode
            (ke- atau bulan tahun), PTT/BP atau PT (jika waktu penerimaan
            dibedakan untuk PT dan PTT)
          </span>
          <input
            type='text'
            id='uraian'
            name='uraian'
            className='w-full p-2 mt-3 border rounded-md'
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>No Pengajuan Anggaran</label>
          <select
            id='noPengajuan'
            name='noPengajuan'
            className='w-full p-2 border rounded-md'
          >
            <option value=''>Select No Pengajuan Anggaran</option>
            {pengajuanAnggaranOptions.map((option) => (
              <option key={option.no_pengajuan} value={option.no_pengajuan}>
                {option.no_pengajuan} - {option.kegiatan}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>No Dokumentasi Referensi</label>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Jenis Dokumentasi Terkait</label>
          <select
            value={formData.jenisDokumentasiTerkait}
            onChange={(e) =>
              setFormData({
                ...formData,
                jenisDokumentasiTerkait: e.target.value,
              })
            }
            className='w-full p-2 border rounded'
          >
            <option value=''>Pilih Jenis Dokumen</option>
            {Object.values(JenisDokumenTerkait).map((value) => (
              <option key={value} value={value}>
                {value.charAt(0).toUpperCase() +
                  value.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label htmlFor='uploadBuktiBayar' className='block mb-2'>
            Upload Bukti Pendukung
          </label>
          <input
            type='file'
            id='uploadBuktiBayar'
            name='uploadBuktiBayar'
            className='w-full p-2 border rounded-md'
            onChange={handleFileUpload}
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>PIC (Pencairan Penghasilan)</label>
          <select
            value={formData.pic}
            onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
            className='w-full p-2 border rounded-md'
          >
            <option value=''>Pilih PIC</option>
            {Object.values(PIC).map((value) => (
              <option key={value} value={value}>
                {value.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Nama Badan Usaha</label>
          <select
            className='w-full p-2 border rounded-md'
            onChange={(e) => {
              const selected = badanUsahaOptions.find(
                (option) => option.kode_wpbadan === e.target.value
              );
              setSelectedBadanUsaha(selected || null);
            }}
          >
            <option value=''>Select Nama Badan Usaha</option>
            {badanUsahaOptions.map((option) => (
              <option key={option.kode_wpbadan} value={option.kode_wpbadan}>
                {option.nama_badan}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>NPWP</label>
          <input
            type='text'
            value={selectedBadanUsaha ? selectedBadanUsaha.npwp : ''}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Nama Bank</label>
          <input
            type='text'
            value={selectedBadanUsaha ? selectedBadanUsaha.bank_transfer : ''}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>No Rekening</label>
          <input
            type='text'
            value={selectedBadanUsaha ? selectedBadanUsaha.no_rekening : ''}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Nama Rekening</label>
          <input
            type='text'
            value={selectedBadanUsaha ? selectedBadanUsaha.nama_rekening : ''}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Jenis Penghasilan</label>
          <select className='w-full p-2 border rounded-md'>
            <option value=''>Select Jenis Penghasilan</option>
            {jenisPenghasilanOptions.map((option) => (
              <option
                key={option.kode_jenis_penghasilan}
                value={option.kode_jenis_penghasilan}
              >
                {option.jenis_penghasilan}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Objek Pajak</label>
          <select
            className='w-full p-2 border rounded-md'
            onChange={(e) => {
              const selected = objekPajakOptions.find(
                (option) => option.kode_objek === e.target.value
              );
              setSelectedObjekPajak(selected || null);
            }}
          >
            <option value=''>Select Nama Badan Usaha</option>
            {objekPajakOptions.map((option) => (
              <option key={option.kode_objek} value={option.kode_objek}>
                {option.objek_pajak}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Penghasilan Bruto</label>
          <input
            type='text'
            id='pic'
            name='pic'
            className='w-full p-2 border rounded-md'
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Tarif Pajak</label>
          <input
            type='text'
            value={selectedObjekPajak ? selectedObjekPajak.tarif_npwp : ''}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Potongan Pajak</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Penghasilan Diterima</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='tanggal' className='block mb-2'>
            Tanggal Transaksi
          </label>
          <input
            type='date'
            id='tanggal'
            name='tanggal'
            className='w-full p-2 border rounded-md'
          />
        </div>
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to='/dataKegiatan23'>
          <button className='bg-gray-400 p-2 rounded-mdpx-4 flex gap-1 text-sm'>
            <TiCancel size={20} className='p-1 text-white' />
            <span>Kembali</span>
          </button>
        </Link>
        <button className='bg-purple p-2 rounded-mdpx-4 flex gap-1 text-sm'>
          <IoIosSave size={18} className='p-1' />
          <span>Simpan</span>
        </button>
      </div>
    </div>
  );
};
export default FormTambahKegiatan;
