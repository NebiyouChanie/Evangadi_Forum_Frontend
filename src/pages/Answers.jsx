import React, { useContext, useState, useEffect, useCallback } from 'react';
import Nav from '../components/Nav';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { UserContext } from '../Usercontext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Answers() {
    const [answers, setAnswers] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { questionid } = useParams();
    const token = localStorage.getItem('token');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(UserContext);

    // Fetch answers
    const fetchAnswers = useCallback(async () => {
        try {
            const response = await fetch(`https://evangadiforum-backend-ovy7.onrender.com/answers/questions/${questionid}/answers`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const answersData = await response.json();
            setAnswers(answersData);
        } catch (error) {
            console.log(error);
        }
    }, [questionid, token]);

    // Fetch single question details
    const fetchSingleQuestion = useCallback(async () => {
        try {
            const response = await fetch(`https://evangadiforum-backend-ovy7.onrender.com/questions${questionid}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const question = await response.json();
            const [{ title, description }] = question.response;
            setTitle(title);
            setDescription(description);
        } catch (error) {
            console.log(error);
        }
    }, [questionid, token]);

    useEffect(() => {
        fetchSingleQuestion();
        fetchAnswers();
    }, [fetchSingleQuestion, fetchAnswers]);

    // Post answer
    const postAnswer = async (data) => {
        try {
            const response = await fetch(`https://evangadiforum-backend-ovy7.onrender.com/answers/questions/${questionid}/postanswer`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                return;
            }
            setAnswers(prev => [...prev, { username: user, answer: data.answer }]);
        } catch (error) {
            console.log(error);
        } finally {
            reset();
        }
    };

    return (
        <div className='min-h-screen flex flex-col' >
            <Nav />
            <div className='my-8 my-8 flex-grow'>
                <div className='mx-8 md:px-12 lg:mx-[20%]'>
                    <h1 className='mb-4 text-2xl uppercase'>Question</h1>
                    <h3 className='font-semibold text-2xl text-blue-500 mb-2'>{title}</h3>
                    <p className='font-semibold mb-12'>{description}</p>
                </div>
                <div className='border-y-2 mx-12 md:px-32 lg:mx-[20%] py-4'>
                    <h2 className='font-semibold text-orange-600 text-xl'>Answer From The Community</h2>
                </div>
                <div className='px-12 md:px-32 lg:px-[25%]'>
                    {answers.length > 0 ? (
                        answers.map(({ username, answer }, index) => (
                            <div key={index} className='flex py-8 items-center border-b-2'>
                                <div className='flex flex-col gap-2 items-center mr-8'>
                                    <div className='h-10 w-10 border-2 rounded-full'>
                                        <AccountCircleIcon style={{ height: '100%', width: "100%" }} />
                                    </div>
                                    <p className='text-sm text-start flex-1'>{username}</p>
                                </div>
                                <p>{answer}</p>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-500'>No answers yet.</p>
                    )}
                    <form onSubmit={handleSubmit(postAnswer)}>
                        <textarea
                            placeholder='Write your answer'
                            className='w-full h-28 border-2 outline-blue-500 resize-none p-4 mt-12 mb-4'
                            {...register("answer", {
                                required: "Answer is required.",
                                maxLength: {
                                    value: 300,
                                    message: "Answer must be at most 300 characters long."
                                }
                            })}
                        ></textarea>
                        {errors.answer && <p className="text-red-600 text-center">{errors.answer.message}</p>}
                        <button type='submit' className='bg-blue-600 text-sm py-2 px-8 rounded-md text-white  hover:bg-blue-500 transition-all ease-in-out duration-200'>Post Answer</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Answers;
