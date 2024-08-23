// deliveryOrder.ts

import axiosInstance from './axiosInstance'; // Adjust the path as necessary

// Define the DeliveryOrder interface
export interface DeliveryOrder {
  packageDescription: string;
  packageWeight?: number;
  perishables: boolean;
  fragile: boolean;
  pickupIsResidential: boolean;
  dropoffIsResidential: boolean;
  pickupRestrictions?: string;
  dropoffRestrictions?: string;
  senderName: string;
  senderPhoneNo: string;
  receiverName: string;
  receiverPhoneNo: string;
  price?:number;
  pickupAddress: string;
  dropoffAddress: string;
  pickupLga: string;
  dropoffLga: string;
  paymentMethod: 'online' | 'ondelivery' | 'onpickup';
  totalDistance: number;
  deliveryId: string;
  user?:string;
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

export default {
  createDeliveryOrder,
  updateDeliveryOrder,
  getDeliveryOrders,
  getDeliveryOrderById,
};
