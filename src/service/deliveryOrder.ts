// deliveryOrder.ts

import axiosInstance from './axiosInstance'; // Adjust the path as necessary

// Define the DeliveryOrder interface
export interface DeliveryOrder {
  packageDescription?: string;
  packageWeight?: number;
  perishables?: boolean;
  fragile?: boolean;
  pickupIsResidential?: boolean;
  dropoffIsResidential?: boolean;
  pickupRestrictions?: string;
  dropoffRestrictions?: string;
  senderName: string;
  senderPhoneNo: string;
  receiverName: string;
  receiverPhoneNo: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupArea: string;
  dropoffArea: string;
  paymentMethod: 'online' | 'ondelivery' | 'onpickup';
  paymentStatus?: 'pending' | 'paid';
  price: number;
  totalDistance?: number;
  user?: string; // assuming the User model uses a string ID
  deliveryId: string;
  vendor?: boolean;
  assignedRider?: string;
  deliveryTrackStatus?: 'pending' | 'started' | 'picked' | 'dropped';
  isExpress?: boolean;
  isBulk?: boolean;
  bulkOptions?: Record<string, any>;
  isSchedule?: boolean;
  scheduleOptions?: Record<string, any>;
  costData?: Record<string, any>;
  locationData?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}


// Service functions

const createDeliveryOrder = async (deliveryOrder: DeliveryOrder, token: string) => {
  console.log(deliveryOrder)
  try {
    const response = await axiosInstance.post('/delivery-orders', deliveryOrder,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error:any) {
    throw new Error(`Error creating delivery order: ${error.message}`);
  }
};

const updateDeliveryOrder = async (orderId: string, updates: Partial<DeliveryOrder>, token: string) => {
  try {
    const response = await axiosInstance.put(`/delivery-orders/${orderId}`, updates,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error:any) {
    throw new Error(`Error updating delivery order: ${error.message}`);
  }
};

const getDeliveryOrders = async (page: number) => {
  try {
    const response = await axiosInstance.get('/delivery-orders', {
      params: { page, limit: 30 },
    });
    return response.data;
  } catch (error:any) {
    throw new Error(`Error retrieving delivery orders: ${error.message}`);
  }
};

const getDeliveryOrderById = async (orderId: string) => {
  try {
    const response = await axiosInstance.get(`/delivery-orders/${orderId}`);
    return response.data;
  } catch (error:any) {
    throw new Error(`Error retrieving delivery order by ID: ${error.message}`);
  }
};

const confirmPayment = async (orderId: string, paymentRef: string, transactionReference: string) => {
  try {
    const response = await axiosInstance.post(
      '/delivery-orders/confirm-payment',
      {
        id: orderId,
        paymentRef,
        transactionReference,
      },
      {}
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error confirming payment: ${error.message}`);
  }
};

export default {
  createDeliveryOrder,
  updateDeliveryOrder,
  getDeliveryOrders,
  getDeliveryOrderById,
  confirmPayment
};
