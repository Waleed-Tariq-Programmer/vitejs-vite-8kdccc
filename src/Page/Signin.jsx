import React, { useState } from 'react';
import Input from '../Component/Input';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../Firebase/firebase"
import { getStorage, ref , uploadBytes , getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import swal from 'sweetalert';


const Signin = () => {
  const [formData , setFormData] = useState({
    name: "",
    Username : "",
    email : "",
    password : "",
    image : null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if(name === "image"){
      setFormData((prevData) => {
        return { ...prevData, [name]: files[0] };
      });
    }
    else{
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, Username, email, password, image } = formData;
    if (!name || !Username || !email || !password || !image) {
        swal({
            title: "Missing Fields!",
            text: "Please fill in all fields before signing up.",
            icon: "warning",
            button: "Got it!",
        });
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        const storage = getStorage();
        const storageRef = ref(storage, `user-images/${user.uid}/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        const userDetail = {
            id: user.uid,
            name: name,
            Username: Username,
            email: user.email,
            image: imageUrl,
            password : password,
            follower : [],
            follwing : [],
        };
        await setDoc(doc(db, "User", user.uid), userDetail);

        swal({
            title: "Account Created Successfully!",
            text: "Welcome to the platform, " + name + "! You can now log in.",
            icon: "success",
            button: "Continue",
        });

        setFormData({
            name: "",
            Username: "",
            email: "",
            password: "",
            image: null,
        });
    } catch (error) {
        let errorMessage;

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "This email is already in use. Please use a different email.";
                break;
            case 'auth/weak-password':
                errorMessage = "Password should be at least 6 characters";
                break;
            case 'auth/invalid-email':
                errorMessage = "The email address is not valid. Please enter a valid email.";
                break;
            default:
                errorMessage = "There was an error creating your account. Please try again.";
        }

        swal({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            button: "Retry",
        });
    }
};

  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <img src="logo.png" alt="logo" className="mx-auto w-[50%]" />
          <p className="text-gray-600 mt-4">Sign up to see photos and videos from your friends.</p>
        </div>

      <form onSubmit={handleSubmit}>
        <Input  type="text" placeholder="Enter your full name" name="name" value={formData.name} onChange={handleChange}/>

        <Input  type="text" placeholder="Choose a username" name="Username" value={formData.Username} onChange={handleChange}/>

        <Input  type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange}/>

        <Input  type="password" placeholder="Create a password" name="password" value={formData.password} onChange={handleChange} />

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="profileImage">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            name = "image"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
          />
          <small className="text-gray-500">Select an image from your computer</small>
        </div>

        <button
          className="w-full mt-6 bg-[#1877F2] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
          type="submit"
        >
          Sign Up
        </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
