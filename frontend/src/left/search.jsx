import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
function Search
() {
  return (
    <div className='w-60 flex'>
        <input type="text" placeholder="Type here" className="input" />
        <SearchIcon fontSize="large" className='ml-1 hover:cursor-pointer'/>
    </div>
  )
}

export default Search;
