import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  nip?: string;
  idl?: string[];
  nama_satker?: string[];
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/agent/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          password: password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        const token = data.result.access_token;

        try {
          const decodedToken: DecodedToken = jwtDecode(token);

          if (
            decodedToken &&
            decodedToken.idl &&
            decodedToken.idl.length === 1
          ) {
            sessionStorage.setItem('nip', decodedToken.nip || '');
            sessionStorage.setItem('idl', JSON.stringify(decodedToken.idl));
            localStorage.setItem(
              'nama_satker',
              JSON.stringify(decodedToken.nama_satker)
            );

            localStorage.setItem('token', token);
            navigate('/dashboard');
          } else if (
            decodedToken &&
            decodedToken.idl &&
            decodedToken.idl.length > 1
          ) {
            localStorage.setItem('token', token);
            navigate('/verifikasi', { state: decodedToken });
          } else {
            console.error('Authentication failed');
          }
        } catch (decodeError) {
          console.error('Error decoding token:', decodeError);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-5xl md:max-w-6xl p-8 w-full'>
        <div className='relative flex flex-col md:flex-row gap-5 rounded-2xl h-full bg-gray-50  '>
          <div className='text-center items-center p-5 pb-8 md:p-8 flex flex-col justify-center w-full rounded-2xl bg-purple '>
            <img
              src={logo}
              className='w-1/3 max-w-xs md:max-w-none mx-auto mt-16 md:mt-0'
              alt='Login'
            />
            <h1 className='font-semibold text-2xl pt-8 text-white uppercase'>
              One Collecting Agent
            </h1>
            <p className=' text-sm text-white pt-3 '>
              DIREKTORAT PERENCANAAN DAN KEUANGAN
            </p>
            <p className=' text-sm text-white py-2'>
              UNIVERSITAS AMIKOM YOGYAKARTA
            </p>
          </div>
          <div className='p-7 px-7 py-16  w-full bg-gray-50 rounded-2xl flex flex-col justify-center pr-10'>
            <h1 className='text-center text-xl pb-7 font-semibold'>LOGIN</h1>
            <form onSubmit={handleLogin}>
              <div className='pb-4 w-full'>
                <label className='block text-gray-700'>NIK</label>
                <input
                  type='text'
                  id='nik'
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className='w-full border-b border-gray-300 bg-transparent rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                  placeholder='Enter your NIK'
                />
              </div>
              <div className='pb-10'>
                <label className='block text-gray-700'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full border-b border-gray-300 bg-transparent rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                  placeholder='Enter your password'
                />
              </div>
              <button
                type='submit'
                className='w-full bg-orange text-white py-2 rounded-md hover:bg-purple'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
