interface OrderedProduct {
  productId: number;
  expectedQuantity: number;
  expectedPrice: number;
}

interface OrderVerification {
  orderedProducts: OrderedProduct[];
}

//ordering
interface Order {
  accountId: number;
  paymentMethodId: number;
  orderedProducts: OrderedProduct[];
  expectedOrderTotal: number;
  status: string;
}

interface StripeOrder {
  accountId: number,
  paymentMethodId: number,
  shippingMethodId: number,
  addressId: number,
  orderedProducts: OrderedProduct[],
  expectedOrderTotal: number,
}

export type { OrderVerification, Order, OrderedProduct, StripeOrder };