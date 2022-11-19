import {
    useAuthState,
    useAuthDispatch,
    updateProfile,
  } from "../../../context/authContext";
  import classes from "./Profile.module.scss";
  import React from "react";
  import { useForm } from "react-hook-form";
  import { Link, Redirect } from "react-router-dom";
  
  function Profile() {
    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    } = useForm();
    const { user: loggedUser } = useAuthState();
    const dispatch = useAuthDispatch();
    // if (loggedUser) return <Redirect to="/" />;
  console.log(loggedUser)

    const onSubmit = async (userData) => {
      console.log('onSubmit',userData);
      if(loggedUser.token) {
        const { token } = loggedUser
        updateProfile(dispatch, { ...userData, token });
      }

    };
    return (
      <section className={classes["profile"]}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes["profile__form"]}
        >
          <h2 className={classes["form__title"]}>Update profile</h2>
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
              New password
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
            <label className={classes["label"]} htmlFor="image">
              Avatar image
            </label>
            <input
              className={classes["input"]}
              name="image"
              {...register("image", {
              })}
              placeholder="Avatar image"
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <hr />
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            Update
          </button>
        </form>
      </section>
    );
  }
  
  export default Profile;
  