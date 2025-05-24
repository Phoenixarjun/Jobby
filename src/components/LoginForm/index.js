import React, {useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const history = useHistory()

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMessage => {
    setSubmitError(errorMessage)
    setShowSubmitError(true)
  }

  const submitForm = async e => {
    e.preventDefault()
    setUsernameError('')
    setPasswordError('')
    setShowSubmitError(false)

    let hasError = false

    if (username === '') {
      setUsernameError('Username is required')
      hasError = true
    }

    if (password === '') {
      setPasswordError('Password is required')
      hasError = true
    }

    if (hasError) {
      return
    }

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      onSubmitFailure('Something went wrong')
    }
  }

  return (
    <div className="LoginForm-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        width={150}
      />
      <form className="form-container" onSubmit={submitForm}>
        <div className="input-container">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit" className="loginBtn">
          Login
        </button>
      </form>
      {showSubmitError && !usernameError && !passwordError && (
        <p className="error-message">*{submitError}</p>
      )}
    </div>
  )
}

export default LoginForm
