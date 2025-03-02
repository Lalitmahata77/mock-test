// Login.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/api/user/userApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const {userInfo} = useSelector((state)=>state.auth)
  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"
  
  useEffect(()=>{
      if (userInfo) {
          navigate(redirect)
      }
  },[navigate,redirect,userInfo])
  
  const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await login({ email, password }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;