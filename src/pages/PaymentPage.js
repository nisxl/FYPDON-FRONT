import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Col } from "react-bootstrap";
import CheckoutSteps from "../components/Layout/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
function PaymentPage() {
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </div>
  );
}

export default PaymentPage;
