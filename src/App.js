import './styles.css';
import Header from './Header';
import Main from './Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/game/:path" element={<div></div>} />
        <Route path="/card/:id" element={<div></div>} />
        <Route path="">404: Oops!</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
