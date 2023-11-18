import { useState } from "react";

import { toast, Toaster } from "react-hot-toast";
import { useSignUp, useSignIn } from "../redux/auth/operations";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { signUpUser } = useSignUp();
  const { signInUser } = useSignIn();

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

    if (email === "" || password === "") {
      return toast.error("Fields cannot be empty.");
    }
    if (isSignUp) {
      signUpUser({ email, password });
    } else {
      signInUser({ email, password });
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
            placeholder="yuormail@miraplay.com"
            onChange={handleChange}
          ></input>
        </label>

        <label>Введіть ваш пароль</label>
        <input
          type={password}
          name="password"
          value={password}
          placeholder="Ваш пароль"
          onChange={handleChange}
        ></input>
      </form>
      <button type="submit">Реєстрація</button>
      <Toaster />
    </div>
  );
}
