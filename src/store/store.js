import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'


//Instancia del store de redux con los reducers de auth y wedding 

export default configureStore({

  reducer: {
    auth: authSlice.reducer,
  },
})