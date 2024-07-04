import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "../../components/general/Button";
import {
  EMPLOYEES,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DEACTIVATE_EMPLOYEE,
  SORT_EMPLOYEE,
  FILTER_EMPLOYEE,
  SERACH_BY_NAME_EMPLOYEE,
  ASSIGN_EMPLOYEE,
} from "../../utils/globalConfig";
import axiosInstance from "../../utils/axiosInstance";
import { IEmployee, IEmployeeDto } from "../../types/employee.types";

const EmployeePage: React.FC = () => {
  const [employeesList, setEmployeesList] = useState<IEmployee[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<IEmployeeDto>({
    fullName: "",
    subdivision: "",
    position: "",
    status: "",
    peoplePartner: async () => {},
    outOfOfficeBalance: 0,
    photo: new Uint8Array(),
  });
  const [updatedEmployee, setUpdatedEmployee] = useState<Partial<IEmployee>>({
    fullName: "",
    subdivision: "",
    position: "",
    status: "",
    photo: new Uint8Array(),
  });
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [detailedEmployee, setDetailedEmployee] = useState<IEmployee | null>(
    null
  );

  useEffect(() => {
    fetchEmployees();
  }, [sortBy, filterBy, filterValue, searchName]);

  const fetchEmployees = async () => {
    try {
      let url = EMPLOYEES;
      if (sortBy) {
        url = `${SORT_EMPLOYEE}?sortBy=${sortBy}`;
      } else if (filterBy && filterValue) {
        url = `${FILTER_EMPLOYEE}?filterBy=${filterBy}&filterValue=${filterValue}`;
      } else if (searchName) {
        url = `${SERACH_BY_NAME_EMPLOYEE}?fullName=${searchName}`;
      }

      const response = await axiosInstance.get(url);
      setEmployeesList(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async (
    employeeDto: IEmployeeDto,
    file: File | null
  ) => {
    const formData = new FormData();
    formData.append("fullName", employeeDto.fullName);
    formData.append("subdivision", employeeDto.subdivision);
    formData.append("position", employeeDto.position);
    formData.append("status", employeeDto.status);
    if (file) {
      formData.append("photo", file);
    }

    try {
      await axiosInstance.post(CREATE_EMPLOYEE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchEmployees();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeactivateEmployee = async (id: number) => {
    try {
      await axiosInstance.put(`${DEACTIVATE_EMPLOYEE}/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deactivating employee:", error);
    }
  };

  const handleAssignToProject = async (id: number, projectId: number) => {
    try {
      await axiosInstance.put(`${ASSIGN_EMPLOYEE}/${id}`, { projectId });
      fetchEmployees();
    } catch (error) {
      console.error("Error assigning employee to project:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        photo: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddEmployee(newEmployee, newEmployee.photo as File);
  };

  const showUpdateEmployeeForm = (employee: IEmployee) => {
    setSelectedEmployee(employee);
    setUpdatedEmployee({
      fullName: employee.fullName,
      subdivision: employee.subdivision,
      position: employee.position,
      status: employee.status,
      photo: employee.photo,
    });
    setShowUpdateForm(true);
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedEmployee) {
        await axiosInstance.put(
          `${UPDATE_EMPLOYEE}/${selectedEmployee.id}`,
          updatedEmployee
        );
        fetchEmployees();
        setShowUpdateForm(false);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const fetchEmployeeDetails = async (id: number) => {
    try {
      const response = await axiosInstance.get(`${EMPLOYEES}/${id}`);
      setDetailedEmployee(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <div className="bg-white p-2 rounded-md">
      <h1 className="text-xl font-bold">Employees Table</h1>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border p-1 rounded-md"
          />
          <Button
            label="Search"
            onClick={fetchEmployees}
            type="button"
            variant="secondary"
          />
        </div>
        <div className="flex space-x-2">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="border p-1 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="fullname">Full Name</option>
            <option value="subdivision">Subdivision</option>
            <option value="position">Position</option>
            <option value="status">Status</option>
          </select>
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            value={filterBy}
            className="border p-1 rounded-md"
          >
            <option value="">Filter By</option>
            <option value="subdivision">Subdivision</option>
            <option value="position">Position</option>
            <option value="status">Status</option>
          </select>
          <input
            type="text"
            placeholder="Filter value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border p-1 rounded-md"
          />
          <Button
            label="Filter"
            onClick={fetchEmployees}
            type="button"
            variant="secondary"
          />
        </div>
        <Button
          label="Add"
          onClick={() => setShowAddForm(true)}
          type="button"
          variant="primary"
        />
      </div>
      <div className="pageTemplate3 items-stretch">
        <div className="grid grid-cols-8 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
          <div>Full Name</div>
          <div>Subdivision</div>
          <div>Position</div>
          <div>Status</div>
          <div>Out Of Office Balance</div>
          <div>Operations</div>
        </div>
        {Array.isArray(employeesList) &&
          employeesList.map((employee) => (
            <div
              key={employee.id}
              className="grid grid-cols-8 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200 rounded-md"
            >
              <div className="flex items-center font-semibold">
                {employee.fullName}
              </div>
              <div className="flex items-center">{employee.subdivision}</div>
              <div className="flex items-center">{employee.position}</div>
              <div className="flex items-center">{employee.status}</div>
              <div className="flex items-center">
                {employee.outOfOfficeBalance}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  label="Details"
                  onClick={() => fetchEmployeeDetails(employee.id)}
                  type="button"
                  variant="primary"
                />
                <Button
                  label="Update"
                  onClick={() => showUpdateEmployeeForm(employee)}
                  type="button"
                  variant="primary"
                />
                <Button
                  label="Deactivate"
                  onClick={() => handleDeactivateEmployee(employee.id)}
                  type="button"
                  variant="danger"
                />
                <Button
                  label="Assign"
                  onClick={() => handleAssignToProject(employee.id, 1)}
                  type="button"
                  variant="secondary"
                />
              </div>
            </div>
          ))}
        {showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={newEmployee.fullName}
                    onChange={handleInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Subdivision</label>
                  <input
                    type="text"
                    name="subdivision"
                    value={newEmployee.subdivision}
                    onChange={handleInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={newEmployee.position}
                    onChange={handleInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={newEmployee.status}
                    onChange={handleInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Photo</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    className="border p-1 rounded-md w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    label="Cancel"
                    onClick={() => setShowAddForm(false)}
                    type="button"
                    variant="danger"
                  />
                  <Button
                    label="Add Employee"
                    onClick={() => handleSubmit}
                    type="submit"
                    variant="primary"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {showUpdateForm && selectedEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-bold mb-4">Update Employee</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={updatedEmployee.fullName}
                    onChange={handleUpdateInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Subdivision</label>
                  <input
                    type="text"
                    name="subdivision"
                    value={updatedEmployee.subdivision}
                    onChange={handleUpdateInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={updatedEmployee.position}
                    onChange={handleUpdateInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={updatedEmployee.status}
                    onChange={handleUpdateInputChange}
                    className="border p-1 rounded-md w-full"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    label="Cancel"
                    onClick={() => setShowUpdateForm(false)}
                    type="button"
                    variant="danger"
                  />
                  <Button
                    label="Update Employee"
                    onClick={() => handleUpdateSubmit}
                    type="submit"
                    variant="primary"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {showDetailsModal && detailedEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-bold mb-4">Employee Details</h2>
              <div className="mb-4">
                <strong>Full Name:</strong> {detailedEmployee.fullName}
              </div>
              <div className="mb-4">
                <strong>Subdivision:</strong> {detailedEmployee.subdivision}
              </div>
              <div className="mb-4">
                <strong>Position:</strong> {detailedEmployee.position}
              </div>
              <div className="mb-4">
                <strong>Status:</strong> {detailedEmployee.status}
              </div>
              <div className="flex justify-end">
                <Button
                  label="Close"
                  onClick={() => setShowDetailsModal(false)}
                  type="button"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePage;
