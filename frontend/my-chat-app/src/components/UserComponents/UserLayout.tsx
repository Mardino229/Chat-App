import {Link, useLocation, useNavigate} from "react-router-dom";
//import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {ACTOR_URL} from "../../constants";

export default function UserLayout(props: any){
    //const { id } = useParams();
    const [actors, setActors] = useState([]);
    const [username, setUsername] = useState("");
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {

            let isMounted = true;

            const controller = new AbortController();

            const getActor = async () =>
            {
                try {
                    const response = await axiosPrivate.get(ACTOR_URL, {
                        signal: controller.signal,
                    })
                    isMounted && setActors(response.data.data);
                    isMounted && setUsername(response.data.username);
                } catch (err: any) {
                    console.log(err);
                    if (err.name === 'CanceledError') {
                        console.log('Request canceled :', err.message);
                    } else {
                        console.log(err.message);
                        navigate('/', {
                            state: {from: location},
                            replace: true
                        });
                    }
                }
            }
            getActor();
            return () =>{
                isMounted = false;
                controller.abort();
            }
            }, []);

    return (
        <div className="flex p-6 sm:ml-64">
            <div className="lg:fixed top-0 w-full mt-14 lg:w-64 lg:mt-14 ">
                <div
                    className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                >
                    <div className="h-20 w-20 rounded-full border overflow-hidden">
                        <img
                            src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                            alt="Avatar"
                            className="h-full w-full"
                        />
                    </div>
                    <div className="text-sm font-semibold mt-2">{username}</div>
                    <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
                    <div className="flex flex-row items-center mt-3">
                        <div
                            className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
                        >
                            <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                        </div>
                        <div className="leading-none ml-1 text-xs">Active</div>
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                    <div className="flex flex-row items-center justify-between text-xs">
                        <span className="font-bold">Active Conversations</span>
                        <span
                            className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                        >4</span
                        >
                    </div>
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                        {
                            actors?.length? actors.map((actor: any, index: number) => (
                                <button key={index}
                                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                >
                                    <Link to="/quickmessage/2">
                                        <div
                                            className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                                        >
                                            H
                                        </div>
                                    </Link>
                                    <div className="ml-2 text-sm font-semibold">{actor.username}</div>
                                </button>
                            )):(<button>Find new user</button>)
                        }
                        <button
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        >
                            <Link to="/quickmessage/2">
                                <div
                                    className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                                >
                                    H
                                </div>
                            </Link>
                            <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                        </button>
                        <button
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        >
                            <div
                                className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
                            >
                                M
                            </div>
                            <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
                            <div
                                className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
                            >
                                2
                            </div>
                        </button>
                        <button
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        >
                            <div
                                className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"
                            >
                                P
                            </div>
                            <div className="ml-2 text-sm font-semibold">Philip Tucker</div>
                        </button>
                        <button
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        >
                            <div
                                className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full"
                            >
                                C
                            </div>
                            <div className="ml-2 text-sm font-semibold">Christine Reid</div>
                        </button>
                        <button
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        >
                            <div
                                className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full"
                            >
                                J
                            </div>
                            <div className="ml-2 text-sm font-semibold">Jerry Guzman</div>
                        </button>
                    </div>
                    <div className="flex flex-row items-center justify-between text-xs mt-6">
                        <span className="font-bold">Archivied</span>
                        <span
                            className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                        >7</span
                        >
                    </div>
                    <div className="flex flex-col space-y-1 mt-4 -mx-2">
                        <button
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        >
                            <div
                                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                            >
                                H
                            </div>
                            <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                        </button>
                    </div>
                </div>
            </div>
            {props.child}
        </div>
    )
}