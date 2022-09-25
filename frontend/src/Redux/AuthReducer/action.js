import * as types from "./actionTypes";
const signupRequest = () => {
	return { type: types.SIGNUP_REQUEST }
}
const signupSuccess = (user_data) => {
	return { type: types.SIGNUP_SUCCESS, payload: user_data }
}
const signupFail = () => {
	return { type: types.SIGNUP_FAIL }
}

const uploadUser=(query=null)=>(dispatch)=>{
	
}