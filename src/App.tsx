import {Routes, Route} from 'react-router-dom';
import Layout from './components/layout';
import Dashboard from './pages/dashboard';
import City from './pages/city';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/city/:cityName' element={<City/>}/>
      </Routes>
    </Layout>
  )
}
