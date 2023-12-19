import React, { useState, useEffect } from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../components/Button/ButtonTabel';
import DateRange from '../../components/Filter/DateRange';
import SearchBar from '../../components/Search/SearchBar';
import { FaEdit } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface ApiDataItem {
  kode_kegiatan_badan: string;
  tanggal_transaksi: string;
  uraian_kegiatan: string;
  id_kegiatan_anggaran: string;
  kode_jenis_penghasilan: number;
  kode_jenis_pajak: number;
  kode_wp_badan: string;
  penghasilan_bruto: number;
  kode_objek: string;
  tarif_pajak: number;
  potongan_pajak: number;
  penghasilan_diterima: number;
  tanggal_potong_pph: string;
  no_rekening: string;
  nama_rekening: string;
  narahubung: string;
  jenis_dokumen_terkait: string;
  no_dokumen_referensi: string;
  file_bukti_potong: string;
  status: string;
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

const DataKegiatan23: React.FC = () => {
  const [apiData, setApiData] = useState<ApiDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [badanUsahaOptions, setBadanUsahaOptions] = useState<
    WajibPajakBadanUsaha[]
  >([]);

  const mapKodeWPToNamaBadan = (kode_wp_badan: string) => {
    const badanUsaha = badanUsahaOptions.find(
      (usaha) => usaha.kode_wpbadan === kode_wp_badan
    );
    return badanUsaha ? badanUsaha.nama_badan : 'Nama Badan Not Found';
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/kegiatan-penghasilan-badan/pph23'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setApiData(data.result);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

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
  }, []);

  const formatIndonesianDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  const handleDelete = async (kode_kegiatan_badan: string) => {
    const url = `http://localhost:3000/api/kegiatan-penghasilan-badan/pph23/${kode_kegiatan_badan}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error deleting data: ${response.status}`);
      }

      fetchData();
      alert(`Data dengan id ${kode_kegiatan_badan} berhasil dihapus.`);
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  const ActionsButtons: React.FC<{ kode_kegiatan_badan: string }> = ({
    kode_kegiatan_badan,
  }) => (
    <div className='flex space-x-2 items-center justify-center text-white'>
      <Link to={`/editKegiatan23/${kode_kegiatan_badan}`}>
        <button className='bg-orange p-2 flex gap-1 rounded'>
          <FaEdit size={17} className='' />
          <span>Edit</span>
        </button>
      </Link>
      <button
        className='bg-red-600 p-2 flex gap-1 rounded'
        onClick={() => handleDelete(kode_kegiatan_badan)}
      >
        <RiDeleteBin6Fill size={17} className='' />
        <span>Delete</span>
      </button>
    </div>
  );

  const columns = [
    'No',
    'Tanggal Transaksi',
    'Uraian Kegiatan',
    'Nama Badan Usaha',
    'Penghasilan Bruto',
    'Aksi',
  ];

  return (
    <div className='pl-4 lg:pl-60 xl:pl-64 xl:p-10 pt-24 xl:pt-28 w-full min-h-screen relative'>
      <div className='rounded-xl px-7'>
        <div className='font-semibold my-3 pl-3 pb-4'>
          <h1 className='text-lg xl:text-2xl py-2'>Data Kegiatan 23</h1>
          <ol className='list-none inline-flex text-xs md:text-sm'>
            <Link to='/dataKegiatan23'>
              <li className='flex items-center text-purple'>
                <p className='text-gray-800'>PPh 23</p>
                <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
              </li>
            </Link>

            <Link to='/dataKegiatan23'>
              <li className='flex items-center'>
                <p className='text-gray-800'>Data Kegiatan PPh 23</p>
              </li>
            </Link>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className='w-full mx-auto p-5 rounded'>
            <div className='flex flex-col md:flex-row py-3 justify-between'>
              <div className='flex md:flex-row flex-col items-center'>
                <Link to='/tambahKegiatan23'>
                  <ButtonTabel text='Tambah Data' icon={<FaPlus size={16} />} />
                </Link>
              </div>
              <div className='flex md:flex-row flex-col items-center'>
                <div className='flex justify-end'>
                  <DateRange />
                  <SearchBar />
                </div>
              </div>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <TabelData
                columns={columns}
                data={apiData.map((item, index) => ({
                  id: index + 1,
                  col1: formatIndonesianDate(item.tanggal_transaksi),
                  col2: item.uraian_kegiatan,
                  col3: mapKodeWPToNamaBadan(item.kode_wp_badan),
                  col4: item.penghasilan_bruto.toString(),
                  col5: (
                    <ActionsButtons
                      kode_kegiatan_badan={item.kode_kegiatan_badan}
                    />
                  ),
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataKegiatan23;
