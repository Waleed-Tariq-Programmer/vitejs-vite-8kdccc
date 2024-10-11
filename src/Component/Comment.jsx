import React from 'react';
import Input from './Input';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';
const Comment = ({ account }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="w-[90vw] h-[90vh] bg-[#FFFFFF] text-black flex overflow-hidden shadow-lg">
        <div className="image h-full w-[55%]">
          <img
            src="post.jpeg"
            className="w-full h-full object-cover"
            alt="Post"
          />
        </div>

        <div className="comment h-full w-[45%] ">
          <div className="flex items-center justify-between mb-4 border-b py-[10px] px-[10px] border-[#ddd]">
            <div className="flex items-center">
              <div className="w-[40px] h-[40px] rounded-full mr-4">
                <img
                  src="post.jpeg"
                  className="w-full h-full rounded-full object-cover"
                  alt="Profile"
                />
              </div>

              <div>
                <p className="text-black text-sm font-semibold">
                  {account?.name || 'User Name'}
                </p>
                <button className="text-[#0095F6] text-xs font-semibold">
                  Follow
                </button>
              </div>
            </div>
          </div>

          
           <div className="overflow-auto h-[60%] px-[10px] ">
           <div className="flex items-center">
              <div className="w-[40px] h-[40px] rounded-full mr-4">
                <img
                  src="post.jpeg"
                  className="w-full h-full rounded-full object-cover"
                  alt="Profile"
                />
              </div>

              <div className=' flex flex-col items-center	gap-[20px]'>
                <p className="text-black text-sm font-semibold">
                  {account?.name || 'User Name'}
                </p>
                <p className='block'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dicta exercitationem possimus dolores fuga incidunt quidem, enim eius soluta culpa accusamus officiis praesentium.</p>
              </div>
            </div>
            
          </div>

          <div className="border-t border-b border-[#ddd] p-[10px]">
            <div className="my-[10px] flex gap-[15px]">
              <button>
                <FaRegHeart className="w-[24px] h-[24px]" />
              </button>
              <button>
                <FaRegComment className="w-[24px] h-[24px]" />
              </button>
            </div>
            <p className="text-sm my-[10px]">10000 Likes</p>
            <p className="text-xs text-[#737373]">14 hours</p>
          </div>

          <div>
            <Input
              type="text"
              placeholder="Add your Comment"
              name="comment"
              className="bg-transparent rounded-none focus:outline-none focus:ring-0 focus:border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
