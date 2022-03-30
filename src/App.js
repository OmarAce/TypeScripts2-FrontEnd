import './App.css';
import { Outlet } from 'react-router-dom'
import Navbar from './components/navigation'
// import Type from './routes/type'
function App() {

  return (
    <div className="bg-gradient-to-b from-black via-black  to-stone-800 min-h-screen">

      <Navbar />

      <div className="w-2/3 mx-auto text-white text-2xl ">

        <Outlet className='max-h-10' />

      </div>
    </div>
  );
}

export default App;
