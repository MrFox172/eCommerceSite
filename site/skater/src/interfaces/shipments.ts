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

export type { Shipment, ShippingOption };
