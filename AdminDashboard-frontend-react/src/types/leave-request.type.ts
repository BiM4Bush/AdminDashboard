export interface ILeaveRequestDto {
  employee: (
    fullName: string,
    subdivision: string,
    position: string,
    status: string,
    outOfOfficeBalance: number,
    photo: Uint8Array
  ) => Promise<void>;
  abscenseReason: string;
  startDate: Date;
  endDate: Date;
  commment: string;
  status: string;
}
