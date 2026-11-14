import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { TiUser } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const userInfos = {
    email: "",
    password: "",
    name: "",
  };

  const [user, setUser] = useState(userInfos);
  const { email, password, name } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const temail = email.toLowerCase();
    if (state === "Log In") {
      if (!temail || !password) {
        setError("All fields are required !");
        return;
      }
      logIn();
    } else {
      if (!name || !temail || !password) {
        setError("All fields are required !");
        return;
      }
      signUp();
    }
  };
  const logIn = async () => {
    try {
      var temail = email.toLowerCase()
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          temail,
          password,
        }
      ); 
      setError('')
      setSuccess("Success !")
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });
        Cookies.set("user", JSON.stringify(data), { expires: 15 });
        navigate("/");
      }, 2000);
    } catch (error) {
      // console.log(error)
      setError(error.response.data.message);
    }
  };

  const signUp = async () => {
    try {
      var temail = email.toLowerCase()
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          name,
          temail,
          password,
        }
      );

      setError('')
      setSuccess(data.message)
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest), { expires: 15 });
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="containerzz">
      <div className="auth_wrapper">
        <div className="img">
          <img src="/sp.gif" alt="rfe" />
          <span>{state}</span>
        </div>
        <div className="login-cont">
          <div
            className="tab"
            style={{
              borderBottom: `${state === "Log In" ? "2px solid black" : ""}`,
              color: `${state === "Log In" ? "black" : ""}`,
            }}
            onClick={() => {
              setState("Log In");
              setError("")
            }}
          >
            Log In
          </div>
          <div
            className="tab"
            style={{
              borderBottom: `${state === "Sign Up" ? "2px solid black" : ""}`,
              color: `${state === "Sign Up" ? "black" : ""}`,
            }}
            onClick={() => {
              setState("Sign Up");
              setError("")

            }}
          >
            Sign Up
          </div>
        </div>
        <form action="">
          {state === "Sign Up" ? (
            <div className="input">
              <TiUser size={16} />
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={name}
                onChange={handleRegisterChange}
              />
            </div>
          ) : (
            ""
          )}
          <div className="input">
            <TfiEmail size={14} />
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleRegisterChange}
            />
          </div>
          <div className="input">
            <CiLock size={16} />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleRegisterChange}
            />
          </div>
        </form>
        {error && <span className="errorValidation" >{error}</span>}
        {success && <span className="RegisterSuccess" >{success}</span>}
        {state === "Sign Up" && (
          <div className="dilougue">
            By signing up, you agree to our <b>terms of service</b> and
            <b>privacy policy</b>. No credit card required.
          </div>
        )}
        <div className="footer" onClick={handleSubmit}>
          {state === "Sign Up" ? "SIGN UP FOR FREE" : "LOG IN"}
        </div>
      </div>
    </div>
  );
}

export default Auth;
