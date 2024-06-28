import UserCountCard from './UserCountCard';
import { IAuthUser, RolesEnum } from '../../../types/auth.types';
import { FaUser, FaUserCog, FaUserShield, FaUserTie } from 'react-icons/fa';

interface IProps {
  usersList: IAuthUser[];
}

const UserCountSection = ({ usersList }: IProps) => {
  let admins = 0;
  let projectManagers = 0;
  let hrManagers = 0;
  let employees = 0;

  usersList.forEach((item) => {
    if (item.roles.includes(RolesEnum.ADMIN)) {
      admins++;
    } else if (item.roles.includes(RolesEnum.PROJECTMANAGER)) {
      projectManagers++;
    } else if (item.roles.includes(RolesEnum.HRMANAGER)) {
      hrManagers++;
    } else if (item.roles.includes(RolesEnum.EMPLOYEE)) {
      employees++;
    }
  });

  const userCountData = [
    { count: admins, role: RolesEnum.ADMIN, icon: FaUserCog, color: '#3b3549' },
    { count: projectManagers, role: RolesEnum.PROJECTMANAGER, icon: FaUserShield, color: '#9333EA' },
    { count: hrManagers, role: RolesEnum.HRMANAGER, icon: FaUserTie, color: '#0B96BC' },
    { count: employees, role: RolesEnum.EMPLOYEE, icon: FaUser, color: '#FEC223' },
  ];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-4'>
      {userCountData.map((item, index) => (
        <UserCountCard key={index} count={item.count} role={item.role} icon={item.icon} color={item.color} />
      ))}
    </div>
  );
};

export default UserCountSection;