interface Shipment {
  id: number;
  accountOrderId: number;
  addressId: number;
  shipmentStatus: string;
  shipmentDate: string;
  trackingNumber: string;
  createdate: string;
}

export type { Shipment };
