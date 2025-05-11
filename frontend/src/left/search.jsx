import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { setSearchword } from '../redux/userSlice';
import { useDispatch} from 'react-redux';
function Search() {
  const [word, setWord] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchword(word));
  }, [word]);

  return (
    <div className=' w-24 md:w-60 flex rgb(92, 80, 130)'>
      
      <input type="text" placeholder="Type here" className="input rounded-3xl" value={word} onChange={(e) => {
        setWord(e.target.value);
      }} />

      <SearchIcon fontSize="large" className='ml-1 hover:cursor-pointer' />
    </div>
  )
}

export default Search;
