interface OrderedProduct {
  productId: number;
  expectedQuantity: number;
  expectedPrice: number;
}

//ordering
interface Order {
  accountId: number;
  paymentMethodId: number;
  orderedProducts: OrderedProduct[];
  expectedOrderTotal: number;
  status: string;
}
