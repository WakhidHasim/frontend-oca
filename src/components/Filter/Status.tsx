import React, { useState } from 'react';
// import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

const Status: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const statusOptions: OptionType[] = [
    { value: 'status', label: 'status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleChange = (selectedOption: OptionType | null) => {
    setSelectedOption(selectedOption);
  };

  // return (
  //   <div className='items-center sm:mb-0 mr-2 text-xs'>
  //     <Select
  //       value={selectedOption}
  //       onChange={handleChange}
  //       options={statusOptions}
  //       placeholder='Select Status'
  //       className='rounded'
  //     />
  //   </div>
  // );
};

export default Status;
