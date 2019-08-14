import React,{ useState, useEffect} from 'react';
import {connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import Layout from '../layout/Layout';

const Home = (props) => {
  useEffect(()=>{
    props.getProducts()
  },[])

  return(
    <div className="home">
      <Layout title="HOME" description="Welcome to the art store">
          {JSON.stringify(props.products)}
      </Layout>
    </div>
  )
}
const mapstateToProps = state => {
  console.log(state);
  return {
    products: state.productReducer.productsBundle
  }
}

export default connect(mapstateToProps, {getProducts})(Home);
