import React from 'react';

const Sidebar = () => {
  const suggestedAccounts = [
    { name: 'Tina Albert', username: 'tinaAlbert456', img: 'post.jpeg' },
    { name: 'John Doe', username: 'johnDoe123', img: 'post.jpeg' },
    { name: 'Jane Smith', username: 'janeSmith789', img: 'post.jpeg' },
    { name: 'Michael Brown', username: 'michaelBrown456', img: 'post.jpeg' },
  ];

  return (
    <div className="w-[400px] h-full pt-[50px] flex flex-col gap-[30px]">
      <div className="login_Account">
        <div className="flex items-center gap-[20px]">
          <div className="w-[50px] h-[50px] rounded-full">
            <img
              src="post.jpeg"
              className="w-full h-full rounded-full object-cover"
              alt="Profile"
            />
          </div>
          <div>
            <p className="text-[#000000] text-sm">Tina Albert</p>
            <p className="text-[#737373] text-sm">tinaAlbert456</p>
          </div>
        </div>
      </div>

      <div className="Suggested_Account flex flex-col gap-[20px]">
        <h3 className="text-[#737373] text-sm">Suggested for you</h3>
        {suggestedAccounts.map((account, index) => (
          <div key={index} className="flex items-center gap-[20px]">
            <div className="w-[50px] h-[50px] rounded-full">
              <img
                src={account.img}
                className="w-full h-full rounded-full object-cover"
                alt="Profile"
              />
            </div>
            <div>
              <p className="text-[#000000] text-sm">{account.name}</p>
              <p className="text-[#737373] text-sm">Suggested for you</p>
            </div>
            <button className="text-[#0095F6] text-xs font-semibold">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
