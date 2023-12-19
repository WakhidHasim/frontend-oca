import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';

const FormTambahInventaris: React.FC = () => {
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full'>
        <div className='mb-5'>
          <label className='block'>Uraian Kegiatan</label>
          <span className='text-gray-600 text-sm'>
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
            <option value='no1'>009765678</option>
            <option value='no2'>008766789</option>
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Tanggal Transaksi</label>
          <input
            type='date'
            id='tanggal'
            name='tanggal'
            className='w-full p-2 border rounded-md'
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Jenis Pajak</label>
          <select className='w-full p-2 border rounded'>
            <option value='jenis1'>Belum Setor</option>
            <option value='jenis2'>Sudah Setor</option>
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Objek Pajak</label>
          <select className='w-full p-2 border rounded'>
            <option value='objek1'>Belum Setor</option>
            <option value='onjek2'>Sudah Setor</option>
          </select>
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
            {Object.values(JenisDokumenTerkait).map((value) => (
              <option key={value} value={value}>
                {value.charAt(0).toUpperCase() +
                  value.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Upload Bukti Dokumentasi</label>
          <input
            type='file'
            id='uploadBuktiBayar'
            name='uploadBuktiBayar'
            className='w-full p-2 border rounded-md'
            onChange={handleFileUpload}
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Nilai Transaksi</label>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Nilai Pajak</label>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Nama Pemotong</label>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>NPWP Pemotong</label>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to='/inventaris'>
          <button className='bg-gray-400 p-2 rounded px-4 flex gap-1 text-sm'>
            <TiCancel size={20} clasName='p-1 text-white  ' />
            <span>Kembali</span>
          </button>
        </Link>
        <button className='bg-purple p-2 rounded px-4 flex gap-1 text-sm'>
          <IoIosSave size={18} clasName='p-1' />
          <span>Simpan</span>
        </button>
      </div>
    </div>
  );
};
export default FormTambahInventaris;
