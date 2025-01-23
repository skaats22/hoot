import { useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../services/authService";

import LoginIcon from "../../assets/images/login.svg";
import styles from "./LogInPage.module.css";

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      navigate("/hoots");
    } catch (err) {
      console.log(err);
      setErrorMsg("Log In Failed - Try Again");
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <main className={styles.container}>
      <section>
        <img src={LoginIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Log In!</h2>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <p className="error-message">&nbsp;{errorMsg}</p>
      </section>
    </main>
  );
}
