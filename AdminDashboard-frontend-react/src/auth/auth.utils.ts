import { IAuthUser, RolesEnum } from '../types/auth.types';
import axiosInstance from '../utils/axiosInstance';

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  return localStorage.getItem('accessToken');
};

export const allAccessRoles = [RolesEnum.ADMIN, RolesEnum.PROJECTMANAGER, RolesEnum.HRANAGER, RolesEnum.EMPLOYEE];
export const employeeAccessRole = [RolesEnum.ADMIN, RolesEnum.EMPLOYEE];
export const hrManagerAccessRoles = [RolesEnum.ADMIN, RolesEnum.HRANAGER];
export const projectManagerAccessRoles = [RolesEnum.PROJECTMANAGER, RolesEnum.ADMIN];
export const adminAccessRoles = [RolesEnum.ADMIN];

// We need to specify which Roles can be updated by Logged-in user
export const allowedRolesForUpdateArray = (loggedInUser?: IAuthUser): string[] => {
  return loggedInUser?.roles.includes(RolesEnum.ADMIN)
    ? [RolesEnum.ADMIN, RolesEnum.PROJECTMANAGER, RolesEnum.HRANAGER, RolesEnum.EMPLOYEE]
    : [RolesEnum.PROJECTMANAGER, RolesEnum.HRANAGER, RolesEnum.EMPLOYEE];
};

// we need to control that Admin cannot change admin role
// Also, else roles cannot change admin role
export const isAuthorizedForUpdateRole = (loggedInUserRole: string, selectedUserRole: string) => {
  let result = true;
  if (loggedInUserRole === RolesEnum.ADMIN && selectedUserRole === RolesEnum.ADMIN) {
    result = false;
  } else if (
    loggedInUserRole === RolesEnum.PROJECTMANAGER || RolesEnum.HRANAGER || RolesEnum.EMPLOYEE &&
    (selectedUserRole === RolesEnum.ADMIN)
  ) {
    result = false;
  }

  return result;
};