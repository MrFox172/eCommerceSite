interface Shipment {
  id: number;
  accountOrderId: number;
  addressId: number;
  shipmentStatus: string;
  shipmentDate: string;
  trackingNumber: string;
  createdate: string;
}

interface ShippingOption {
  id: number;
  name: string;
  price: number;
  createdate: string;
}

interface ShippingAdressDetails {
  id: number;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  createdate: string;
}

interface ShippingOrderDetails {
  id: number;
  shipment: ShipmentDetails;
  orderStatus: string;
  orderNumber: string;
  orderTotal: number;
  orderCommission: number;
  createdate: string;
  productsOrdered: ProductOrdered[];
}

interface ShipmentDetails {
  id: number;
  address: ShippingAdressDetails;
  shippingMethod: ShippingOption;
  shipmentStatus: string;
  shipmentDate: string;
  trackingNumber: string;
  createdate: string;
  daysToDeliver: number;
}

interface ProductOrdered {
  id: number;
  quantity: number;
  lineTotal: number;
  createdate: string;
}

export type {
  Shipment,
  ShippingOption,
  ShippingOrderDetails,
  ShipmentDetails,
  ProductOrdered,
  ShippingAdressDetails,
};
