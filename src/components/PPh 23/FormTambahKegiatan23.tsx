import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import { useForm } from 'react-hook-form';
import { IPPH3FormSchema, getFieldsMetadata } from './form-fields';
import { imageToBase64 } from '../../utils/file';
import { parsePPH23RawFormToValidPayload } from './helpers';

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
  const { register, handleSubmit } = useForm<IPPH3FormSchema>({
    defaultValues: { pic: 'DPK', tanggalTransaksi: new Date().toISOString().substring(0, 10) },
  });

  const [pengajuanAnggaranOptions, setPengajuanAnggaranOptions] = useState<PengajuanAnggaran[]>([]);
  const [badanUsahaOptions, setBadanUsahaOptions] = useState<WajibPajakBadanUsaha[]>([]);
  const [objekPajakOptions, setObjekPajakOptions] = useState<ObjekPajak[]>([]);
  const [jenisPenghasilanOptions, setJenisPenghasilanOptions] = useState<JenisPenghasilan[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/pengajuan-anggaran')
      .then((response) => response.json())
      .then((data: { status: { code: number; description: string }; result: PengajuanAnggaran[] }) => {
        if (data.status.code === 200) {
          setPengajuanAnggaranOptions(data.result);
        } else {
          console.error('Error fetching data:', data.status.description);
        }
      });

    fetch('http://localhost:3000/api/wajib-pajak-badan-usaha')
      .then((response) => response.json())
      .then((data: { status: { code: number; description: string }; result: WajibPajakBadanUsaha[] }) => {
        if (data.status.code === 200) {
          setBadanUsahaOptions(data.result);
        } else {
          console.error('Error fetching data:', data.status.description);
        }
      });

    fetch('http://localhost:3000/api/jenis-penghasilan-pph23')
      .then((response) => response.json())
      .then((data: { status: { code: number; description: string }; result: JenisPenghasilan[] }) => {
        if (data.status.code === 200) {
          setJenisPenghasilanOptions(data.result);
        } else {
          console.error('Error fetching data:', data.status.description);
        }
      });

    fetch('http://localhost:3000/api/objek-pajak-pph23')
      .then((response) => response.json())
      .then((data: { status: { code: number; description: string }; result: ObjekPajak[] }) => {
        if (data.status.code === 200) {
          setObjekPajakOptions(data.result);
        } else {
          console.error('Error fetching data:', data.status.description);
        }
      });
  }, []);

  const onSubmit = async (data: IPPH3FormSchema) => {
    // could add an additional validation that required to interact with some specific service
    console.log('data submitted', await parsePPH23RawFormToValidPayload(data, 'create'));

    // may include the parsedPayload an util that would send to the service
    // @example  - await sendPPH23FormPayload(parsePPH23RawFormToValidPayload(validData, 'create'))
  };

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          <label className='block'>{getFieldsMetadata.idKegiatanAnggaran.label}</label>
          <span className='text-gray-600 text-xs'>{getFieldsMetadata.idKegiatanAnggaran.subLabel}</span>
          <input {...register(getFieldsMetadata.idKegiatanAnggaran.id)} className='w-full p-2 mt-3 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.noPengajuan.label}</label>
          <select {...register(getFieldsMetadata.noPengajuan.id)} className='w-full p-2 border rounded-md'>
            <option value=''>Select No Pengajuan Anggaran</option>
            {pengajuanAnggaranOptions.map((option) => (
              <option key={option.no_pengajuan} value={option.no_pengajuan}>
                {option.no_pengajuan} - {option.kegiatan}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.noDokumentasi.label}</label>
          <input {...register(getFieldsMetadata.noDokumentasi.id)} className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.jenisDokumentasi.label}</label>
          <select {...register(getFieldsMetadata.jenisDokumentasi.id)} className='w-full p-2 border rounded'>
            <option value=''>Pilih Jenis Dokumen</option>
            {Object.values(JenisDokumenTerkait).map((value) => (
              <option key={value} value={value}>
                {value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label htmlFor='uploadBuktiBayar' className='block mb-2'>
            {getFieldsMetadata.buktiBayar.label}
          </label>
          <input
            type='file'
            {...register(getFieldsMetadata.buktiBayar.id)}
            id='uploadBuktiBayar'
            className='w-full p-2 border rounded-md'
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.pic.label}</label>
          <select {...register(getFieldsMetadata.pic.id)} className='w-full p-2 border rounded-md'>
            <option value=''>Pilih PIC</option>
            {Object.values(PIC).map((value) => (
              <option key={value} value={value}>
                {value.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.badanUsaha.label}</label>
          <select {...register(getFieldsMetadata.badanUsaha.id)} className='w-full p-2 border rounded-md'>
            <option value=''>Select Nama Badan Usaha</option>
            {badanUsahaOptions.map((option) => (
              <option key={option.kode_wpbadan} value={option.kode_wpbadan}>
                {option.nama_badan}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.npwp.label}</label>
          <input
            {...register(getFieldsMetadata.npwp.id)}
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.namaBank.label}</label>
          <input
            {...register(getFieldsMetadata.namaBank.id)}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.noRekening.label}</label>
          <input
            {...register(getFieldsMetadata.noRekening.id)}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.namaRekening.label}</label>
          <input
            {...register(getFieldsMetadata.namaRekening.id)}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.jenisPenghasilan.label}</label>
          <select {...register(getFieldsMetadata.jenisPenghasilan.id)} className='w-full p-2 border rounded-md'>
            <option value=''>Select Jenis Penghasilan</option>
            {jenisPenghasilanOptions.map((option) => (
              <option key={option.kode_jenis_penghasilan} value={option.kode_jenis_penghasilan}>
                {option.jenis_penghasilan}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.objekPajak.label}</label>
          <select {...register(getFieldsMetadata.objekPajak.id)} className='w-full p-2 border rounded-md'>
            <option value=''>Select Nama Badan Usaha</option>
            {objekPajakOptions.map((option) => (
              <option key={option.kode_objek} value={option.kode_objek}>
                {option.objek_pajak}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.bruto.label}</label>
          <input {...register(getFieldsMetadata.bruto.id)} className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.tarifPajak.label}</label>
          <input
            {...register(getFieldsMetadata.tarifPajak.id)}
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            disabled
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.potonganPajak.label}</label>
          <input
            {...register(getFieldsMetadata.potonganPajak.id)}
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.penghasilanDiterima.label}</label>
          <input
            {...register(getFieldsMetadata.penghasilanDiterima.id)}
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='tanggal' className='block mb-2'>
            {getFieldsMetadata.tanggalTransaksi.label}
          </label>
          <input
            {...register(getFieldsMetadata.tanggalTransaksi.id)}
            type='date'
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div className='flex gap-5 justify-start pt-8 text-white '>
          <Link to='/dataKegiatan23'>
            <button className='bg-gray-400 p-2 rounded-mdpx-4 flex gap-1 text-sm' type='button'>
              <TiCancel size={20} className='p-1 text-white' />
              <span>Kembali</span>
            </button>
          </Link>
          <button className='bg-purple p-2 rounded-mdpx-4 flex gap-1 text-sm' type='submit'>
            <IoIosSave size={18} className='p-1' />
            <span>Simpan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormTambahKegiatan;
