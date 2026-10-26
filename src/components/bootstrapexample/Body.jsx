import Student from './Student'

const Body = () => {
  const studentInfo = [
    { id: 1, name: 'Shivang', marks: 90, className: 'MCA-D' },
    { id: 2, name: 'Sachin', marks: 100, className: 'MCA-D' },
  ]

  return (
    <main>
      <p className="bg-warning text-primary text-center py-2">Welcome to the app. Everything is working correctly.</p>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody className="table-warning">
          {studentInfo.map((student) => (
            <Student
              key={student.id}
              id={student.id}
              name={student.name}
              marks={student.marks}
              className={student.className}
            />
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Body
