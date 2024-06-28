import GlobalRouter from './routes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='bg-red-500 p-8'>
      <GlobalRouter />
      <Toaster />
    </div>
  )
}

export default App