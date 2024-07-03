import { PATH_DASHBOARD, PATH_PUBLIC } from '../routes/paths';

// URLS
export const HOST_API_KEY = 'https://localhost:7111/api';
export const REGISTER_URL = '/Auth/register';
export const LOGIN_URL = '/Auth/login';
export const ME_URL = '/Auth/me';
export const USERS_LIST_URL = '/Auth/users';
export const UPDATE_ROLE_URL = '/Auth/update-role';
export const USERNAMES_LIST_URL = '/Auth/usernames';
export const LOGS_URL = '/Logs';
export const MY_LOGS_URL = '/Logs/mine';
// URLS Employees
export const EMPLOYEES = '/Employees';
export const CREATE_EMPLOYEE = '/Employees';
export const UPDATE_EMPLOYEE = '/Employees';
export const DEACTIVATE_EMPLOYEE = '/Employees/deactivate';
export const SORT_EMPLOYEE = '/Employees/sort';
export const FILTER_EMPLOYEE = '/Employees/filter';
export const SERACH_BY_NAME_EMPLOYEE = '/Employees/serach-by-name';
export const DETAILS_EMPLOYEE = '/Employees/details';
export const ASSIGN_EMPLOYEE = '/Employees/assign';
//URLS Approval Requests
export const APPROVAL_REQUEST = '/ApprovalRequests';
export const SORT_APPROVAL_REQUEST = '/ApprovalRequests/sort';
export const FILTER_APPROVAL_REQUEST = '/ApprovalRequests/filter';
export const DETAILS_APPROVAL_REQUEST = '/ApprovalRequests';
export const APPROVE_APPROVAL_REQUEST = '/ApprovalRequests/approve';
export const REJECT_APPROVAL_REQUEST = '/ApprovalRequests/reject';
//URLS Leave Requests
export const LEAVE_REQUEST = '/LeaveRequests';
export const SORT_LEAVE_REQUEST = '/LeaveRequests/sort';
export const FILTER_LEAVE_REQUEST = '/LeaveRequests/filter';
export const DETAILS_LEAVE_REQUEST = '/LeaveRrequests';
export const CREATE_LEAVE_REQUEST = '/LeaveRequests';
export const UPDATE_LEAVE_REQUEST = '/LeaveRequests/update';
export const CANCEL_LEAVE_REQUEST = '/LeaveRequests/cancel';
//URLS Projects
export const PROJECTS = '/Projects';
export const SORT_PROJECT = '/Projects/sort';
export const FILTER_PROJECT = '/Projects/filter';
export const DETAILS_PROJECT = '/Projects';
export const CREATE_PROJECT = '/Projects';
export const UPDATE_PROJECTS = '/Projects';
export const DEACTIVATE_PROJECTS = '/Projects/deactivate';
// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;