import React,{useState, useEffect} from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import {getMessages, updateMessageStatus} from '../../actions/adminActions'

const AdminMessages = (props) => {

  
  useEffect(()=>{
    props.getMessages()
  },[])


  return (
    <div className="">
      <Layout
        title="Admin Account - Messages"
        description={`Welcome `}
        accountMenu={<AdminMenu />}
      >
        <div className="messages">
          <h3 className="admin-title">Messages</h3>
          <div className="messages-box">
            <button onClick={()=>props.getMessages()}>submit</button>
            
          </div>
        </div>

      </Layout>
    </div>
  );

}
const mapStateToProps = state => {
  return {
    state
    // user: state.authReducer,
    // messages: state.contactReducer,
    // products: state.productsReducer,
  }
}
export default connect(mapStateToProps, {getMessages, updateMessageStatus})(AdminMessages)