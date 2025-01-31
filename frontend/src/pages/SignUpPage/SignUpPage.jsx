import { useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../services/authService";
import SignUpIcon from "../../assets/images/signup.svg";
import styles from "./SignUpPage.module.css";

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
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
      const user = await authService.signUp(formData);
      setUser(user);
      navigate("/hoots");
    } catch (err) {
      console.log(err);
      setErrorMsg("Sign Up Failed - Try Again");
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <main className={styles.container}>
      <section>
        <img src={SignUpIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Sign Up!</h1>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
        <p className="error-message">&nbsp;{errorMsg}</p>
      </section>
    </main>
  );
}
