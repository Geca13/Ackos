import React, { Component } from 'react'
import ProductCard2 from '../components/ProductCard2'
import { useParams, Link } from 'react-router-dom'

const url = '/auth/products/'



const Products = () => {
  const {id} = useParams();
  console.log(id)
  const [products, setProducts] = React.useState(null);
  React.useEffect (() => {
    
    async function getProducts() {
      try {
        const response = await fetch(`${url}${id}`)

        const data = await response.json();
        console.log(data)
        setProducts(data)
        
      } catch (error) {
        console.log(error)
        
      }
    }
    getProducts();
  },[id])
   
   if(!products) {
     return <h2 className='section-title'>products doesnt exist</h2>
   }
   
  return (
    
    <section className='section'>

      <h2 className='section-title'>Menu</h2>
      <div className='cocktails-center'>
       {products.map((product)=>{
         return <ProductCard2 key={product.id}{...product}/>
       })}
      </div>
    </section>
  )
    }
  
    export default Products
