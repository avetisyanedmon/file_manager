import { createSlice } from '@reduxjs/toolkit'

export interface FileandFolder {
  id:number
  title:string;
  type:string;
  parent:string
}

const file = localStorage.getItem('reduxState')

const initialState = {
  value : file !== null ? JSON.parse(file) : [] as FileandFolder[]
}



  
export const folderSlice = createSlice({
  name: 'fileandfolder',
  initialState,
  reducers: {
    addFile: (state,action) => {
      state.value = [
        ...state.value ,
        {
          id:Date.now(),
          title:action.payload.text,
          type:'file',
          parent:action.payload.parent
        }
      ]
    },
    addFolder: (state, action) => {
      state.value  = [
        ...state.value ,
        {
          id:Date.now(),
          title:action.payload.text,
          type:'folder',
          parent:action.payload.parent
        }
      ]
    },
    deleteFolder: (state,action) => {
        state.value = state.value.filter((fold:FileandFolder) => fold.id !== action.payload)
    }
  },

})

export const { addFolder, addFile, deleteFolder } = folderSlice.actions

export default folderSlice.reducer