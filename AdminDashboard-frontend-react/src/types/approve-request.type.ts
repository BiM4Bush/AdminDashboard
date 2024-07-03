import { IEmployeeDto } from "../types/employee.types";
import { ILeaveRequestDto } from "./leave-request.type";

export interface IApproveRequestDto {
  approver: IEmployeeDto;
  leaveRequest: ILeaveRequestDto;
  status: string;
  comments: string;
}


export interface IApproveRequest extends IApproveRequestDto {
  id: number;
  createdAt: string;
}