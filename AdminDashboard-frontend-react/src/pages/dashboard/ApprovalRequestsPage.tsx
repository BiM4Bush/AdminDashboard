import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "../../components/general/Button";
import {
  APPROVAL_REQUEST,
  APPROVE_APPROVAL_REQUEST,
  SORT_APPROVAL_REQUEST,
  FILTER_APPROVAL_REQUEST,
  REJECT_APPROVAL_REQUEST,
} from "../../utils/globalConfig";
import axiosInstance from "../../utils/axiosInstance";
import {
  IApproveRequest,
} from "../../types/approve-request.type";

const ApprovalRequestsPage: React.FC = () => {
  const [approveRequestsList, setApproveRequestsList] = useState<IApproveRequest[]>(
    []
  );
  const [sortBy, setSortBy] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");


  useEffect(() => {
    fetchApproveRequests();
  }, [sortBy, filterBy, filterValue]);

  const fetchApproveRequests = async () => {
    try {
      let url = APPROVAL_REQUEST;
      if (sortBy) {
        url = `${SORT_APPROVAL_REQUEST}?sortBy=${sortBy}`;
      } else if (filterBy && filterValue) {
        url = `${FILTER_APPROVAL_REQUEST}?filterBy=${filterBy}&filterValue=${filterValue}`;
      }

      const response = await axiosInstance.get(url);
      setApproveRequestsList(response.data);
    } catch (error) {
      console.error("Error fetching approve requests:", error);
    }
  };

  const handleApproveApprovalRequest = async (id: number) => {
    try {
      await axiosInstance.put(`${APPROVE_APPROVAL_REQUEST}/${id}`);
      fetchApproveRequests();
    } catch (error) {
      console.error("Error approve project:", error);
    }
  };
  const handleRejectApprovalRequest = async (id: number) => {
    try {
      await axiosInstance.put(`${REJECT_APPROVAL_REQUEST}/${id}`);
      fetchApproveRequests();
    } catch (error) {
      console.error("Error approve project:", error);
    }
  };

  return (
    <div className='bg-white p-2 rounded-md'>
      <h1 className='text-xl font-bold'>Approval Requests Table</h1>
      <div className='flex justify-between mb-4'>
        <div className='flex space-x-2'>
          <input
            type='text'
            placeholder='Search by approver name'
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className='border p-1 rounded-md'
          />
          <Button label='Search' onClick={fetchApproveRequests} type='button' variant='secondary'/>
        </div>
        <div className='flex space-x-2'>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className='border p-1 rounded-md'>
            <option value=''>Sort By</option>
            <option value='approver.fullName'>Approver</option>
            <option value='leaveRequest.employee.fullName'>Employee</option>
            <option value='leaveRequest.abscenseReason'>Absence Reason</option>
            <option value='leaveRequest.startDate'>Start Date</option>
            <option value='leaveRequest.endDate'>End Date</option>
            <option value='leaveRequest.status'>Leave Status</option>
            <option value='status'>Status</option>
          </select>
          <select onChange={(e) => setFilterBy(e.target.value)} value={filterBy} className='border p-1 rounded-md'>
            <option value=''>Filter By</option>
            <option value='leaveRequest.employee.subdivision'>Subdivision</option>
            <option value='leaveRequest.employee.position'>Position</option>
            <option value='leaveRequest.employee.status'>Employee Status</option>
            <option value='leaveRequest.status'>Leave Status</option>
            <option value='status'>Approval Status</option>
          </select>
          <input
            type='text'
            placeholder='Filter value'
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className='border p-1 rounded-md'
          />
          <Button label='Filter' onClick={fetchApproveRequests} type='button' variant='secondary' />
        </div>
      </div>
      <div className='grid grid-cols-8 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md'>
        <div>No</div>
        <div>Approver</div>
        <div>Employee</div>
        <div>Absence Reason</div>
        <div>Start Date</div>
        <div>End Date</div>
        <div>Leave Status</div>
        <div>Operations</div>
      </div>
      {Array.isArray(approveRequestsList) && approveRequestsList.map((approveRequest, index) => (
        <div
          key={approveRequest.id}
          className='grid grid-cols-8 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200 rounded-md'
        >
          <div className='flex items-center'>{index + 1}</div>
          <div className='flex items-center font-semibold'>{approveRequest.approver.fullName}</div>
          <div className='flex items-center'>{approveRequest.leaveRequest.employee.fullName}</div>
          <div className='flex items-center'>{approveRequest.leaveRequest.abscenseReason}</div>
          <div className='flex items-center'>{moment(approveRequest.leaveRequest.startDate).format('YYYY-MM-DD')}</div>
          <div className='flex items-center'>{moment(approveRequest.leaveRequest.endDate).format('YYYY-MM-DD')}</div>
          <div className='flex items-center'>{approveRequest.leaveRequest.status}</div>
          <div className='flex items-center space-x-2'>
            <Button
              label='Approve'
              onClick={() => handleApproveApprovalRequest(approveRequest.id)}
              type='button'
              variant='primary'
            />
            <Button
              label='Reject'
              onClick={() => handleRejectApprovalRequest(approveRequest.id)}
              type='button'
              variant='danger'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovalRequestsPage;
