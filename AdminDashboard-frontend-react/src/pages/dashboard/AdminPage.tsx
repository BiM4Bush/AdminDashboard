import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';
import { FaUserCog } from 'react-icons/fa';

const AdminPage = () => {
  return (
    <div className='pageTemplate2'>
    <PageAccessTemplate color='#3b3549' icon={FaUserCog} role='Admin' />
  </div>
  )
}

export default AdminPage