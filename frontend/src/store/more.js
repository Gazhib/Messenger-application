import {createSlice} from '@reduxjs/toolkit'

const initialState = {isMore: true}

const moreSlice = createSlice({
  name: 'more',
  initialState,
  reducers:{
    changeIsMore(state){
      state.isMore = !state.isMore
    }
  }
})
export default moreSlice