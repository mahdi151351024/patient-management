import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;