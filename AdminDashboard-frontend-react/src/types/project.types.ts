export interface IProjectDto {
  projectType: string;
  startDate: Date;
  endDate: Date;
  projectManager: (
    fullName: string,
    subdivision: string,
    position: string,
    status: string,
    outOfOfficeBalance: number,
    photo: Uint8Array
  ) => Promise<void>;
  comment: string;
  status: string;
}

export interface IProject extends IProjectDto {
  id: number;
  createdAt: string;
}