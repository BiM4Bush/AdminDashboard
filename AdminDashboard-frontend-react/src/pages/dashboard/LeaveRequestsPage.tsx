import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "../../components/general/Button";
import {
  LEAVE_REQUEST,
  SORT_LEAVE_REQUEST,
  CANCEL_LEAVE_REQUEST,
  CREATE_LEAVE_REQUEST,
  FILTER_LEAVE_REQUEST,
  UPDATE_LEAVE_REQUEST,
  DETAILS_LEAVE_REQUEST,
} from "../../utils/globalConfig";
import axiosInstance from "../../utils/axiosInstance";
import {
  ILeaveRequest,
  ILeaveRequestDto,
} from "../../types/leave-request.type";

const LeaveRequestPage: React.FC = () => {
  const [leaveRequestsList, setLeaveRequestsList] = useState<ILeaveRequest[]>(
    []
  );
  const [sortBy, setSortBy] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newLeaveRequest, setNewLeaveRequest] = useState<ILeaveRequestDto>({
    employee: {
      fullName: "",
      subdivision: "",
      position: "",
      status: "",
      peoplePartner: async () => {},
      outOfOfficeBalance: 0,
      photo: new Uint8Array(),
    },
    abscenseReason: "",
    startDate: new Date(),
    endDate: new Date(),
    comment: "",
    status: "",
  });

  useEffect(() => {
    fetchLeaveRequests();
  }, [sortBy, filterBy, filterValue]);

  const fetchLeaveRequests = async () => {
    try {
      let url = LEAVE_REQUEST;
      if (sortBy) {
        url = `${SORT_LEAVE_REQUEST}?sortBy=${sortBy}`;
      } else if (filterBy && filterValue) {
        url = `${FILTER_LEAVE_REQUEST}?filterBy=${filterBy}&filterValue=${filterValue}`;
      }

      const response = await axiosInstance.get(url);
      setLeaveRequestsList(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleAddLeaveRequest = async (leaveRequestDTO: ILeaveRequestDto) => {
    try {
      await axiosInstance.post(CREATE_LEAVE_REQUEST, leaveRequestDTO);
      fetchLeaveRequests();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding leave request: ", error);
    }
  };

  const handleUpdateLeaveRequest = async (
    id: number,
    updatedLeaveRequest: Partial<ILeaveRequestDto>
  ) => {
    try {
      await axiosInstance.put(
        `${UPDATE_LEAVE_REQUEST}/${id}`,
        updatedLeaveRequest
      );
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error updating leave request: ", error);
    }
  };

  const handleCancelLeaveRequest = async (id: number) => {
    try {
      await axiosInstance.put(`${CANCEL_LEAVE_REQUEST}/${id}`);
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error deactivating project:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLeaveRequest((prevLeaveRequest) => ({
      ...prevLeaveRequest,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddLeaveRequest(newLeaveRequest);
  };

  return (
    <div className="bg-white p-2 rounded-md">
      <h1 className="text-xl font-bold">Leave Requests Table</h1>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by employee name"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border p-1 rounded-md"
          />
          <Button
            label="Search"
            onClick={fetchLeaveRequests}
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
            <option value="employee.fullName">Employee</option>
            <option value="abscenseReason">Absence Reason</option>
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
            <option value="status">Status</option>
          </select>
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            value={filterBy}
            className="border p-1 rounded-md"
          >
            <option value="">Filter By</option>
            <option value="employee.fullName">Employee</option>
            <option value="abscenseReason">Absence Reason</option>
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
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
            onClick={fetchLeaveRequests}
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
      <div className="grid grid-cols-8 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
        <div>No</div>
        <div>Employee</div>
        <div>Absence Reason</div>
        <div>Start Date</div>
        <div>End Date</div>
        <div>Comment</div>
        <div>Status</div>
        <div>Operations</div>
      </div>
      {Array.isArray(leaveRequestsList) &&
        leaveRequestsList.map((leaveRequest, index) => (
          <div
            key={leaveRequest.id}
            className="grid grid-cols-8 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200 rounded-md"
          >
            <div className="flex items-center">{index + 1}</div>
            <div className="flex items-center font-semibold">
              {leaveRequest.employee.fullName}
            </div>
            <div className="flex items-center">
              {leaveRequest.abscenseReason}
            </div>
            <div className="flex items-center">
              {moment(leaveRequest.startDate).format("YYYY-MM-DD")}
            </div>
            <div className="flex items-center">
              {moment(leaveRequest.endDate).format("YYYY-MM-DD")}
            </div>
            <div className="flex items-center">{leaveRequest.comment}</div>
            <div className="flex items-center">{leaveRequest.status}</div>
            <div className="flex items-center space-x-2">
              <Button
                label="Update"
                onClick={() =>
                  handleUpdateLeaveRequest(leaveRequest.id, leaveRequest)
                }
                type="button"
                variant="primary"
              />
              <Button
                label="Cancel"
                onClick={() => handleCancelLeaveRequest(leaveRequest.id)}
                type="button"
                variant="danger"
              />
            </div>
          </div>
        ))}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Add New Leave Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Employee</label>
                <input
                  type="text"
                  name="employee"
                  value={newLeaveRequest.employee.fullName} // Assuming you want to display employee's full name
                  onChange={handleInputChange} // Adjust accordingly if you need to select an employee
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Absence Reason</label>
                <input
                  type="text"
                  name="abscenseReason"
                  value={newLeaveRequest.abscenseReason}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={moment(newLeaveRequest.startDate).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={moment(newLeaveRequest.endDate).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Comment</label>
                <input
                  type="text"
                  name="comment"
                  value={newLeaveRequest.comment}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newLeaveRequest.status}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  label="Cancel"
                  onClick={() => setShowAddForm(false)}
                  type="button"
                  variant="secondary"
                />
                <Button
                  label="Submit"
                  onClick={() => handleSubmit}
                  type="submit"
                  variant="primary"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default LeaveRequestPage;
