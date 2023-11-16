import { useState } from "react";
// import { useDispatch } from "react-redux";

import { toast, Toaster } from "react-hot-toast";

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
      return toast.error("Fields cannot be empty.");
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
        <label>
          Введіть ваш email
          <input
            type="email"
            name="email"
            value={email}
            className={` ${borderColorMailInpt}`}
            placeholder="yuormail@miraplay.com"
            onChange={handleChange}
          ></input>
        </label>

        <label>Введіть ваш пароль</label>
        <input
          type={password}
          name="password"
          value={password}
          className={` ${borderColorPassInpt}`}
          placeholder="Ваш пароль"
          onChange={handleChange}
        ></input>
      </form>
      <button type="submit">Реєстрація</button>
      <Toaster />
    </div>
  );
}
