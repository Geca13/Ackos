

import React from 'react'
import { useParams, Link } from 'react-router-dom'

const url = '/auth/product/'

const ProductPage = () => {
  const {id} = useParams();
  
  const [item, setItem] = React.useState(null);
  React.useEffect (() => {
    
    async function getItem() {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json();
        setItem(data)
        
      } catch (error) {
        console.log(error)
        
      }
    }
    getItem();
  },[id])
   
   if(!item) {
     return <h2 className='section-title'>Item doesnt exist</h2>
   }
   const {description,priceOnPack,imageUrl} = item;
   
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        Back
      </Link>
       <h2 className='section-title'>{description} </h2>
       <div className='drink'>
        <img src={imageUrl} alt='image' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>price :</span> {priceOnPack}
          </p>
          <p>
            <span className='drink-data'>category :</span> 
          </p>
          <p>
            <span className='drink-data'>info :</span> {priceOnPack}
          </p>
          <p>
            <span className='drink-data'>glass :</span> {priceOnPack}
          </p>
          <p>
            <span className='drink-data'>instructions :</span> {priceOnPack}
          </p>
          
        </div>
       </div>
    </section>
  )
}

export default ProductPage