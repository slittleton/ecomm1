import React from 'react';

import Layout from '../layout/Layout';

const Cart = (props) => {

  return(
    <div className="cart">
      <Layout title="Cart" description={`Welcome ${props.user.name}`}>
        
      </Layout>
    </div>
  )
}

export default Cart;