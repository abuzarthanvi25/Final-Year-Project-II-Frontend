import ChatMain from "@/components/chats/chat-main";
import {
    Card,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

export function Chats() {
    const {state: id} = useLocation()
    const navigate = useNavigate();

    const clearHistory = () => navigate(location.pathname, { replace: true });

    return (
        <div className="mt-2 flex mx-3 flex-col gap-8">
            <Card>
                <ChatMain clearHistory={clearHistory} friend_id={id}/> 
            </Card>
        </div>
    );
}

export default Chats;
