import Logo from "../Logo.tsx";
import useLogout from "../../hooks/useLogout.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const logout = useLogout();
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const signOut = async () => {
        await logout();
        navigate('/')
    }
    return (
        <>
            <nav
                className="fixed top-0 z-50 w-full bg-gray-900 text-white dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                type="button"
                                onClick={handleToggle}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a className="flex items-center ms-2 md:me-24">
                                <Logo size="h-12 w-12"/>
                                <p className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">QuickChat</p>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <aside
                className={`fixed top-0 text-white left-0 z-40 bg-gray-900 w-64 h-screen pt-20 transition-transform transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }  bg-gray-900 border-r text-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
                    <ul className="space-y-2 font-medium flex-col text-white flex justify-between h-full">
                        <div>
                            <Link to="/quickmessage">
                                <li>
                                    <p
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                                        <img width="32" height="32"
                                             src="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/external-inbox-communication-multimedia-vol2-microdots-premium-microdot-graphic.png"
                                             alt="external-inbox-communication-multimedia-vol2-microdots-premium-microdot-graphic"/>
                                        <span className="flex-1 ms-3 text-white whitespace-nowrap">Inbox</span>
                                        <span
                                            className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                                    </p>
                                </li>
                            </Link>
                            <Link to="/users">
                                <li>
                                    <p
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                                        <img width="32" height="32" src="https://img.icons8.com/arcade/64/group.png"
                                             alt="group"/>
                                        <span className="flex-1 ms-3 text-white whitespace-nowrap">Users</span>
                                    </p>
                                </li>
                            </Link>
                        </div>
                        <div>
                            <Link to="/settings">
                                <li>
                                    <p
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                                        <img width="32" height="32" src="https://img.icons8.com/3d-fluency/50/gear.png"
                                             alt="gear"/>

                                        <span className="flex-1 text-white ms-3 whitespace-nowrap">Settings</span>
                                    </p>
                                </li>
                            </Link>
                            <li>
                                <button onClick={signOut}
                                        className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                                    <img width="32" height="32"
                                         src="https://img.icons8.com/external-tal-revivo-duo-tal-revivo/50/external-logout-screen-from-the-working-portfolio-of-a-user-closeupman-duo-tal-revivo.png"
                                         alt="external-logout-screen-from-the-working-portfolio-of-a-user-closeupman-duo-tal-revivo"/>
                                    <p>
                                        <span className="flex-1 text-white ms-3 whitespace-nowrap">Log out</span>
                                    </p>
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
            </aside>
        </>
    )
}