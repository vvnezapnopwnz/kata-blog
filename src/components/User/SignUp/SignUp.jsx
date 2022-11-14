import React from "react";
import { Link } from "react-router-dom";
import classes from "./SignUp.module.scss";
function SignUp() {
  return (
    <section>
      <form>
        <h2>Sign Up</h2>
        <div>
          <label className={classes.label} htmlFor="name">
            Username
          </label>
          <input name="username" placeholder="Username" />
        </div>
        <div>
          <label className={classes.label} htmlFor="email">
            Email address
          </label>
          <input name="email" placeholder="Email address" />
        </div>
        <div>
          <label className={classes.label} htmlFor="password">
            Password
          </label>
          <input name="password" placeholder="Password" type="password" />
        </div>
        <div>
          <label className={classes.label} htmlFor="password">
            Repeat Password
          </label>
          <input
            name="repeat_password"
            placeholder="Repeat Password"
            type="password"
          />
        </div>
        <hr />

        <button type="checkbox" name="policy" />

        <button type="submit">Create</button>
        <p>
          Already have an account?
          <Link to="/signin">Sign In.</Link>
        </p>
      </form>
    </section>
  );
}

export default SignUp;
