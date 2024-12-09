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

export type { OrderVerification, Order, OrderedProduct };