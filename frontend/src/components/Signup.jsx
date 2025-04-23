import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Signup Data:', data);
    try {
      const res = await axios.post("http://localhost:3000/user/signup", data);
      console.log("asas");
      
      console.log(res.data);
      if (res.data.name) {
        console.log("signup successful");
        dispatch(setUser(res.data));
      }
      else {
        return console.log("user already exist");
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      console.log("error in signup form - frontend");
    }

  };

  const password = watch('password', '');

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full border px-3 py-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border px-3 py-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters required" },
          })}
          className="w-full border px-3 py-2"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirm_Password"
          {...register("confirm_password", {
            required: "Please confirm your password",
            validate: value => value === password || "Passwords do not match"
          })}
          className="w-full border px-3 py-2"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
