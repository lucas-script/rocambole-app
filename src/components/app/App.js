import React, { Component } from 'react';
import Toastr from '../template/toastr'

import NavBar from '../template/navbar'
import Content from '../content/content'
import Cart from "../cart/cart"
import CartDetails from '../cart-details/cart-details'

class App extends Component {

    render = () => {
        return (
            <div>
                <Toastr/>
                <NavBar/>
                <Cart/>
                <Content/>
                <CartDetails/>
                <footer className="footer bg-primary">
                    <div className="container text-white">
                        <span>lucas.script@gmail.com @ 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
