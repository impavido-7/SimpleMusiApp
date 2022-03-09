import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PostFile from './components/postFile';
import GetFile from "./components/GetFile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<GetFile />} />
          <Route path="/postFile" element={<PostFile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
