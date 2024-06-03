/* eslint-disable no-unused-vars */

import Header from "./components/Header"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import AddContent from "./pages/AddContent"
import BookMarks from "./pages/BookMarks"
import Payment from "./pages/Payment"
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/upload" element={<AddContent />} />
        <Route path="/bookmarks" element={<BookMarks />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
