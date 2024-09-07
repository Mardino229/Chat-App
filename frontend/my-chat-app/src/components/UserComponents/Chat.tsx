import { useParams } from 'react-router-dom';
import Logo from "../Logo.tsx";
import io from 'socket.io-client';
import {BASE_URL} from "../../constants";
import {useEffect, useRef, useState} from "react";
import useAuth from "../../hooks/useAuth.tsx";

interface Message {
    sender: string;
    receiver: string;
    content: string;
    timestamp: string;
}

export default function Chat () {
    // @ts-ignore
    const { auth } = useAuth();
    console.log(auth)
    const socket = io(BASE_URL, {
        auth: {token: auth?.accessToken
        }
    });
    const { sender } = useParams();
    const { receiver } = useParams();
    const [message, setMessage] = useState<string>('');
    const [chat, setChat] = useState<Message[]>([]);
    // @ts-ignore
    const actorStock = JSON.parse(localStorage.getItem('actors'));
    const messagesEndRef = useRef(null);
    // socket.on('Authentication error', (err) => {
    //     console.error('Erreur de connexion :', err.message);
    //     window.location.reload(false);
    // });

    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {

        // Fetch chat history
        socket.emit('getChatHistory', { sender, receiver });

        socket.on('chatHistory', (history: Message[]) => {
            setChat(history);
        });

        // Listen for incoming messages
        socket.on('receiveMessage', (newMessage: Message) => {
            setChat((prevChat) => [...prevChat, newMessage]);
        });
        return () => {
            socket.off('chatHistory');
            socket.off('receiveMessage');
        };
    }, [receiver, sender]);
    const sendMessage = () => {
        if (message.trim() === '') return;

        const newMessage: Message = {
            sender,
            receiver,
            content: message,
            timestamp: new Date().toISOString(),
        };

        socket.emit('sendMessage', newMessage);
        setMessage('');
    };
    useEffect(() => {
        scrollToBottom();
    }, [chat]);
    return (
        <>
            {
                !receiver ?
                    <div className="items-center  h-screen flex-col hidden w-full lg:flex mx-auto sm:ml-64">
                                <Logo size="h-32 w-32 h-full"/>
                    </div> :
                    <div className=" flex-col sm:ml-64 h-full hidden lg:flex overflow-x-auto mb-1 mt-14 w-full">
                        <div className="flex flex-col h-full mb-10">
                            <div className="grid grid-cols-2 gap-y-2">
                                {chat.map((msg, index) => (
                                    <div
                                        className={msg.receiver === receiver ? "col-start-6 col-end-13 p-3 rounded-lg" : "col-start-1 col-end-8 p-3 rounded-lg"}
                                        key={index}>
                                        <div
                                            className={msg.receiver === receiver ? "flex items-center justify-start flex-row-reverse"
                                                : "flex flex-row items-center"
                                            }>
                                            <div
                                                className={msg.receiver === receiver ? "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" :
                                                    "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                }
                                            >
                                                A
                                            </div>
                                            <div
                                                className={msg.receiver === receiver ? "relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl" :
                                                    "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"}
                                            >
                                                <div>{msg.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef}/>
                            </div>
                        </div>
                        <div
                            className="flex flex-row right-0 fixed w-1/2 bottom-0 items-center h-16 rounded-xl bg-white px-4"
                        >
                            <div>
                                <button
                                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                    />
                                    <button
                                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4">
                                <button onClick={sendMessage}
                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                >
                                    <span>Send</span>
                                    <span className="ml-2">
                                      <svg
                                          className="w-4 h-4 transform rotate-45 -mt-px"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        ></path>
                                      </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}