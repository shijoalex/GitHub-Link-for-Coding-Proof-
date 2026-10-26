import { useState } from 'react'
import { login } from '../authStore.js'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      setError('Please enter your name to continue.')
      return
    }

    login(trimmedUsername)
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">FirstApp</p>
        <h1>Welcome back</h1>
        <p className="login-description">Enter your name to access your dashboard.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">User name</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
              setError('')
            }}
          />
          {error && <p className="form-error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  )
}

export default LoginForm
