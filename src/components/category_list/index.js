import React, { useContext } from 'react'
import { AppContext } from '../../context/app_context'
import './index.css'

const CategoryList = ({categories}) => {
  const { activeCat, setActiveCat } = useContext(AppContext);
  // let categories = props.categories;
  // when we render, we want to grab that array
  console.log(activeCat);

  const handleCatClick = (cat) => {
    setActiveCat(cat.name)
  }

  let categoriesJSX = categories.map((cat) => {
    return (
      <li 
      key={cat._id}
      className={cat.name === activeCat ? "active" : ''}
      onClick={() => handleCatClick(cat)}
      >{cat.name}</li>
    )
  })


  // grab our categories
  

  return (
    <ul className="CategoryList">
      {/* a bunch of li tags with our categories */}
      {categoriesJSX}
    </ul>
  )
}

export default CategoryList