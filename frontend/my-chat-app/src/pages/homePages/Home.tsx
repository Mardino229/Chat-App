import Chat from "../../components/UserComponents/Chat.tsx";
import SideBar from "../../components/UserComponents/SideBar.tsx";

export default function Home(){
    return (
        <>
            <div className="h-screen overflow-hidden flex items-center justify-center">
                <div className="flex h-screen antialiased text-gray-800">
                    <div className="flex flex-row h-full w-full overflow-x-hidden">
                        <SideBar/>
                        <Chat/>
                    </div>
                </div>
            </div>
        </>
    )
}