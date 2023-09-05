import React, { useContext } from 'react'
import { AppContext } from '../../context/app_context';
import CartItem from '../cart_item';
import axios from 'axios'
import './index.css'

const Cart = ({handleChangeQty}) => {
    // handleChangeQuantity to add something to cart, change qty, or remove is qty <= 0
    // handleCheckout
    // checkoutDone == false
    let { cart, setCart } = useContext(AppContext)

    console.log(cart.orderItems);

    let orderItemsJSX = cart.orderItems.map((cartItem) => {
        return <CartItem cartItem={cartItem} checkoutDone={cart.checkoutDone}  key={cartItem._id}/>
    })

    const handleCheckout = async () => {
        let response = await axios({
            method: "PUT",
            url: "/checkout",
        })

        console.log(response);
        setCart(response.data);
    }
  return (
    <div className="OrderDetail">
        <div className='SectionHeading'>
            {cart.checkoutDone ?
            <>
                <span>ORDER  <span>D442DGF</span></span>
                <span>date of order</span> 
            </>
            :
            <>
                <span>NEW ORDER</span>
                <span>{new Date().toLocaleDateString()}</span> 
            </>
            }
  
        </div>
        <div className="OrderItemContainer">
            {/* various order items here */}
            {orderItemsJSX}
            <section>
                {cart.checkoutDone ? 
                <span>TOTAL</span>
                :
                <button className="btn-sm" onClick={handleCheckout}>Checkout</button>    
                }
                <span>{cart.totalQty}</span>
                <span className="right">{cart.orderTotal}</span>
            </section>
        </div>
    </div>
  )
}

export default Cart