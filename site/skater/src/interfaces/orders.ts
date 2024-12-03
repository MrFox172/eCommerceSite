interface OrderedProduct {
  productId: number;
  quantity: number;
}

//ordering
interface Order {
  accountId: number;
  paymentMethodId: number;
  orderedProducts: OrderedProduct[];
  orderTotal: number;
  status: string;
}

interface OrderDetailed {}
