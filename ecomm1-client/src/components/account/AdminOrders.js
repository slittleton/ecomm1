import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import {
  getOrders,
  getOrderStatusList,
  updateOrderStatus,
  resetOrderStatus
} from "../../actions/orderActions";
import UserActionMessage from "./UserActionMessage";

const AdminOrders = props => {
  const [orders, setOrders] = useState("");
  const [statusList, setStatusList] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    props.getOrders();
    props.getOrderStatusList();
  }, []);

  useEffect(() => {
    props.getOrders();
    props.getOrderStatusList();
    setTimeout(() => {
      props.resetOrderStatus();
      console.log("reset");
    }, 1000);
  }, [props.orderStatusUpdated]);

  useEffect(() => {
    if (props.ordersBundle) {
      setOrders(props.ordersBundle);
    }
  }, [props.ordersBundle]);

  useEffect(() => {
    if (props.orderStatusList) {
      setStatusList(props.orderStatusList);
    }
  }, [props.orderStatusList]);

  const showOrders = () => {
    if (orders !== "" && orders.length > 0) {
      return (
        <div>
          {orders.map((order, index) => {
            return (
              <div key={order._id} className="box">
                <div className="devmode-title">
                  This Website Is Only A Demonstration
                </div>

                <div className="mediumgray-back flx">
                  <div className="tiny-pad">{`${parseInt(index) + 1})`}</div>
                  <div className="tiny-pad">| Order ID: {order._id} |</div>
                  <div className="tiny-pad">
                    | Order Status: {order.status} |
                  </div>
                  <div className="" style={{ margin: 0, padding: 0 }}>
                    {orderStatusSelector(order)}
                  </div>
                </div>
                <div className="flx">
                  <div className="box" style={{ width: "100%" }}>
                    <div
                      className="subtitle medium-pad-top"
                      style={{ paddingLeft: ".5rem" }}
                    >{`Product(s) Ordered`}</div>
                    <div className="tiny-pad">
                      {showOrderedProducts(order.products)}{" "}
                    </div>
                  </div>

                  <div className="box" style={{ width: "100%" }}>
                    <div className="tiny-pad">{showCustomerInfo(order)} </div>
                    <hr />
                    <div
                      className="subtitle medium-pad"
                      style={{ paddingLeft: ".5rem" }}
                    >
                      ORDER TOTAL: ${parseInt(order.amount).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div className="title">No Orders Found</div>;
    }
  };

  const changeStatus = id => async e => {
    props.updateOrderStatus(id, e.target.value);
  };

  const orderStatusSelector = order => {
    return (
      <div>
        <UserActionMessage />
        <div className="flx tiny-pad">
          <div className="">Change Status:</div>
          <select className="" onChange={changeStatus(order._id)}>
            <option>Select Status</option>
            {statusList &&
              statusList.map((status, index) => {
                return (
                  <option key={index} value={status}>
                    {status}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    );
  };

  const showCustomerInfo = order => {
    return (
      <div>
        <div className="subtitle">Customer Information</div>
        <div className="tiny-pad">User: {order.user.name} </div>
        <div className="tiny-pad">User ID: {order.user._id} </div>
        <div>
          <div className="subtitle">Address</div>
          <div className="tiny-pad">Name: {order.user.address.name}</div>
          <div className="tiny-pad">Street: {order.user.address.street}</div>
          <div className="tiny-pad">City: {order.user.address.city}</div>
          <div className="tiny-pad">State: {order.user.address.state}</div>
          <div className="tiny-pad">Zipcode: {order.user.address.zipcode}</div>
        </div>
      </div>
    );
  };

  const showOrderedProducts = productList => {
    return productList.map((product, index) => {
      return (
        <div key={index} className="tiny-pad">
          <hr />
          <div className="tiny-pad">Product ID: {product._id}</div>
          <div className="tiny-pad">Product Name: {product.name}</div>
          <div className="tiny-pad">
            Unit Price: ${parseInt(product.price).toFixed(2)}
          </div>
          <div className="tiny-pad">Quantity: {product.count}</div>
          <hr />
        </div>
      );
    });
  };

  return (
    <div className="">
      <Layout
        title="Admin Account - Orders"
        description={`Welcome ${props.user.userName}`}
        accountMenu={<AdminMenu />}
      >
        <div className="orders">
          <div className="title">List Of Recent Orders</div>
          <div className="orders-box">{showOrders()}</div>
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = state => {
  console.log("ADMIN ORDERS STATE", state);
  return {
    user: state.authReducer,
    ordersBundle: state.orderReducer.ordersBundle,
    orderStatusList: state.orderReducer.orderStatusList,
    orderStatusUpdated: state.orderReducer.orderStatusUpdated
  };
};

export default connect(
  mapStateToProps,
  { getOrders, getOrderStatusList, updateOrderStatus, resetOrderStatus }
)(AdminOrders);
