import {
  useAuthState,
  useAuthDispatch,
  doLogin,
} from "../../../context/authContext";
import classes from "./SignIn.module.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";

function SignIn() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { user: loggedUser, status, error } = useAuthState();
  console.log(loggedUser);
  const dispatch = useAuthDispatch();
  if (loggedUser) return <Redirect to="/" />;

  const onSubmit = (userData) => {
    doLogin(dispatch, userData);
  };

  return (
    <section className={classes["sign-in"]}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={classes["sign-in__form"]}
      >
        <h2 className={classes["form__title"]}>Sign In</h2>
        <div className={classes["form__item"]}>
          <label className={classes["label"]} htmlFor="email">
            Email address
          </label>
          <input
            className={classes["input"]}
            name="email"
            {...register("email", {
              required: "email должен быть не пустой",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message:
                  "email должен быть корректным почтовым адресом",
              },
            })}
            placeholder="Email address"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={classes["form__item"]}>
          <label className={classes["label"]} htmlFor="password">
            Password
          </label>
          <input
            className={classes["input"]}
            {...register("password", {
              required: "password должен быть не пустой",
            })}
            name="password"
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <hr />
        <button type="submit" onClick={handleSubmit(onSubmit)}>
          Login
        </button>
        <p>
          Don’t have an account?
          <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </section>
  );
}

export default SignIn;
