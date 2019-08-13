import React,{useState, useEffect} from 'react';
import { connect } from "react-redux";
import {authToken} from '../../actions/authMethods';
import Layout from '../layout/Layout';

const AccountUser = (props) => {

  const { user: {_id, name, email, isAdmin }} = authToken();
  const token = authToken().token



  return(
    <div className="home">
      <Layout title="Account Settings" description={`Welcome `}>
      </Layout>
    </div>
  )
}
const mapStateToProps = state => {
  return{
    user: state.authReducer
  }
}

export default connect(mapStateToProps, {})(AccountUser);
