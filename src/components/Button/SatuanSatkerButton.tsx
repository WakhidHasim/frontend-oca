import React from 'react';
import { FaUser } from 'react-icons/fa';

interface SatuanSatkerButtonProps {
  text: string;
  onClick: () => void;
}

const SatuanSatkerButton: React.FC<SatuanSatkerButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      className='flex gap-5 bg-purple hover:bg-[#FFAC00] p-2 px-8 rounded-md text-white w-full'
      onClick={onClick}
    >
      <FaUser sixe={20} />
      <span className='uppercase text-xs md:text-sm'>{text}</span>
    </button>
  );
};

export default SatuanSatkerButton;
