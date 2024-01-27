import {
    Button,
    Card, CardHeader, IconButton, Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"
import Message from "./message";
import { isCurrentUser } from "@/utils/helpers";
import CustomAvatar from "../custom-avatar"
import { Divider, Input, TextField } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import SplashChat from "./splash-chat";

const ChatRoom = ({ sender_id = "", room_id = "", receiverName = 'Muhammad Usama', handleBack = () => {}, receiverImg = '' }) => {
    // TODO: make this dynamic
    const [socketInstance, setSocket] = useState(null);
    const [allMessages, setAllMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:5001/");
        setSocket(socket);

        socket.emit("join room", room_id);
        socket.emit("get room messages", room_id)

        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        socket.on('receive room messages', (messages) => {
            setAllMessages(messages);
        });

        socket.on('receive new messages', (messages) => {
            // Handle receiving new messages and update the chatMessages state
            setAllMessages(messages);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [room_id])

    const handleChange = (e) => {
        setInputValue(e.target?.value);
    }

    const handleSendMessage = () => {
        if (!socketInstance) return;
        socketInstance.emit("send message", { message: inputValue, sender: sender_id, chat_room_id: room_id })
        setInputValue('')
    }

    const messagesContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when the component updates
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [allMessages]);

    return (
        <div className="w-full flex flex-col">
            <div className="border-2" style={{ minWidth: '50vw' }}>
                {!room_id ?
                    <SplashChat /> :
                    <div>
                        <div className="px-3 py-2 flex items-center bg-blue-gray-50/50">
                            <IconButton onClick={handleBack} size="sm" variant="text" color="blue-gray">
                                <ArrowLeftIcon
                                    strokeWidth={3}
                                    fill="currenColor"
                                    className="h-6 w-6"
                                />
                            </IconButton>
                            <CustomAvatar sx={{ borderRadius: '20px' }} src={receiverImg} name={receiverName} className={"mx-4"} />
                            <Typography className="text-3xl">{receiverName}</Typography>
                        </div>
                        <Divider />
                        <div className="">
                            <div style={{ maxHeight: '67vh', minHeight: '67vh' }} className="p-5 overflow-y-scroll" ref={messagesContainerRef}>
                                {
                                    !!allMessages.length &&
                                    allMessages.map(({ message, sender, createdAt, updatedAt }, i) => (
                                        <Message isCurrentUser={isCurrentUser(sender?._id, sender_id)} timeStamps={{ createdAt, updatedAt }} key={i} message={message} sender={sender} />
                                    ))
                                }
                            </div>

                            <div className="px-2 py-2 bg-blue-gray-50">
                                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage();}}>
                                    <TextField
                                        fullWidth
                                        value={inputValue}
                                        size="medium"
                                        variant="outlined"
                                        placeholder="Type a message"
                                        className="bg-white w-72 rounded-xl flex flex-wrap"
                                        disabled={!socketInstance}
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ChatRoom
