import UserLayout from "../../components/UserComponents/UserLayout.tsx";
import Chat from "../../components/UserComponents/Chat.tsx";


export default function Discussion() {

    return (
        <UserLayout child = {<Chat/>}/>
    );
}
