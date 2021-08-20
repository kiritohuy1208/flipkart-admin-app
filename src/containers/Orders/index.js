import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/Ui/Card/Card";
import "./style.css";

/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  const [type, setType] = useState("");
  const [ordersArray, setOrdersArray] = useState(
    order.orders ? order.orders : null
  );
  useEffect(() => {
    setOrdersArray(order.orders);
  }, [order.orders]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  return (
    <Layout sidebar>
      {ordersArray &&
        ordersArray.map((orderItem, index) => (
          <Card
            key={index}
            headerLeft={orderItem._id}
            headerRight={
              "By customer: " +
              " " +
              orderItem.user.firstName +
              " " +
              orderItem.user.lastName
            }
          >
            <div
              style={{
                boxSizing: "border-box",
                padding: "50px 100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="title">Items:</div>
                {orderItem.items.map((item, index) =>
                  item.productId ? (
                    <div className="value" key={index}>
                      {item.productId.name}
                    </div>
                  ) : (
                    <div className="value" key={index}>
                      <p style={{ color: "red" }}>
                        The product is no longer in business
                      </p>
                    </div>
                  )
                )}
                {/* {orderItem.items.map((item, index) => (
                  <div className="value" key={index}>
                    {item.productId.name}
                  </div>
                ))} */}
              </div>
              <div>
                <span className="title">Total Price:</span>
                <br />
                <span className="value">{orderItem.totalAmount}</span>
              </div>
              <div>
                <span className="title">Payment Type:</span> <br />
                <span className="value">{orderItem.paymentType}</span>
              </div>
              <div>
                <span className="title">Payment Status:</span> <br />
                <span className="value">{orderItem.paymentStatus}</span>
              </div>
            </div>
            <div
              style={{
                boxSizing: "border-box",
                padding: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="orderTrack">
                {orderItem.orderStatus.map((status, index) => {
                  return (
                    <div
                      key={index}
                      className={`orderStatus ${
                        status.isCompleted ? "active" : ""
                      }`}
                    >
                      <div
                        className={`point ${
                          status.isCompleted ? "active" : ""
                        }`}
                      ></div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* select input to apply order action */}
              <div
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    padding: "0 50px",
                    boxSizing: "border-box",
                  }}
                >
                  <select
                    class="form-control form-control-sm "
                    onChange={(e) => setType(e.target.value)}
                    style={{ fontSize: "14px", width: "150px" }}
                  >
                    <option value={""}>Select Status order</option>
                    {orderItem.orderStatus.map((status, index) => {
                      return (
                        <>
                          {status.isCompleted ? null : (
                            <option key={index} value={status.type}>
                              {status.type}
                            </option>
                          )}
                        </>
                      );
                    })}
                  </select>
                </div>
                {/* button to confirm aciton */}
                <div style={{ padding: "0 20px", boxSizing: "border-box" }}>
                  <Button
                    variant={"primary"}
                    style={{ fontSize: "14px", height: "30px" }}
                    onClick={() => onOrderUpdate(orderItem._id)}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
    </Layout>
  );
};

export default Orders;
