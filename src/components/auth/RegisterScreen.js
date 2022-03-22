import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { startRegister } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

  const dispatch = useDispatch()
  const [formValues, handleFormChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formValues

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.length < 6 || email.length < 6 || name.length < 6) {
      Swal.fire('Error', 'All values must be at least 5 characters long', 'error')
      return
    } else if (password !== password2) {
      Swal.fire('Error', 'The passwords do not match', 'error')
      return
    }

    dispatch(startRegister(name, email, password))

  }

  return (
    <>

      <h3 className='auth__title'>Register</h3>

      <form onSubmit={handleRegister}>

        <input
          className='auth__input'
          placeholder='Name'
          name='name'
          value={name}
          onChange={handleFormChange}
          type="text"
          autoComplete="off"
        />

        <input
          className='auth__input'
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleFormChange}
          type="email"
          autoComplete="off"
        />

        <input
          className='auth__input'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleFormChange}
          type="password"
          autoComplete="off"
        />

        <input
          className='auth__input'
          placeholder='Password'
          name='password2'
          value={password2}
          onChange={handleFormChange}
          type="password"
          autoComplete="off"
        />

        <button className='btn btn-primary btn-block mt-4' type="submit">Register</button>

      </form>

      <Link className="link" to='/auth/login'>Registered already?</Link>


    </>
  )
}
