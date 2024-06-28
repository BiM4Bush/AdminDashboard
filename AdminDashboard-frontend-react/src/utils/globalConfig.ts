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
export const CREATE_EMPLOYEE = '/Employees/create';
export const UPDATE_EMPLOYEE = '/Employees/update';
export const DEACTIVATE_EMPLOYEE = '/Employees/deactivate';
export const SORT_EMPLOYEE = '/Employees/sort';
export const FILTER_EMPLOYEE = '/Employees/filter';
export const SERACH_BY_NAME_EMPLOYEE = '/Employees/serach-by-name';
export const DETAILS_EMPLOYEE = '/Employees/details';
export const ASSIGN_EMPLOYEE = '/Employees/assign';
//URLS Approval Requests
export const SORT_APPROVAL_REQUEST = '/Approval-requests/sort';
export const FILTER_APPROVAL_REQUEST = '/Approval-requests/filter';
export const DETAILS_APPROVAL_REQUEST = '/Approval-requests/details';
export const APPROVE_APPROVAL_REQUEST = '/Approval-requests/approve';
export const REJECT_APPROVAL_REQUEST = '/Approval-requests/reject';
//URLS Leave Requests
export const SORT_LEAVE_REQUEST = '/Leave-requests/sort';
export const FILTER_LEAVE_REQUEST = '/Leave-requests/filter';
export const DETAILS_LEAVE_REQUEST = '/Leave-requests/details';
export const CREATE_LEAVE_REQUEST = '/Leave-requests/create';
export const UPDATE_LEAVE_REQUEST = '/Leave-requests/update';
export const SUBMIT_LEAVE_REQUEST = '/Leave-requests/submit';
export const CANCEL_LEAVE_REQUEST = '/Leave-requests/cancel';
//URLS Projects
export const SORT_PROJECT = '/Projects/sort';
export const FILTER_PROJECT = '/Projects/filter';
export const DETAILS_PROJECT = '/Projects/details';
export const CREATE_PROJECT = '/Projects/create';
export const UPDATE_PROJECTS = '/Projects/update';
export const DEACTIVATE_PROJECTS = '/Projects/deactivate';
// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;