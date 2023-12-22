import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProductListContainer, NavBar, ProductDetailContainer, PurchaseForm, Order } from "./Components"
import { Home } from "./Components/Home/Home"
import Contacto from "./Components/Contacto/Contacto"
import { Cart } from "./Components/Cart/Cart"
import { CartContextProvider } from "./CartContext/CartContext"

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <NavBar />
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product" element={<ProductListContainer greeting={""}/>} />
        <Route path="/product/:id" element={<ProductDetailContainer/>} />
        <Route path="/contact" element={<Contacto/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/purchase-form" element={<PurchaseForm/>}/>
        </Routes>
      </CartContextProvider>
      
    </BrowserRouter>

    
  )
}

export default App

