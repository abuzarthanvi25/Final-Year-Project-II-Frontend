import { Typography } from "@material-tailwind/react"
import "./notes-card-small.css"
import { Fragment } from "react"

const AddNoteCard = ({ handleAddNote = () => { }, imgSrc = '' }) => {
    return (
        <Fragment>
            <div onClick={handleAddNote} style={{ height: '200px', width: '150px', backgroundColor: '#fff', border: '0.5px solid #DADADA', borderTopRightRadius: '3px', borderTopLeftRadius: '3px' }} className='cursor-pointer w-fit note-body flex justify-center items-center'>
                {/* <img src={imgSrc ? imgSrc : "https://cdn-icons-png.flaticon.com/512/1151/1151035.png"} className="w-2/3 h-2/3 bg-contain" alt="" /> */}
            </div>
            <Typography style={{ height: 'auto', width: '150px' }} className='text-xs text-center font-light'>Blank Note</Typography>
        </Fragment>
    )
}

export default AddNoteCard
