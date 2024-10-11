import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../Firebase/firebase';
import { doc, setDoc , serverTimestamp } from 'firebase/firestore';

const CreateModal = ({ handle, showCreate }) => {
  const currentUser = useSelector((state) => state.auth.currentusers);
  const [create, setCreate] = useState({
    post: null,
    content: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'post') {
      setCreate((pervValue) => {
        return { ...pervValue, [name]: files[0] };
      });
    } else {
      setCreate((pervValue) => {
        return { ...pervValue, [name]: value };
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storage = getStorage();
      const postcontent = ref(storage, `post/${currentUser.id}/${create.post.name}`);
      
      await uploadBytes(postcontent, create.post);
      console.log('Post submitted to storage');

      const posturl = await getDownloadURL(postcontent);
      console.log('Post URL: ', posturl);
      
      const date = new Date();

      const postDetail = {
        id: currentUser.id,
        post: posturl,
        name: currentUser.Username,
        profile: currentUser.image,
        content: create.content,
        date: date.toDateString(),
        createdAt : serverTimestamp(),
        like: [],
        comment: [],
      };
      console.log('Post Details: ', postDetail);
      
      const postRef = doc(db, "posts", `${currentUser.id}_${Date.now()}`);
      await setDoc(postRef, postDetail);
      console.log('Post details saved to Firestore');
      
      setCreate({
        post: null,
        content: '',
      });
      
      handle();
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <form
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg w-full max-w-md shadow-md border-2 border-[#DADADA] transition-all duration-300 h-[500px] flex items-center justify-center flex-col gap-[50px] p-[20px] ${
        showCreate ? 'block' : 'hidden'
      }`}
      onSubmit={handleSubmit}
    >
      <RxCross1
        className="absolute top-0 right-0 text-xl m-[10px] cursor-pointer"
        onClick={handle}
      />
      <div className="text-center">
        <label
          className="block text-[black] font-semibold mb-2"
          htmlFor="profileImage"
        >
          Create a post
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/* ,  video/*"
          name="post"
          className="w-full px-[20%] py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
          onChange={handleChange}
        />
        <small className="text-gray-500">
          Select an image from your computer
        </small>
      </div>
      <textarea
        id="story"
        name="content"
        rows="15"
        cols="45"
        className="border-2 border-[#DADADA] rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-[20px]"
        value={create.content}
        onChange={handleChange}
      >
        Say Something...
      </textarea>
      <button
        className="w-full mt-6 bg-[#1877F2] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
        type="submit"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreateModal;
