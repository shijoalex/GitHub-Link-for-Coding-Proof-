import React from 'react'

const Student = (props) => {
  const { id, name, marks, className } = props

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{marks}</td>
      <td>{className}</td>
    </tr>
  )
}

export default Student