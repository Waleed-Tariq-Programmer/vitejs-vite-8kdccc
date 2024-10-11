import React from 'react';

const Profile = () => {
  return (
    <div className="pt-[70px] pl-[100px] pr-[100px]">
      <div className="header flex gap-[50px] pb-[50px]">
        <div className="w-[200px] h-[200px] rounded-full">
          <img src="post.jpeg" className="w-full h-full rounded-full object-cover" />
        </div>
        <div className='flex flex-col items-start justify-center gap-[20px]'>
          <div className='flex items-center gap-[20px]'>
            <h1 className="text-xl">Waleed Tariq</h1>
            <button className="bg-[#DBDBDB] py-[7px] px-[16px] text-sm rounded-lg">Edit Profile</button>
            <button className="bg-[#DBDBDB] py-[7px] px-[16px] text-sm rounded-lg">Message</button>
            <button className="bg-[#DBDBDB] py-[7px] px-[16px] text-sm rounded-lg">
              <img src="follower.svg" />
            </button>
          </div>
          <div className='flex gap-[20px]'>
            <p>1 Post</p>
            <p>2 Follower</p>
            <p>2 Following</p>
          </div>
          <p>waleed tariq</p>
        </div>
      </div>

      <div className="post grid grid-cols-3 gap-4">
        <div className='w-full h-[350px]'>
          <img src="post.jpeg" className="w-full h-full object-cover" />
        </div>
        <div className='w-full h-[350px]'>
          <img src="post.jpeg" className="w-full h-full object-cover" />
        </div>
        <div className='w-full h-[350px]'>
          <img src="post.jpeg" className="w-full h-full object-cover" />
        </div>
        <div className='w-full h-[350px]'>
          <img src="post.jpeg" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
