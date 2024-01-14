import { Button, Typography } from '@material-tailwind/react'
import CustomAvatar from "../custom-avatar/index"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { CircularProgress } from '@mui/material';

const UserDetailsSmall = ({email = '', full_name = '', profile_picture = '', loading = false, isAlreadyFriend = false, handleAddFriend = () => {}}  ) => {
  return (
    <div className="flex items-center justify-between gap-5 bg-gray-300 px-3 py-4 w-full my-2 rounded-md">
      <div className="flex items-center gap-4 w-full">
        <CustomAvatar sx={{borderRadius: '10px'}} src={profile_picture} name={full_name} className={"shadow-lg shadow-blue-gray-500/25"} />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {full_name}
          </Typography>
          <Typography className="text-xs font-bold text-blue-gray-400">
            {email}
          </Typography>
        </div>
      </div>
      {
        isAlreadyFriend ? <div className='w-4/12 flex justify-around items-center shadow-md bg-gray-600 px-3 py-2 rounded-md'><DoneAllIcon style={{color:'#00CA06'}} className='text-xs'/><Typography className='font-sans font-bold text-xs align-middle text-center text-white uppercase'>Friend</Typography></div> : 
        <Button onClick={handleAddFriend} disabled={loading || isAlreadyFriend} className='w-4/12' variant="filled" size="sm">
        {loading ? <CircularProgress className='text-xs' style={{color:'#fff', width:'14px', height:'14px'}}/> : "Add Friend"}
  </Button>
      }
    </div>
  )
}

export default UserDetailsSmall
