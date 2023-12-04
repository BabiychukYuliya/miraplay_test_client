import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { useSignUp, useSignIn } from "../redux/auth/operations";
import { authApi } from "../redux/auth/operations.ts";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [
    loginUser,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError },
  ] = authApi.useLoginUserMutation();
  const [
    registerUser,
    {
      data: loginDataRegister,
      isSuccess: isLoginSuccessRegister,
      isError: isLoginErrorRegister,
    },
  ] = authApi.useRegisterUserMutation();
  // const { signUpUser } = useSignUp();
  // const { signInUser } = useSignIn();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      !isSignUp
        ? await loginUser({ email, password })
        : await registerUser({ email, password });
    } else {
      toast.error("Please enter all required fields");
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User logged in successfully");
      navigate("/games");
    }
  }, [isLoginSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2>Спробуй нові відчуття</h2>
        <p className="Authorization_subTitle">
          {isSignUp
            ? "Зареєструйся, щоб грати на максималках у свої улюблені ігри"
            : "Увійди, щоб грати на максималках у свої улюблені ігри"}
        </p>
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
        <button type="submit" disabled={!email || !password}>
          {isSignUp ? "Реєстрація" : "Вхід"}
        </button>
      </form>

      <button type="button" onClick={() => setIsSignUp(true)}>
        {isSignUp ? "Вже є аккаунт?" : "Потрібен аккаунт?"} Натисни тут
      </button>
    </div>
  );
}
