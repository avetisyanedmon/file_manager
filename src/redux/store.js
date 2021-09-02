import { configureStore } from '@reduxjs/toolkit'
import { folderSlice } from './folderslice'


export const store = configureStore({
  reducer: {
      counter: folderSlice.reducer
  },
  
})

store.subscribe(() =>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState().counter.value))}
  )