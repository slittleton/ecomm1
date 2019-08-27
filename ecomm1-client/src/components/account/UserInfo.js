import React from "react";

const UserInfo = props => {
  const { userName, email } = props.user;
  const { name, street, city, state, zipcode } = props.address;

  const showHistory = () => {
    if (props.history && props.history.length > 0) {
      return (
        <div>
          {props.history.map((order, index) => {
            return (
              <div key={index} className="tiny-pad">
                <hr />
                <div className="subtitle center medium-pad-top">
                  Order {parseInt(index) + 1}
                </div>
                <div className="tiny-pad">Order Date: {order.date}</div>
                <div className="tiny-pad">
                  {" "}
                  Order Total: ${parseInt(order.orderTotal).toFixed(2)}
                </div>
                <div className="tiny-pad">
                  Order Items:{" "}
                  {order.products.map((product, index) => {
                    return (
                      <div key={product._id} className="darkgray-back box">
                        <div className="tiny-pad">Name: {product.name}</div>
                        <div className="tiny-pad">
                          Quantity: {product.count}
                        </div>
                        <div className="tiny-pad">
                          Price: ${parseInt(product.price).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <hr />
        </div>
      );
    } else {
      return <div className="subtitle">No Order History Found</div>;
    }
  };

  return (
    <div className="user-info">
      <div className="box darkgray-back">
        <div className="title">Current User Information</div>

        <div className="box">
          {userName ? (
            <div>
              <div className="tiny-pad">Username: {userName}</div>
              <div className="tiny-pad">Email: {email}</div>
            </div>
          ) : (
            <div className="tiny-pad">User Info Not Found</div>
          )}
        </div>

        <div className="tiny-pad box">
          Address:
          {street !== "" ? (
            <div>
              <div className="tiny-pad">Name: {name}</div>
              <div className="tiny-pad">Street: {street}</div>
              <div className="tiny-pad">City: {city}</div>
              <div className="tiny-pad">State: {state}</div>
              <div className="tiny-pad">Zipcode: {zipcode}</div>
            </div>
          ) : (
            <div className="tiny-pad">Address Not Found</div>
          )}
        </div>

        <div className="box">
          <div className="tiny-pad">{showHistory()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
