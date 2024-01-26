import ChatMain from "@/components/chats/chat-main";
import {
    Card,
} from "@material-tailwind/react";

export function Chats() {

    return (
        <div className="mt-2 flex mx-3 flex-col gap-8">
            <Card>
                <ChatMain/> 
            </Card>
        </div>
    );
}

export default Chats;
