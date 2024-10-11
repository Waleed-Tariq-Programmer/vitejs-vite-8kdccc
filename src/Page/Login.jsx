import React, { useState } from 'react';
import Input from '../Component/Input';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore"; 
import { useDispatch } from 'react-redux';
import { setUser } from "../Feature/authSlice.js";
import swal from 'sweetalert'; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue, 
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    
    if (!email || !password) {
      swal({
        title: "Missing Fields!",
        text: "Please fill in all fields before logging in.",
        icon: "warning",
        button: "Got it!",
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userRef = doc(db, "User", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userDetail = userDoc.data();  
        dispatch(setUser(userDetail)); 
        navigate("/home"); 
      } else {
        console.log("No such user document!");
      }

    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          swal({
            title: "Account Not Found!",
            text: "No account found with the provided email.",
            icon: "error",
            button: "Try again!",
          });
          break;
        case 'auth/wrong-password':
          swal({
            title: "Incorrect Password!",
            text: "The password you entered is incorrect.",
            icon: "error",
            button: "Try again!",
          });
          break;
        case 'auth/invalid-email':
          swal({
            title: "Invalid Email!",
            text: "The email format is invalid.",
            icon: "error",
            button: "Try again!",
          });
          break;
        default:
          swal({
            title: "Login Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            button: "Try again!",
          });
      }
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <img src="logo.png" alt="logo" className="mx-auto w-[50%]" />
          <p className="text-gray-600 mt-4">Log in to see photos and videos from your friends.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input 
            type="email" 
            placeholder="Enter your email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <Input 
            type="password" 
            placeholder="Enter your password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
          <button
            className="w-full mt-6 bg-[#1877F2] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center justify-between">
          <p className="text-gray-600 mt-4">Don't have an account?</p>
          <button 
            className="mt-4 text-[#1877F2]" 
            onClick={() => navigate("/sign")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
