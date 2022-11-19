import blogService from "../services/blogService";
// import history from "./history";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

const service = new blogService();

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (!context) throw new Error("useAuthState must be used in AuthProvider");

  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (!context) throw new Error("useAuthDispatch must be used in AuthProvider");

  return context;
}

const initialState = {
  status: "idle",
  user: null,
  error: null,
};

function AuthProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
//     console.log(localStorage.getItem('token'), state.status)
//   if(localStorage.getItem('token') && state.status === 'idle') {
//   }

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

async function alreadyAuthent(dispatch) {
try {
        dispatch({ status: "pending" });
        const getUser = await service.getUser({ token: localStorage.getItem('token')})

        dispatch({
          status: "resolved",
          user: getUser.user,
          error: null,
        });
      } catch (error) {
        dispatch(initialState);
      }
}

async function updateProfile(dispatch, user) {
  try {
    dispatch({ status: "pending" });
    console.log(user, "in do update");
    const result = await service.updateUser(user);
    console.log("updateProfile", result);
    localStorage.setItem("token", result.user.token);
    const userData = { ...result.user, token: localStorage.getItem("token") };
    const getUser = await service.getUser(userData);
    dispatch({
      status: "resolved",
      user: getUser.user,
      error: null,
    });
  } catch (error) {
    dispatch({ status: "rejected", error });
  }
}

async function doRegister(dispatch, user) {
  try {
    dispatch({ status: "pending" });
    console.log(user, "in do login");
    const result = await service.registerUser(user);
    //   console.log(result);
    const getUser = await service.getUser(result.user);
    dispatch({
      status: "resolved",
      user: getUser.user,
      error: null,
    });
  } catch (error) {
    dispatch({ status: "rejected", error });
  }
}

async function doLogin(dispatch, user) {
  try {
    dispatch({ status: "pending" });
    console.log(user, "in do login");
    const result = await service.loginUser(user);
    // console.log(result);
    localStorage.setItem("token", result.user.token);
    const userData = { ...result.user, token: localStorage.getItem("token") };
    const getUser = await service.getUser(userData);
    // console.log(getUser);

    console.log(localStorage);
    dispatch({
      status: "resolved",
      user: getUser.user,
      error: null,
    });
  } catch (error) {
    dispatch({ status: "rejected", error });
  }
}

function doLogout(dispatch) {
  dispatch(initialState);
  localStorage.removeItem("token");
  history.push("/");
}

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  doLogin,
  doLogout,
  doRegister,
  updateProfile,
  alreadyAuthent
};
