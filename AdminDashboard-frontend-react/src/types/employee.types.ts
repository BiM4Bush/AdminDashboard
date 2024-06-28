export interface IEmployeeDto {
  fullName: string;
  subdivision: string;
  position: string;
  status: string;
  peoplePartner: (
    fullName: string,
    subdivision: string,
    position: string,
    status: string,
    outOfOfficeBalance: number,
    photo: Uint8Array
  ) => Promise<void>;
  outOfOfficeBalance: number;
  photo: Uint8Array;
}
