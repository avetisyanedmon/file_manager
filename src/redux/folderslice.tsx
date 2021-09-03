import { createSlice } from '@reduxjs/toolkit'

export interface iFileandFolder {
  id:number
  title:string;
  type:string;
  parent:string
}

const file = localStorage.getItem('reduxState')

const initialState = {
  value : file !== null ? JSON.parse(file) : [] as iFileandFolder[],
  breadCrumb:[] as string[],
  trash:[] as iFileandFolder[],
  modalOpen:false as boolean
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
        state.value = state.value.filter((fold:iFileandFolder) => fold.id !== action.payload.id && fold.parent !== action.payload.title)
    },
    addDirect: (state,action) => {
      state.breadCrumb = [
        ...state.breadCrumb,
        action.payload
        
      ]
    },
    deleteDirect:(state,action) => {
      state.breadCrumb = state.breadCrumb.slice(0, state.breadCrumb.indexOf(action.payload) + 1)
    },
    addTrash:(state, action) => {
      state.trash = [
        ...state.trash ,
        {
          id:action.payload.id,
          title:action.payload.title,
          type: action.payload.type,
          parent:action.payload.parent
        }
      ]
    },
    addFromTrash:(state, action) => {
      state.value = [
        ...state.value ,
        {
          id:action.payload.id,
          title:action.payload.title,
          type: action.payload.type,
          parent:action.payload.parent
        }
      ]
    },
    deleteTrash:(state, action) => {
      state.trash = state.trash.filter((t:iFileandFolder) => t.id !== action.payload )
    },
    openClose:(state) => {
      state.modalOpen = !state.modalOpen
    }
  },


})

export const { addFolder, addFile, deleteFolder, addDirect, deleteDirect,addTrash,deleteTrash,openClose, addFromTrash } = folderSlice.actions

export default folderSlice.reducer