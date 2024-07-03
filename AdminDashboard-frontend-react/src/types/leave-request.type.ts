import { IEmployeeDto } from "../types/employee.types";

export interface ILeaveRequestDto {
  employee: IEmployeeDto;
  abscenseReason: string;
  startDate: Date;
  endDate: Date;
  comment: string;
  status: string;
}


export interface ILeaveRequest extends ILeaveRequestDto {
  id: number;
  createdAt: string;
}