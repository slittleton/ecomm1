import React from 'react'

const ProductsGrid = (props) => {

  const {products} = props.products
  return(
    <div className="grid">
      {products.map(product => {
        return(
          <div className='grid-item' key={product._id}>
            <div>{product.name}</div>
            <div>${parseInt(product.price).toFixed(2)}</div>
          </div>
        )
      })}
    </div>
  )

}
export default ProductsGrid