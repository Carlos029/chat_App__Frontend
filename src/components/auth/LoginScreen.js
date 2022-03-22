import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { startGoogleLogin, startLogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

  const dispatch = useDispatch()
  const [formValues, handleFormChange] = useForm({
    email: "", // test user tektgm@ail.com
    password: '' //1234596
  })
  const { email, password } = formValues;


  const handleLogin = (e) => {
    e.preventDefault()

    if (email.length > 5 && password.length > 5) {
      dispatch(startLogin(email, password))
    } else {
      Swal.fire('Error', 'Email and Password must be at least 5 characters long', 'error')
    }
  }

  const handleGoogleLogin = (e) => {
    dispatch(startGoogleLogin())
  }

  return (

    <>

      <h3 className='auth__title'>Login</h3>

      <form onSubmit={handleLogin}>

        <input
          className="auth__input"
          type="email"
          placeholder='Email'
          name="email"
          onChange={handleFormChange}
          value={email}
          autoComplete="off"
        />

        <input
          className="auth__input"
          type="password"
          placeholder='Password'
          name="password"
          onChange={handleFormChange}
          value={password}
          autoComplete="off"
        />
        <button className='btn btn-primary btn-block' type="submit">Login</button>
      </form>

      <br />
      
      <div className="google-btn" onClick={handleGoogleLogin}>
        <div className="google-icon-wrapper">
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
        </div>
        <p className="btn-text">
          <b>Login with Google</b>
        </p>
      </div>

      <br />
      <Link className="link" to='/auth/register'>Create a new Account</Link>


    </>
  )
}
