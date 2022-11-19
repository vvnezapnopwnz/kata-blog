import {
  useAuthState,
  useAuthDispatch,
  doRegister,
} from "../../../context/authContext";
import classes from "./SignUp.module.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";

function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { user: loggedUser } = useAuthState();
  const dispatch = useAuthDispatch();
  if (loggedUser) return <Redirect to="/" />;

  const onSubmit = async (userData) => {
    console.log(userData);
    doRegister(dispatch, userData);
  };
  return (
    <section className={classes["sign-up"]}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={classes["sign-up__form"]}
      >
        <h2 className={classes["form__title"]}>Create new account</h2>
        <div className={classes["form__item"]}>
          <label className={classes["label"]} htmlFor="name">
            Username
          </label>
          <input
            className={classes["input"]}
            placeholder="Username"
            name="username"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
        </div>
        <div className={classes["form__item"]}>
          <label className={classes["label"]} htmlFor="email">
            Email address
          </label>
          <input
            className={classes["input"]}
            name="email"
            {...register("email", {
              required: "email должен быть корректным почтовым адресом",
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            placeholder="Email address"
          />
        </div>
        <div className={classes["form__item"]}>
          <label className={classes["label"]} htmlFor="password">
            Password
          </label>
          <input
            className={classes["input"]}
            {...register("password", {
              required: "You must specify a password",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters.",
              },
              maxLength: {
                value: 40,
                message:
                  "Password must have less or equivalent to 40 characters",
              },
            })}
            name="password"
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className={classes["form__item"]}>
          <label className={classes["label"]} htmlFor="password">
            Repeat Password
          </label>
          <input
            {...register("repeat_password", {
              validate: (value) => {
                const { password } = getValues();
                return value === password || "The passwords must match";
              },
            })}
            className={classes["input"]}
            name="repeat_password"
            placeholder="Repeat Password"
            type="password"
          />
          {errors.repeat_password && <p>{errors.repeat_password.message}</p>}
        </div>
        <hr />
        <div>
          <input
            type="checkbox"
            name="policy"
            {...register("policy", {
              required: true,
            })}
          />
          &nbsp;I agree to the processing of my personal information
        </div>

        <button type="submit" onClick={handleSubmit(onSubmit)}>
          Create
        </button>
        <p>
          Already have an account?
          <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </section>
  );
}

export default SignUp;
