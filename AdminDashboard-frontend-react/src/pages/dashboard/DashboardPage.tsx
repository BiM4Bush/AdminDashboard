import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';
import { BsGlobeAmericas } from 'react-icons/bs';

const DashboardPage = () => {
  return (
    <div className='pageTemplate2'>
      <PageAccessTemplate color='#000' icon={BsGlobeAmericas} role='Dashboard'>
        <div className='text-3xl space-y-2'>
          <h1>Dashboard Access can be either:</h1>
          <h1>Admin</h1>
          <h1>ProjectManager</h1>
          <h1>HrManager</h1>
          <h1>Employee</h1>
        </div>
      </PageAccessTemplate>
    </div>
  );
};

export default DashboardPage;