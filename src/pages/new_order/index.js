import React from 'react'
import Cart from '../../components/cart'
import MenuList from '../../components/menu_list'
import './index.js'

const NewOrderPage = () => {
  return (
    <div className='NewOrderPage'>
        <MenuList />
        <Cart />
    </div>
  )
}

export default NewOrderPage