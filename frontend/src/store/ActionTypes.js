import { createSlice } from "@reduxjs/toolkit";

const initialState = {meMessage: [], otherMessage: [], users: []}

const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers:{
    sendMessage(state, action){
      state.meMessage.push(action.payload)
    },

  }
})
export default messagingSlice