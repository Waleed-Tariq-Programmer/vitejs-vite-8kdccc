import React from 'react';
import Input from './Input';

const Search = () => {
  return (
    <div className="h-screen absolute bg-white border-r-2 border-[#DADADA] w-[25%] p-8 rounded-r-lg shadow-md left-[80px]">
      <div className="border-b-2 border-[#DADADA]">
      <h1 className="text-2xl font-medium pb-[40px]">Search</h1>
      <Input  name="Search" type="text" placeholder="Search" className="mb-[30px]"  />
      </div>
    </div>
  );
};

export default Search;
