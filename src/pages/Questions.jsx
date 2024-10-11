import React, {useContext, useEffect, useState} from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { UserContext } from '../Usercontext';

function Questions() {
const [questions , setQuestions] = useState()
const {user} = useContext(UserContext)
const token = localStorage.getItem('token'); 


  const fetchQuestions = async ()=>{
    try {
        
        const response =  await fetch('http://localhost:5500/questions/all',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }
        );
        const data = await response.json();
        setQuestions(data.response)
    } catch (error) {
     console.log(error)   
    }
  }

  useEffect( ()=>{fetchQuestions()},[])
  return (
    <div>
        <div className='flex justify-between py-12 mx-8 md:px-12 lg:mx-[20%]  border-b-2'>
            <Link to={'/questions/ask'}>
                <button className='bg-blue-600 text-sm py-2 px-8 rounded-md text-white font-medium' >Ask Question</button>
            </Link>
            <p>Wellcome: <span className='font-semibold'>{user}</span></p>
        </div>

        <div className='px-8 md:px-32 lg:px-[25%]'>
            {
                questions?.map((question)=>{
                    const {username,title,questionid} = question
                    return (
                       <Link to={`/answers/questions/${questionid}/answers`}>
                            <div key={questionid} className='flex gap-4 justify-between  py-8 items-center   border-b-2'>
                                <div className='flex flex-col gap-2 items-center'>
                                    <div className='h-10 w-10 border-2 rounded-full'>
                                        <AccountCircleIcon  style={{ height: '100%', width:"100%" }} />
                                    </div>
                                    <p className='text-sm'>{username}</p>
                                </div>
                                <div className='text-start flex-1'>
                                    {title}
                                </div>
                                <div>
                                    <ChevronRightIcon />
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
         
    </div>
  )
}

export default Questions