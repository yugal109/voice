import React, { useEffect, useState } from "react";
import axios from "../axy";

const RegisterScreen = () => {
  return (
    <section>
      <form>
        <div class="registration-box">
          <h1>Sign Up</h1>
          <div class="textbox">
            <input
              type="text"
              name="fName"
              placeholder="First Name"
              autofocus=""
              required
            />
          </div>

          <div class="textbox">
            <input type="text" name="lName" placeholder="Last Name" required />
          </div>

          <div class="textbox">
            <input type="text" name="uname" placeholder="Username" required />
          </div>

          <div class="textbox">
            <input type="email" name="email" placeholder="Email" required />
          </div>

          <div class="textbox">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div class="textbox">
            <input type="password" name="cPassword"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div class="textbox">
            <input type="text" name="phNum" placeholder="Phone Number" required />
          </div>

          <div class="textbox">
            <input type="text" name="address" placeholder="Address" required />
          </div>

          <div class="buttons">
            <input type="submit" class="btn" value="Register" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegisterScreen;
