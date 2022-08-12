import './App.css';
import MakeTable from './components/MakeTable';
import DetailsTable from './components/DetailsTable';
import Hierarchy from './components/Hierarchy';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={
          <div className='App'>
            <MakeTable />
          </div>
        } >
        </Route>
        <Route path='/details' element={
          <div className='App'>
            <DetailsTable />
          </div>
        }>
        </ Route>
        <Route path='/hierarchy' element={
          <div className='App'>
            <Hierarchy />
          </div>
        }>
        </ Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
