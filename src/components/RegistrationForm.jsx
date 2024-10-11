import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors} ,reset} = useForm();
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [serverResponse,setServerResponse] = useState('');
  const [error, setError] = useState(false)


//Submiting form data
  const onSubmit =async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('https://evangadiforum-backend-ovy7.onrender.com/users/register',{
       method: 'POST',
       headers: {
        'Content-Type':'application/json'
       },
       body:JSON.stringify(data)
      })

      if (!response.ok){
        const errorResult = await response.json();
        setError(true)
        setServerResponse(errorResult?.msg || 'Registration failed. Please try again.')
        return;
      } 

      const result = await response.json()
      setServerResponse(result.msg)
      setError(false)
      
    } catch (error) {
      console.log(error)
      setError(true)
      setServerResponse("Something went wrong. Please try agian later.")
    } finally{
      setIsSubmitting(false)
      if (!error) reset();
    }
  };


// Error popup 
useEffect(() => {
  if (serverResponse) {
    const timer = setTimeout(() => {
      setServerResponse('');
      if (!error) {
        navigate('/users/login');
      }
    }, 2000);
    
    return () => clearTimeout(timer);   
  }
}, [serverResponse, error, navigate]);



  return (
    <div className='flex flex-col items-center pt-8 pb-16 px-8 text-center'>
      <h3 className='text-lg font-semibold'>Join the network</h3>
      <p className='text-gray-700'>
        Already have an account?{' '} 
        <Link to={'/users/login'}>
            <span className='text-orange-600'>{' '}Sign in</span>
        </Link> 
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-8 w-full'>
        {/* Username Field */}
        <p className={`transition-opacity duration-200 ease-in-out ${error?`text-red-600`:`text-green-600` } ${serverResponse?`opacity-100 `:`opacity-0` }`}>{serverResponse}</p>
        <div className='w-full'>
          <input
            className={`p-2 w-full border rounded-sm ${
              errors.username ? 'border-red-600' : 'border-gray-300'
            } focus:outline-none focus:border-orange-500`}
            autocomplete="off" 
            type='text'
            placeholder='Username'
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 4,
                message: 'Username must be at least 4 characters long',
              },
            })}
          />
          {errors.username && (
            <p className='text-red-600 text-sm mt-1'>{errors.username.message}</p>
          )}
        </div>

        {/* First and Last Name Fields */}
        <div className='flex gap-2 w-full'>
          <input
            className='p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-orange-500'
            type='text'
            placeholder='First name'
            {...register('firstname',{
              required: 'First name is required',
            })}
          />
          <input
            className='p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-orange-500'
            type='text'
            placeholder='Last name'
            {...register('lastname',{
              required: 'Last name is required',
            })}
          />
          
        </div>
        {(errors.firstname || errors.lastname)  && (
            <p className='text-red-600 text-sm mt-[-12px]'>Full name is required.</p>
          )}

        {/* Email Field */}
        <div className='w-full'>
          <input
            className={`p-2 w-full border rounded-sm ${
              errors.email ? 'border-red-600' : 'border-gray-300'
            } focus:outline-none focus:border-orange-500`}
            type='text'
            placeholder='Email address'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className='w-full'>
          <input
            className={`p-2 w-full border rounded-sm ${
              errors.password ? 'border-red-600' : 'border-gray-300'
            } focus:outline-none focus:border-orange-500`}
            type='password'
            autocomplete="off" 
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
          />
          {errors.password && (
            <p className='text-red-600 text-sm mt-1'>{errors.password.message}</p>
          )}
        </div>

        <p className='my-4'>
          I agree to the <span className='text-orange-600 underline'>privacy policy</span> and <span className='text-orange-600 underline'>terms of service</span>
        </p>
        <button type='submit' className={`${isSubmitting?`bg-blue-600`:`bg-blue-800`}  py-2 rounded-md text-white `} disabled={isSubmitting}>
          {isSubmitting?`Submitting`:`Agree and Join`}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
