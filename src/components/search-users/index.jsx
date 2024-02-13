import { Input, InputAdornment, CircularProgress, Skeleton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import UserDetailsSmall from './user-component-sm';
import { Typography } from '@material-tailwind/react';
import useEffectOnce from '@/hooks/useEffectOnce';

const SearchUsers = ({handleSearch = () => {}, loading = false, users = [], handleAddFriend = () => {}, isAlreadyFriend=false}) => {
    const [timeoutId, setTimeoutId] = useState();

    const [minWidth, setMinWidth] = useState('40vw'); // Default value

    useEffectOnce(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) { // xs screens
          setMinWidth('85vw');
        } else if (screenWidth < 768) { // sm screens
          setMinWidth('80vw');
        } else if (screenWidth < 1024) { // sm screens
            setMinWidth('80vw');
        } else { // md screens and larger
          setMinWidth('44vw');
        }
      };
  
      handleResize(); // Call initially
      window.addEventListener('resize', handleResize); // Add event listener for resize
  
      return () => window.removeEventListener('resize', handleResize); // Remove event listener on component unmount
    });
  

    const onSearchChange = (e) => {
        clearTimeout(timeoutId);
        const timeout = setTimeout(() => handleSearch(e.target.value), 400);
        setTimeoutId(timeout);
    };

  return (
    <div style={{ minWidth: minWidth }}>
      <Input className='mb-3' readOnly={loading} onChange={onSearchChange} type='search' placeholder='Search user by full name or email' startAdornment={ (
            <InputAdornment position="start">
                {
                    loading ? <CircularProgress style={{color:'#000'}} size={'4.5vh'} /> : <SearchIcon style={{fontSize: '4.5vh'}} />
                }
            </InputAdornment>
    )} style={{height:'3rem', fontSize:'18px', fontWeight:'bolder'}} fullWidth />
    <div style={{minHeight: '10vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div style={{maxHeight: '50vh', overflowY:'scroll'}} className='min-w-full'>
        {
        loading ? (
            <Skeleton style={{ height: '100px' }} />
        ) : (
            !!users.length > 0 ? (
            users.map(({ _id, full_name, email, profile_picture }, index) => (
                <UserDetailsSmall profile_picture={profile_picture?.url ?? ''} handleAddFriend={() => handleAddFriend(_id)} key={index} isAlreadyFriend={isAlreadyFriend(_id)} loading={loading} full_name={full_name} email={email} />
            ))
            ) : (
            <Typography style={{textAlign:'center', color: 'gray'}} variant='small'>No users found</Typography>
            )
        )
}
        </div>
    </div>
    </div>
  )
}

export default SearchUsers
