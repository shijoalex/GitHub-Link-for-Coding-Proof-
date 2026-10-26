import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const decrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div className="mt-3 p-4 border rounded shadow bg-light counter-box">
      <h2 className="text-center mb-3">Counter</h2>
      <p className="bg-warning rounded pt-2 pb-2 px-3 mx-2 text-center fw-bold">
        Count: {count}
      </p>
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-primary" onClick={increment}>Increment</button>
        <button className="btn btn-danger" onClick={decrement}>Decrement</button>
        <button className="btn btn-secondary" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Counter
