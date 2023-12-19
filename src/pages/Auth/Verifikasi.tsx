import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import SatuanSatkerButton from '../../components/Button/SatuanSatkerButton';

const Verifikasi: React.FC = () => {
  const navigate = useNavigate();

  const [agentName, setAgentName] = useState<string | null>(null);
  const [namaSatker, setNamaSatker] = useState<string[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { nama_pegawai, nama_satker } = JSON.parse(
        atob(token.split('.')[1])
      );

      setAgentName(nama_pegawai || null);
      setNamaSatker(Array.isArray(nama_satker) ? nama_satker : [nama_satker]);
    }
  }, []);

  const handleSatkerSelection = () => {
    if (namaSatker && namaSatker.length > 0) {
      navigate('/dashboard', { state: { selectedSatker: namaSatker[0] } });
    }
  };

  const buttonData = namaSatker || [];

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
      <div className='max-w-4xl md:max-w-5xl p-8 w-full'>
        <div className='relative flex flex-col md:flex-row gap-10'>
          <div className='text-center items-center bg-slate-50 p-8 flex flex-col justify-center w-full rounded-2xl py-16'>
            <div className='py-6 text-center'>
              <div className='flex gap-4 items-center justify-center'>
                <div className='w-12 lg:w-26 drop-shadow-md'>
                  <img src={logo} className='w-full' alt='Login' />
                </div>
                <h1 className='font-bold text-lg md:text-2xl py-2 pb-3 uppercase drop-shadow-md'>
                  One Collecting Agent (OCA)
                </h1>
              </div>
              <h2 className='font-medium text-base lg:text-lg pb-6'>
                {agentName}
              </h2>
              <p className='text-sm text-slate-500 uppercase'>
                Pilih Satuan Kerja{' '}
              </p>
              <div className='pt-3 space-y-4 justify-start flex items-center flex-col'>
                {buttonData.map((text, index) => (
                  <SatuanSatkerButton
                    key={index}
                    text={text}
                    onClick={() => handleSatkerSelection()}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifikasi;
