import { payOrder } from "../../actions/orderActions";
import myKey from "./KhaltiKey";

const KhaltiConfig = (dispatch, orderId, order) => {
  const successPaymentHandler = (paymentResult) => {
    dispatch(
      payOrder(orderId, {
        paymentMethod: order.paymentMethod,
        paymentResult: {
          token: paymentResult.token,
          amount: order.totalPrice * 100,
        },
      })
    );
  };

  return {
    // ...other config properties
    publicKey: "test_public_key_9ca882675d9644ff86c017f8e1f55a9a",
    productIdentity: "123454321",
    productName: "Rollersbakery",
    productUrl: "http://localhost:3000/",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log("Payment Sucessful!");
        console.log(payload);
        successPaymentHandler(payload);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
};

export default KhaltiConfig;
