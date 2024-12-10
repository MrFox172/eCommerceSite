import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { useCart } from "../../CartProvider/CartProvider";
import { useEffect, useState } from "react";
import { Account } from "../../../interfaces/user";

const StripeIntegration: React.FC<Account> = (user) => {
  const cart = useCart();
  const [options, setOptions] = useState<StripeElementsOptions>({
    mode: "payment" as "payment",
    currency: "usd",
    amount: cart.getTotalPrice() * 100,
  });

  // Load your publishable key from Stripe
  const stripePromise = loadStripe(
    "pk_test_51QUGYNFqGEqntmXwvpbzXW3YmWcGzLXUeTUj9GBKG5NpJeaxGQqnFDzZIgrl2BBedI9Zy9xhRLUBIzRcePRbote200ucefB1xW"
  ); //This is a test key

  useEffect(() => {
    setOptions({
      ...options,
      amount: cart.getTotalPrice() * 100,
    });
  }, [cart.cart]);

  return (
    <>
      {user ? (
        <>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default StripeIntegration;
