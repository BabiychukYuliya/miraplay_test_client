import { useState } from "react";
// import { useDispatch } from "react-redux";

import { Toaster } from "react-hot-toast";
import { ToasterNotify } from "components/Notify/Notify";

export default function Login() {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [borderColorMailInpt, setBorderColorMailInpt] = useState("main");
  const [borderColorPassInpt, setBorderColorPassInpt] = useState("main");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setBorderColorMailInpt("fail");
    }
    if (password === "") {
      setBorderColorPassInpt("fail");
    }
    if (email === "" || password === "") {
      return ToasterNotify("Fields cannot be empty.");
    }
    if (email !== "" && password !== "") {
      setBorderColorMailInpt("main");
      setBorderColorPassInpt("main");
      // dispatch(logIn({ email, password }));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <p>email</p>
        <label>
          Введіть ваш email
          <input
            id="log"
            type="email"
            name="email"
            value={email}
            className={` ${borderColorMailInpt}`}
            placeholder="Enter your email"
            onChange={handleChange}
          ></input>
        </label>

        <p>password</p>
        <label>Введіть ваш пароль</label>
        <input
          id="log"
          type={password}
          name="password"
          value={password}
          className={` ${borderColorPassInpt}`}
          placeholder="Enter password"
          onChange={handleChange}
        ></input>
      </form>
      <button type="submit">Руєстрація</button>
      <Toaster />
    </div>
  );
}
