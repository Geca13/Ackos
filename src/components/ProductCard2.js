import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard2 = ({ name, description, priceOnPack, priceOnPiece, id }) => {
    return (
      <article className='cocktail'>
        <div className='img-container'>
           
        </div>
        <div className='cocktail-footer'>
       <h3>{description}</h3>
       <h3>{name}</h3>
       <Link to= {`/product/${id}`} className='btn btn-primary btn-details'>
         Details
       </Link>
        </div>
      </article>
    )
  }
  
  export default ProductCard2