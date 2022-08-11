import './App.css';
import MakeTable from './components/MakeTable'
import DetailsTable from './components/DetailsTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={
          <div className='app'>
            <MakeTable />
          </div>
        } >
        </Route>
        <Route path='/details' element={
          <div className='app'>
            <DetailsTable />
          </div>
        }>
        </ Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
