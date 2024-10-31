import ToolBar from './Components/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Content from './Containers/Content/Content.tsx';
import './App.css';
import Admin from './Containers/Admin/Admin.tsx';

const App = () => {
  return <>
    <ToolBar/>
    <div className="container my-5">
      <Routes>
        <Route path="/" element={<Content/>}/>
        <Route path="/pages/:pageName" element={<Content/>}/>
        <Route path="/pages/admin" element={<Admin/>}/>
        <Route path="*" element={<h1>Not found</h1>}/>
      </Routes>
    </div>
  </>;
};

export default App;
