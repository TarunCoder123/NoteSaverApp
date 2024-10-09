import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")? JSON.parse(localStorage.getItem("pastes")):[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste=action.payload;
      // add a check -> Paste already exist wala case
      const isDuplicate=state.pastes.some(existingPaste=>existingPaste.title===paste.title);
      if(!isDuplicate){
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast("Successfully Created the toast");
    }else{
        toast.error("A paste with same title is already exists!");
    }
    },
    updateToPastes: (state, action) => {
        const paste=action.payload;
        const index=state.pastes.findIndex((item)=>item._id===paste._id)
        if(index>=0){
            state.pastes[index]=paste
            localStorage.setItem("pastes",JSON.stringify(state.pastes))

            toast.success("Paste Updated")
        }
    },
    resetAllPastes: (state, action) => {
         state.pastes=[];
         localStorage.removeItem("pastes");
    },
    removeFromPastes: (state,action) => {
        const paste=action.payload;
        const index=state.pastes.findIndex((item)=>item._id===paste._id)
        if(index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes))

            toast.success("Succesfully Deleted the paste");
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes,updateToPastes,resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer