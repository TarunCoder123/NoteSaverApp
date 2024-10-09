import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [searchParams,setSearchParams]=useSearchParams();// Destructure useSearchParams
    const pasteId=searchParams.get('pasteId');
    const dispatch=useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes);

    useEffect(()=>{
        if(pasteId) {
         const paste=allPastes.find((p)=>p._id===pasteId);
         setTitle(paste.title);
         setValue(paste.content);
        }
     },[pasteId])

    const createPaste=()=>{
        const paste={
            title: title,
            content:value,
            _id:pasteId||Date.now().toString(36)+Math.random().toString(36).substring(2),
            createdAt:new Date().toISOString(),
        }

            if(pasteId){
                //update
                dispatch(updateToPastes(paste));
            }
            else{
                //create
                dispatch(addToPastes(paste));

            }

            //after creation and updation
            setTitle('');
            setValue('');
            setSearchParams({});
    }

    const resetPaste = () => {
        setTitle("");
        setValue("");
        setSearchParams({});
        // navigate("/");
      };

  return (
     <div>
        <div className="flex flex-row gap-7 place-content-between">
      <input 
      className='p-2 rounded-2xl mt-2 bg-black w-[66%] pl-4 text-white'
      type='text'
      placeholder='enter title here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button 
      onClick={createPaste}
      className='p-2 rounded-2xl mt-2 bg-blue-500'>
        {
            pasteId?"Update Paste":"Create My Paste"
        }
      </button>
    </div>
    <div className='mt-'>
        <textarea className='rounded-2xl mt-4 min-w-[500px] p-4 bg-black text-white'
        value={value}
        placeholder='Enter content here'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        />
    </div>
     </div>
  )
}

export default Home
