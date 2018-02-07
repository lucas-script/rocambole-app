import React, { Component } from 'react';
import Toastr from '../template/toastr'

import NavBar from '../template/navbar'
import Content from '../content/content'
import Cart from "../cart/cart"
import CartDetails from '../cart-details/cart-details'
import Footer from '../template/footer'

class App extends Component {

    render = () => {
        return (
            <div>
                <Toastr/>
                <NavBar/>
                <Cart/>
                <Content/>
                <CartDetails/>
                <Footer/>
            </div>
        );
    }
}

export default App;
