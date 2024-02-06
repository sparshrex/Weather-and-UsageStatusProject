import React, { useEffect, useState } from "react";
import { auth, provider } from "./Config";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import "./App.css";

function SignIn() {
  const [value, setValue] = useState("");
  const [user, setUser] = useState([]);
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      setUser(data.user);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div>
      {value ? (
        <Home user={user} />
      ) : (
        <div className="body">
        <div class="container-sign">
            <h1>Login Page</h1>
            <button onClick={handleClick} className="sign-in-button">Sign In with Google</button>
        </div>
    </div>
      )}
    </div>
  );
}
export default SignIn;
