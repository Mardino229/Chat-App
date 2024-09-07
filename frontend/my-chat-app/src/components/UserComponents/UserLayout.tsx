import {Link, useLocation, useNavigate} from "react-router-dom";
//import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {ACTOR_URL} from "../../constants";

export default function UserLayout(props: any){
    //const { id } = useParams();
    const [actors, setActors] = useState([]);
    const [username, setUsername] = useState("");
    const [_id, set_Id] = useState("");
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
                    isMounted && set_Id(response.data.id);
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
            <div className="lg:fixed top-0 w-full mt-14 lg:w-64 lg:mt-14 h-screen overflow-y-scroll pb-4 pt-2">
                <div
                    className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                >
                    <div className="h-20 w-20 rounded-full border overflow-hidden">
                        <img
                            src="https://th.bing.com/th/id/OIF.rnGJpZA1dcjpUgOecW2Jrw?w=300&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                            alt="Avatar"
                            className="h-full w-full"
                        />
                    </div>
                    <div className="text-sm font-semibold mt-2">{username}</div>

                </div>
                <div className="flex flex-col mt-8">
                    <div className="flex flex-row items-center justify-between text-xs">
                        <span className="font-bold">Active Conversations</span>
                        <span
                            className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                        >{actors.length}</span>
                    </div>
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                        {
                            actors?.length? actors.map((actor: any, index: number) => (
                                <Link to={`/quickmessage/${actor._id}/${_id}`}>
                                    <button key={index}
                                        className="flex w-full flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                    >

                                            <div
                                                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                                            >
                                                {actor.username.charAt(0).toUpperCase()}{actor.username.charAt(actor.username.length-1).toUpperCase()}
                                            </div>

                                        <div className="ml-2 text-sm font-semibold">{actor.username}</div>
                                    </button>
                                </Link>
                            )):(<button>Find new user</button>)
                        }
                    </div>
                    {/*<div className="flex flex-row items-center justify-between text-xs mt-6">*/}
                    {/*    <span className="font-bold">Archivied</span>*/}
                    {/*    <span*/}
                    {/*        className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"*/}
                    {/*    >7</span*/}
                    {/*    >*/}
                    {/*</div>*/}
                    {/*<div className="flex flex-col space-y-1 mt-4 -mx-2">*/}
                    {/*    <button*/}
                    {/*        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"*/}
                    {/*    >*/}
                    {/*        <div*/}
                    {/*            className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"*/}
                    {/*        >*/}
                    {/*            H*/}
                    {/*        </div>*/}
                    {/*        <div className="ml-2 text-sm font-semibold">Henry Boyd</div>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
            {props.child}
        </div>
    )
}