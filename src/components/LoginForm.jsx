import React,{useContext,useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../Usercontext';
import { Link } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate()
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const [serverResponse,setServerResponse] = useState('');
    const [isSubmitting , setIsSubmitting] = useState(false)
    const [error, setError] = useState(false)
    const {user,setUser} = useContext(UserContext)

    // This function will be triggered when the form is successfully submitted
    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('https://evangadiforum-backend-ovy7.onrender.com/users/login', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            });

            if (!response.ok) {
                setError(true)
                const errorResult = await response.json()
                
                setServerResponse(errorResult?.msg)
                console.log(serverResponse)

                return
            }

            const result = await response.json();  

            setUser(result.username)
            localStorage.setItem('token',result.token);
            
            setServerResponse(result.msg)
            console.log(result)
            setError(false)

        } catch (error) {
            console.log(error.message)
            setError(true)
            setServerResponse("Something went wrong. Please try agian later.")
        } finally {
            setIsSubmitting(false)
            reset()
        }
    };
    
    useEffect(()=>{
        if(serverResponse){
            setTimeout(()=>{
                setServerResponse('')
                if(!error){
                    navigate('/questions')
                }
            }
            ,2000)
        }
    },[serverResponse,error,navigate])
    return (
        <div className='flex flex-col items-center pt-8 pb-16 px-8 text-center'>
            <h3 className='text-lg font-semibold'>Join the network</h3>
            <p className='text-gray-700'>
                Don't have an account?
                <Link to={'/users/register'}>
                    <span className='text-orange-600'>{' '}Register</span>
                </Link> 
            </p>
            <p className={`transition-opacity duration-200 ease-in-out ${error?`text-red-600`:`text-green-600` } ${serverResponse?`opacity-100 translate-y-4`:`opacity-0` }`}>{serverResponse}</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-8 w-full'>
                <input
                    className={`p-2 border rounded-sm focus:outline-none focus:border-orange-500 ${errors.email ? 'border-red-600' : ''}`}
                    {...register('email', {
                        required: "Email is required.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    })}
                    placeholder='Email address'
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                <input
                    className={`p-2 border rounded-sm focus:outline-none focus:border-orange-500 ${errors.password ? 'border-red-600' : ''}`}
                    {...register("password", {
                        required: "Password is required."
                    })}
                    type="password"
                    placeholder='Password'
                />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                <p className='my-4 text-orange-500 ms-auto'>Forgot password?</p>
                <button 
                    type='submit' 
                    className={`${isSubmitting ? `bg-blue-600` : `bg-blue-800`}  py-2 rounded-md text-white`} 
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? `Submitting` : `Login`}
                </button>

            </form>
        </div>
    );
}

export default LoginForm;
