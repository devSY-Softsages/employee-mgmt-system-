import { useState, useEffect } from "react";
import Plus from "../images/plus-icon.svg";
import Edit from "../images/edit.svg";
import Delete from "../images/trash.svg";
import { useNavigate } from "react-router-dom";
import {
  fetchData,
  createResource,
  deleteEntry,
  updatingEntry,
} from "../components/api/index";

const initialstate = {
  name: "",
  designation: "",
  salary: "",
  projects_assigend: "",
  id: "",
};

export default function Home() {
  const [employeeData, setEmployeeData] = useState([]);
  const [newEmployee, setNewEmployee] = useState(initialstate);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeData.length]);

  const fetchEmployeeData = async () => {
    const data = await fetchData();
    console.log("data", data.response);
    setEmployeeData(data);
  };

  const onChangeHander = (event) => {
    setNewEmployee((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitData = () => {
    const { name, designation, salary, projects_assigend } = newEmployee;
    if (
      validate(name) ||
      validate(designation) ||
      validate(salary) ||
      validate(projects_assigend)
    ) {
      alert("Please enter complete fields");
      return;
    }
    if (!newEmployee.id) {
      createResource(newEmployee);
      alert("User added successfully");
    } else {
      updatingEntry(newEmployee);
      alert("User details updated successfully");
    }
    fetchEmployeeData();
    setNewEmployee(initialstate);
  };

  const validate = (str) => {
    if (str == "") {
      return true;
    } else return false;
  };

  const deleteEmployee = (userId) => {
    deleteEntry(userId);
    alert("User successfully deleted");
    fetchEmployeeData();
  };

  const editEmployee = (employeeData) => {
    setNewEmployee(employeeData);
  };

  const routeChange = () => {
    navigate("/json");
  };

  const { name, designation, salary, projects_assigend, id } = newEmployee;

  return (
    <div class="row">
      <div class="col-6 sm-12">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Operation on Employee Data</h3>
            <div className="data-operation-deck">
              <div className="d-flex">
                <span className="col-6">Employee Name</span>
                <input
                  className="col-6"
                  name="name"
                  value={name}
                  onChange={onChangeHander}
                ></input>
              </div>
              <div className="d-flex">
                <span className="col-6">Designation</span>
                <input
                  className="col-6"
                  name="designation"
                  value={designation}
                  onChange={onChangeHander}
                ></input>
              </div>
              <div className="d-flex">
                <span className="col-6">Salary</span>
                <input
                  className="col-6"
                  type="number"
                  name="salary"
                  value={salary}
                  onChange={onChangeHander}
                ></input>
              </div>
              <div className="d-flex">
                <span className="col-6">Projects Assigned</span>
                <input
                  className="col-6"
                  name="projects_assigend"
                  value={projects_assigend}
                  onChange={onChangeHander}
                ></input>
              </div>
            </div>
            <div className="action-btn"></div>
            <div className="d-flex justify-content-center">
              <button class="btn btn-primary" onClick={() => submitData()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 sm-12">
        <div class="card">
          <div class="card-body">
            <div className="d-flex">
              <h3 className="col-8 card-title">Employee Data Records</h3>
              <button
                className="col-4 btn btn-primary my-2"
                onClick={routeChange}
              >
                Json Placeholder
              </button>
            </div>
            <div className="home-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Projects Assigned</th>
                    <th className="mx-auto">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.length &&
                    employeeData.reverse().map((res, index) => (
                      <tr key={index}>
                        <td> {res.name || "-"} </td>
                        <td> {res.designation || "-"} </td>
                        <td> {res.salary || "-"} </td>
                        <td> {res.projects_assigend || "-"} </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={Delete}
                              onClick={() => deleteEmployee(res.id)}
                            ></img>
                            <img
                              src={Edit}
                              onClick={() => editEmployee(res)}
                            ></img>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
