import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);

  const paste=allPastes.filter((p)=>p._id===id)[0];
//   console.log(paste,"paste");

  return (
    <div>
    <div className="flex flex-row gap-7 place-content-between">
  <input 
  className='p-2 rounded-2xl mt-2 bg-black w-[66%] pl-4 text-white'
  type='text'
  value={paste.title}
  disabled
  onChange={(e)=>setTitle(e.target.value)}
  />
</div>
<div className='mt-'>
    <textarea className='rounded-2xl mt-4 min-w-[500px] p-4 bg-black text-white'
    type='text'
    value={paste.content}
    disabled
    onChange={(e)=>setValue(e.target.value)}
    rows={20}
    />
</div>
 </div>
  )
}

export default ViewPaste
