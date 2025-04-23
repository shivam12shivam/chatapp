import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Signin Data:', data);
    try {
      const res = await axios.post("http://localhost:3000/user/signin", data);
      if (res.data && res.data._id) {
        console.log(res.data);
        dispatch(setUser(res.data)); // Save user to Redux
        navigate("/");               // ✅ Redirect to homepage
      }
      
      else {
        console.log("user does not exist or password or email is wrong");
        return;
      }
      
    } catch (error) {
      console.log(error);
      console.log("error in signin form - frontend");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Signin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
          {...register("password", { required: "Password is required" })}
          className="w-full border px-3 py-2"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signin;
