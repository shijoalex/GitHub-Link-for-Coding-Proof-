import { useEffect, useState } from 'react'

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  return (
    <time className="current-time" dateTime={currentTime.toISOString()}>
      {currentTime.toLocaleTimeString()}
    </time>
  )
}

export default CurrentTime
