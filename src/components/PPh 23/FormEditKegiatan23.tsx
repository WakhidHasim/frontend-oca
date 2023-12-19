import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import { useForm } from 'react-hook-form';
import { IPPH3FormSchema, getFieldsMetadata } from './form-fields';
import { parsePPH23RawFormToValidPayload } from './helpers';
import { imageToBase64 } from '../../utils/file';

const FormEditKegiatan23: React.FC = () => {
  const { register, handleSubmit } = useForm<IPPH3FormSchema>({
    defaultValues: {
      idKegiatanAnggaran: 'Lorem Ipsum',
    },
  });

  const onSubmit = async (data: IPPH3FormSchema) => {
    // could add an additional validation that required to interact with some specific service
    console.log('data submitted', await parsePPH23RawFormToValidPayload(data, 'edit'));

    // may include the parsedPayload an util that would send to the service
    // @example  - await sendPPH23FormPayload(parsePPH23RawFormToValidPayload(validData, 'edit'))
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
            <option value='no1'>009765678</option>
            <option value='no2'>008766789</option>
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.noDokumentasi.label}</label>
          <input {...register(getFieldsMetadata.noDokumentasi.id)} className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.jenisDokumentasi.label}</label>
          <select {...register(getFieldsMetadata.jenisDokumentasi.id)} className='w-full p-2 border rounded'>
            <option value='jenis1'>Belum Setor</option>
            <option value='jenis2'>Sudah Setor</option>
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
            <option value='pic1'>PIC 1</option>
            <option value='pic2'>PIC 2</option>
          </select>
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.badanUsaha.label}</label>
          <select {...register(getFieldsMetadata.badanUsaha.id)} className='w-full p-2 border rounded-md'>
            <option value='nama1'>Belum Setor</option>
            <option value='nama2'>Sudah Setor</option>
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
          <label className='block mb-2'>{getFieldsMetadata.objekPajak.label}</label>
          <input {...register(getFieldsMetadata.objekPajak.id)} className='w-full p-2 border rounded-md' />
        </div>
        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.bruto.label}</label>
          <input {...register(getFieldsMetadata.bruto.id)} className='w-full p-2 border rounded-md' />
        </div>
        <div className='mb-5'>
          <label className='block mb-2'>{getFieldsMetadata.tarifPajak.label}</label>
          <input
            {...register(getFieldsMetadata.tarifPajak.id)}
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
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
          <label className='block mb-2'>{getFieldsMetadata.tanggalPotong.label}</label>
          <input
            {...register(getFieldsMetadata.tanggalPotong.id)}
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
            id='tanggal'
            name='tanggal'
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div className='flex gap-5 justify-start pt-8 text-white '>
          <Link to='/dataKegiatan23'>
            <button className='bg-gray-400 p-2 rounded px-4 flex gap-1 text-sm' type='button'>
              <TiCancel size={20} className='p-1 text-white  ' />
              <span>Kembali</span>
            </button>
          </Link>
          <button className='bg-orange p-2 rounded px-4 flex gap-1 text-sm' type='submit'>
            <FaEdit size={18} className='p-1' />
            <span>Simpan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormEditKegiatan23;
