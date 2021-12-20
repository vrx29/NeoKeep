import * as authActions from "./actions";

const signinReq = () => {
  console.log("hello Req");
  return {
    type: authActions.SIGN_IN_REQUEST,
  };
};

const signinSuc = (userId) => {
  return {
    type: authActions.SIGN_IN_SUCCESS,
    userId: userId,
  };
};
const signinFail = (err) => {
  return {
    type: authActions.SIGN_IN_FAILED,
    error: err,
  };
};
const removeError = () => {
  return {
    type: authActions.REMOVE_ERROR,
  };
};

export const signin = (userData) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(signinReq());
    const firebase = getFirebase();
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password);
      dispatch(signinSuc(res.user.uid));
    } catch (error) {
      dispatch(signinFail(error));
      setTimeout(() => {
        dispatch(removeError());
      }, 2000);
      console.log(error);
    }
  };
};

const signupReq = () => {
  return {
    type: authActions.SIGN_UP_REQUEST,
  };
};
const signupSuc = (userId) => {
  return {
    type: authActions.SIGN_UP_SUCCESS,
    userId: userId,
  };
};

const signupFail = (err) => {
  return {
    type: authActions.SIGN_UP_FAILED,
    error: err,
  };
};

export const signup = (userData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(signupReq());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password);

      firestore
        .set(
          { collection: "users", doc: res.user.uid },
          { name: userData.name, email: userData.email, notes: [] }
        )
        .catch((error) => {
          dispatch(signupFail(error));
          setTimeout(() => {
            dispatch(removeError());
          }, 2000);
        });

      dispatch(signupSuc(res.user.uid));
    } catch (error) {
      dispatch(signupFail(error));
      setTimeout(() => {
        dispatch(removeError());
      }, 2000);
    }
  };
};

export const signout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: authActions.SIGN_OUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: authActions.SIGN_IN_FAILED, error: err });
        setTimeout(() => {
          dispatch(removeError());
        }, 2000);
      });
  };
};
