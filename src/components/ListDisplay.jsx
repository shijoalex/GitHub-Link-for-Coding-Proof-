const students = [
  { id: 1, name: 'Sachin' },
  { id: 2, name: 'Tanya' },
  { id: 3, name: 'Shivang' },
]

const ListDisplay = () => {
  return (
    <div className="mt-4">
      <h3 className="mb-3 text-center">Student List</h3>
      <ul className="list-group">
        {students.map((student) => (
          <li key={student.id} className="list-group-item text-center">
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListDisplay


