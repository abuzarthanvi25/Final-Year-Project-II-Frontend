import { useCallback, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "./editor.css"
import { Button } from "@material-tailwind/react"

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
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
]

export default function Editor() {
    const [quill, setQuill] = useState()

    const handleGetAllContent = () => {
        const delta = quill.editor.delta;

        if(delta?.ops[0]?.insert !== "\n"){
            console.log(delta)
        }

    }

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        })
        setQuill(q);
    }, [])

    return <>
        <div className="container" ref={wrapperRef}></div>
        <Button onClick={handleGetAllContent}>test</Button>
    </>
}
