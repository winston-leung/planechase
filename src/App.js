import './styles.css';
import Header from './Header';
import Main from './Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import getScrollbarWidth from "./getScrollBarWidth";
import useBodyScrollable from "./useBodyScrollable";
import { useLayoutEffect } from "react";

const App = () => {
  const scrollbarWidth = getScrollbarWidth();
  const bodyScrollable = useBodyScrollable();

  useLayoutEffect(() => {
    if (bodyScrollable) {
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.paddingRight = `${scrollbarWidth + 10}px`;
    }
    // eslint-disable-next-line
  }, [bodyScrollable]);

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
