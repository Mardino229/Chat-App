import {Link, useLocation, useNavigate} from "react-router-dom";
//import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {ACTOR_URL} from "../../constants";
import Logo from "../Logo.tsx";

export default function UserLayout(props: any){
    //const { id } = useParams();
    const [actors, setActors] = useState([]);
    const [username, setUsername] = useState("");
    const [receiver, setReceiver] = useState("");
    const [state, setState] = useState(true);
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
        <>
            {state ?
                <div className="flex sm:ml-64">

                    <div
                        className="lg:fixed top-0 w-full border-l border-white border-2 mt-14 lg:w-80 lg:mt-14 min-h-screen bg-gray-900 text-white px-2">
                        <div
                            className="flex flex-col items-center mt-4 w-full py-6 px-4 rounded-lg"
                        >
                            <div className="h-20 w-20 rounded-full overflow-hidden">
                                <img
                                    src="/Z.jpeg"
                                    alt="Avatar"
                                    className="h-full w-full"
                                />
                            </div>
                            <div className=" font-bold mt-2 text-xl">{username}</div>

                        </div>
                        <div className="flex flex-col mt-8">
                            <div className="flex flex-row items-center justify-between px-2 ">
                                <span className="font-bold text-2xl">My Discussions</span>
                                <span
                                    className="flex items-center justify-center bg-green-500 h-8 w-8 rounded-full"
                                >{actors.length}</span>
                            </div>
                            <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
                                {
                                    actors?.length ? actors.map((actor: any, index: number) => (
                                        <Link to={`/quickmessage/${actor._id}/${_id}`}>
                                            <button key={index} onClick={() => {
                                                setState(!state)
                                                setReceiver(actor.username)
                                            }}
                                                    className="flex w-11/12 flex-row items-center rounded-2xl hover:bg-gray-700 p-2 mx-2"
                                            >

                                                <div
                                                    className="flex items-center justify-center h-10 w-10 bg-fuchsia-700 rounded-full"
                                                >
                                                    {actor.username.charAt(0).toUpperCase()}{actor.username.charAt(actor.username.length - 1).toUpperCase()}
                                                </div>

                                                <div className="ml-2 font-semibold">{actor.username}</div>
                                            </button>
                                        </Link>
                                    )) : (<button>Find new user</button>)
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
                    <div
                        className=" bg-gray-900 items-center justify-center  h-screen flex-col hidden w-full lg:flex mx-auto sm:ml-64">
                        <Logo size="h-32 w-32 "/>
                    </div>
                </div> :
                <div className="sm:ml-64">
                    <div className="flex items-center gap-x-8 pt-20 pb-2 bg-gray-800 pl-4 fixed top-0 z-30 w-full">
                        <button onClick={() => setState(!state)}>
                            <img width="50" height="50" src="https://img.icons8.com/clouds/100/circled-left.png"
                                 alt="circled-left"/>
                        </button>
                        <p className="font-bold text-xl text-white">{receiver}</p>
                    </div>
                    {props.child}
                </div>
            }

        </>

    )
}