import React from 'react';

const Input = ({ name, type, placeholder, value, onChange , className }) => {
  return (
    <div className="mb-4">
  
      <input
        className={`w-full px-2 py-2 border bg-[#EFEFEF] rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        name = {name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
