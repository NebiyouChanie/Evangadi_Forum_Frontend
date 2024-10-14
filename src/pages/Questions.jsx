import React, { useContext, useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { UserContext } from '../Usercontext';

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true); // Set loading to true before the fetch
            try {
                const response = await fetch('https://evangadiforum-backend-ovy7.onrender.com/questions/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data.response || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);  
            }
        };

        fetchQuestions();  
    }, [token]); 

    return (
        <div className='flex-grow'>
            <div className='flex justify-between py-12 mx-8 md:px-12 lg:mx-[20%] border-b-2'>
                <Link to={'/questions/ask'}>
                    <button className='bg-blue-600 text-sm py-2 px-8 rounded-md text-white font-medium'>
                        Ask Question
                    </button>
                </Link>
                <p>Welcome: <span className='font-semibold'>{user}</span></p>
            </div>

            <div className='px-8 md:px-32 lg:px-[25%]'>
                {loading ? (
                    <p className='text-center py-8'>Loading questions...</p>
                ) : error ? (
                    <p className='text-center py-8 text-red-600'>{error}</p>
                ) : questions.length === 0 ? (
                    <p className='text-center py-8'>No questions available.</p>
                ) : (
                    questions.map((question) => {
                        const { username, title, questionid } = question;
                        return (
                            <Link to={`/answers/questions/${questionid}/answers`} key={questionid}>
                                <div className='flex gap-4 justify-between py-8 items-center border-b-2 hover:scale-105 transition-all ease-in-out duration-300'>
                                    <div className='flex flex-col gap-2 items-center'>
                                        <div className='h-10 w-10 border-2 rounded-full overflow-hidden'>
                                            <AccountCircleIcon style={{ height: '100%', width: "100%" }} />
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
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Questions;
