import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaDatabase, FaUserFriends } from 'react-icons/fa';
import { MdOutlineAppRegistration, MdDomainVerification } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiFillDashboard } from 'react-icons/ai';
import { BsBank } from 'react-icons/bs';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  nip?: string;
  idl?: string[];
  nama_pegawai?: string;
  nama_satker?: string[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [agentName, setAgentName] = useState<string | null>(null);
  const [satkerName, setSatkerName] = useState<string[] | null>(null);

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
    setIsDropdownOpen2(false);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsDropdownOpen1(false);
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    setSelectedMenu(location.pathname);

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setAgentName(decodedToken.nama_pegawai || '');
      setSatkerName(
        decodedToken.nama_satker || [] || location.state?.selectedSatker || null
      );
    }
  }, [location]);

  return (
    <div className='w-1/2 md:w-1/3 lg:w-64 xl:w-64 pt-28 fixed md:top-0 md:left-0 min-h-screen lg:block bg-white z-30 transition duration-500 ease-in-out'>
      <div className=''>
        <div className='flex px-5 justify-center items-center gap-5 mb-4'>
          <FaUserCircle size={45} />
          <div className='w-full mx-auto flex flex-col justify-end'>
            <p className='text-sm font-semibold'>{agentName}</p>
            <span className='text-xs'>Agent</span>
          </div>
        </div>

        {satkerName && satkerName.length === 1 ? (
          <div className='mt-2 py-2 px-3 rounded-lg'>
            <p className='text-xs px-3'>{satkerName}</p>
          </div>
        ) : (
          satkerName &&
          satkerName.length > 1 && (
            <div className='bg-gray-100 text-gray-800 rounded-sm border-b px-3 mb-4 w-full mx-auto'>
              <button onClick={toggleDropdown1} className='flex w-full py-2'>
                <span className='text-xs'>Satuan Kerja</span>
                <IoMdArrowDropdown
                  className={`h-5 w-5 transition-transform duration-300 transform ${
                    isDropdownOpen1 ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen1 && (
                <div className='mt-2 py-2 px-3 rounded-lg'>
                  {satkerName.map((item, index) => (
                    <p
                      key={index}
                      className={`cursor-pointer ${
                        selectedMenu === 'dropdown1'
                          ? 'hover:text-white'
                          : 'hover:text-blue-500'
                      } text-xs`}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {/* menu */}
        <div className='text-gray-800 '>
          <Link to='/dashboard'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu === '/dashboard'
                  ? 'bg-purple text-white'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/dashboard')}
            >
              <AiFillDashboard size={16} />
              <span
                className={`font-medium pl-2 text-xs md:text-sm ${
                  selectedMenu === '/dashboard' ? 'text-white' : ''
                }`}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link to='/dataKegiatan21'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu === '/dataKegiatan21'
                  ? 'bg-purple text-white'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/dataKegiatan21')}
            >
              <FaDatabase size={16} />
              <span
                className={`font-medium pl-2 text-xs md:text-sm ${
                  selectedMenu === '/dataKegiatan21' ? 'text-white' : ''
                }`}
              >
                PPh 21
              </span>
            </div>
          </Link>

          <Link to='/dataKegiatan23'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu === '/dataKegiatan23'
                  ? 'bg-purple text-white'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/dataKegiatan23')}
            >
              <BsBank size={16} />
              <span
                className={`font-medium pl-2 text-xs md:text-sm ${
                  selectedMenu === '/dataKegiatan23' ? 'text-white' : ''
                }`}
              >
                PPh 23
              </span>
            </div>
          </Link>

          <Link to='/kegiatanPPh4'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu === '/kegiatanPPh4'
                  ? 'bg-purple text-white'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/kegiatanPPh4')}
            >
              <HiOutlineBuildingOffice2 size={16} />
              <span
                className={`font-medium pl-2 text-xs md:text-sm ${
                  selectedMenu === '/kegiatanPPh4' ? 'text-white' : ''
                }`}
              >
                PPh 4 ayat 2
              </span>
            </div>
          </Link>

          <Link to='/inventaris'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu === '/inventaris'
                  ? 'bg-purple text-white'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/inventaris')}
            >
              <MdOutlineAppRegistration size={16} />
              <span
                className={`font-medium pl-2 text-xs md:text-sm ${
                  selectedMenu === '/inventaris' ? 'text-white' : ''
                }`}
              >
                Inventarisasi Pajak
              </span>
            </div>
          </Link>
        </div>

        {/* Dropdown 2 */}
        <div className='text-gray-800'>
          <div className='w-full px-4 pl-8'>
            <button
              onClick={toggleDropdown2}
              className={`flex gap-4 h-10 items-center justify-start hover:bg-gray-30 rounded-lg cursor-pointer   ${
                selectedMenu === 'dropdown2' ? 'bg-purple text-white' : ''
              }`}
            >
              <FaUserFriends size={16} />
              <span
                className={`font-medium pl-2 text-xs md:text-sm ${
                  selectedMenu === 'dropdown2' ? 'text-white' : ''
                }`}
              >
                Registrasi WP
              </span>
              <IoMdArrowDropdown
                className={`h-5 w-5 transition-transform duration-300 transform ${
                  isDropdownOpen2 ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isDropdownOpen2 && (
              <div className='pt-2 pl-6 rounded-lg w-full'>
                <ul className='list-disc'>
                  <li
                    className={`cursor-pointer ${
                      selectedMenu === 'dropdown2'
                        ? 'hover:text-white'
                        : 'hover:text-purple'
                    } text-xs md:text-sm`}
                  >
                    <Link to='/dataWPOP'> Wajib Pajak Orang Pribadi</Link>
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectedMenu === 'dropdown2'
                        ? 'hover:text-white'
                        : 'hover:text-purple'
                    } pt-3 text-xs md:text-sm py-2`}
                  >
                    <Link to='/dataWPBU'>Wajib Pajak Badan Usaha</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <Link to='/verifikasiWPOP'>
          <div
            className={`w-full flex gap-4 items-center  h-10 px-8 ${
              selectedMenu === '/verifikasiWPOP'
                ? 'bg-purple text-white'
                : 'hover:bg-gray-30'
            } cursor-pointer`}
            onClick={() => handleMenuClick('/verifikasiWPOP')}
          >
            <MdDomainVerification size={16} />
            <span
              className={`font-medium pl-2 text-xs md:text-sm ${
                selectedMenu === '/verifikasiWPOP' ? 'text-white' : ''
              }`}
            >
              Verifikasi WPOP
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
