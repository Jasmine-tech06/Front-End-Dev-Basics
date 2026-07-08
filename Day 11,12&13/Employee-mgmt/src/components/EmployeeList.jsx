import { FaEdit, FaTrash } from "react-icons/fa";

import "../styles/employeeList.css";

function EmployeeList({

  employees,

  onDelete,

  onEdit,

}) {

  return (

    <div className="employee-list">

      <h2 className="employee-title">

        Employee Directory

      </h2>

      <table>

        <thead>

          <tr>

            <th>Employee</th>

            <th>Department</th>

            <th>Email</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {

            employees.length === 0 ? (

              <tr>

                <td

                  colSpan="4"

                  className="empty"

                >

                  No Employees Found

                </td>

              </tr>

            ) : (

              employees.map((employee) => (

                <tr key={employee.id}>

                  <td>

                    <div className="employee-info">

                      <div className="avatar">

                        {employee.name.charAt(0).toUpperCase()}

                      </div>

                      <div>

                        <h4>{employee.name}</h4>

                      </div>

                    </div>

                  </td>

                  <td>

                    <span className="badge">

                      {employee.department}

                    </span>

                  </td>

                  <td>{employee.email}</td>

                  <td>

                    <button

                      className="edit-btn"

                      onClick={() => onEdit(employee)}

                    >

                      <FaEdit />

                    </button>

                    <button

                      className="delete-btn"

                      onClick={() => onDelete(employee.id)}

                    >

                      <FaTrash />

                    </button>

                  </td>

                </tr>

              ))

            )

          }

        </tbody>

      </table>

    </div>

  );

}

export default EmployeeList;