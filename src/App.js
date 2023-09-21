import './styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import CardSearch from './CardSearch';
import Card from './Card';
import Selection from './Selection';
import SelectionGame from './SelectionGame';

const App = () => {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/planes" element={<CardSearch />} />
        <Route exact path="/game" element={<Selection />} />
        <Route path="/game/:path/:card" element={<SelectionGame />} />
        <Route path="/plane/:id" element={<Card />} />
        <Route path="">404: Oops!</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
