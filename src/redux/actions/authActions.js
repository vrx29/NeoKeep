import * as authActions from "./actions"

const signinReq = () => {
    console.log("hello Req");
    return{
        type : authActions.SIGN_IN_REQUEST,
    }
}

const signinSuc = () => {
    console.log("hello succes");
    return{
        type: authActions.SIGN_IN_SUCCESS,
    }
}
const signinFail = (err) => {
    console.log("hello fail");
    return{
        type:authActions.SIGN_IN_FAILED,
        error : err
    }
}
const removeError = () => {
    return{
        type:authActions.REMOVE_ERROR
    }
}

export const signin =(userData)=>{
    return async (dispatch, getState,{getFirebase})=>{
        dispatch(signinReq())
        const firebase = getFirebase();
        try {
            const res = await firebase.auth().signInWithEmailAndPassword(userData.email,userData.password);
            dispatch(signinSuc())
        } catch (error) {
            dispatch(signinFail(error))
            setTimeout(()=>{
                dispatch(removeError())
            },2000)
            console.log(error);
        }
    }
}

export const getAuthState =()=>{
    return async (dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase();
        try {
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    
                }else{
                    console.log("user signed out");
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

const signupReq =()=>{
    return {
        type: authActions.SIGN_UP_REQUEST
    }
}
const signupSuc =()=>{
    return {
        type: authActions.SIGN_UP_SUCCESS,
        
    }
}

const signupFail =(err)=>{
    return {
        type: authActions.SIGN_UP_FAILED,
        error: err
    }
}

export const signup = (userData)=>{
    return async (dispatch,getState,{getFirebase})=>{
        dispatch(signupReq())
        const firebase = getFirebase()
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
            dispatch(signupSuc())
            
        } catch (error) {
            dispatch(signupFail(error))
            setTimeout(()=>{
                dispatch(removeError())
            },2000)
            
        }
        
    }
}