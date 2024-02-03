import useEffectOnce from "@/hooks/useEffectOnce";
import {
    Card,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { io } from "socket.io-client"

export function NoteDetails() {
    const [socket, setSocket] = useState(null);
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["clean"],
            [{ 'direction': 'rtl' }],
            [{ 'align': [] }],
        ]
    }

    const handleOnChange = (value, _, source) => {
        if (socket == null || source !== "user") return;
        socket.emit("send-note-changes", value);
    }

    useEffectOnce(() => {
        const socket = io(import.meta.env.VITE_FRONTEND_URL);

        setSocket(socket)

        return () => {
            socket.disconnect();
        }
    })

    useEffect(() => {
        if (socket == null) return;

        socket.once("load-note-content", note_data => {
            setValue(note_data)
        })

        socket.emit("get-note-content", "65ae725c1ee3ab2c605cc6c9");
    }, [socket])

    useEffect(() => {
        if (socket == null) return;

        const handler = synchronizedData => {
            setValue(synchronizedData)
        }

        socket.on("receive-note-changes", handler)
    }, [socket])

    return (
        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
            <Card>
                <ReactQuill modules={modules} theme="snow" value={value} onChange={handleOnChange} />
            </Card>
        </div>
    );
}

export default NoteDetails;
