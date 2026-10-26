import { useEffect, useState } from 'react'
import { logout, useUsername } from '../authStore.js'

function Dashboard() {
  const username = useUsername()
  const [inputText, setInputText] = useState('')
  const [textBoxContent, setTextBoxContent] = useState('')

  useEffect(() => {
    if (inputText.trim().toLowerCase() === 'java') {
      setTextBoxContent('Java is a popular, object-oriented programming language used to build reliable applications.')
    } else {
      setTextBoxContent(`You typed: ${inputText}`)
    }
  }, [inputText])

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome, {username}!</h1>
          <p className="dashboard-description">You are successfully logged in.</p>
        </div>
        <button className="logout-button" type="button" onClick={logout}>
          Logout
        </button>
      </header>

      <section className="dashboard-panel">
        <h2>Try the text box</h2>
        <p>Type Java to see a short description.</p>
        <input
          type="text"
          placeholder="Type here..."
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <textarea rows="5" value={textBoxContent} readOnly />
      </section>
    </main>
  )
}

export default Dashboard
