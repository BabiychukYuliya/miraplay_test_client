import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { useSignUp, useSignIn } from "../redux/auth/operations";
import { authApi } from "../redux/auth/operations.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/auth/sliceAuth";

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
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
    },
  ] = authApi.useRegisterUserMutation();
  const dispatch = useDispatch();

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

    if (isSignUp) {
      await registerUser({ email, password });
    } else {
      await loginUser({ email, password });
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User logged in successfully");
      dispatch(
        loadUser({
          email,
          password,
          token: loginData.token,
        })
      );
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
