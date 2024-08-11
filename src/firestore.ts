import app from "./firebase_app";
import {getFirestore} from "firebase/firestore"
const db = getFirestore(app);
import { collection,doc, addDoc, getDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
const auth = getAuth(); 

export interface deliveryOrder {
    packageDescription: string;
    packageWeight?: number;
    perishables: boolean;
    fragile: boolean;
    pickupIsResidential: boolean;
    dropoffIsRedential: boolean;
    pickupRestrictions?:string;
    dropoffRestrictions?:string;
    senderName: string;
    senderPhoneNo: string;
    receiverName: string;
    receiverPhoneNo: string;
    pickupAddress: string;
    dropoffAddress: string;
    pickupLga: string;
    dropoffLga: string;
    paymentMethod: 'online' | 'ondelivery' | 'onpickup';
    totalDistance: number;
    user: string | undefined;
    orderId:string;
}

export async function addOrder (order: deliveryOrder) {
    const user = auth.currentUser;
    if(user){
        try {
            let result = await addDoc(collection(db, 'deliveries'),order)
            return result;
        }
        catch(error){
            console.error(error)
            throw error
        }
        finally {
            console.log('add order operation complete')
        }
    }
    else {
        throw Error('Authentication Error. Login Again')
    }
}

export async function getDeliveryById(deliveryId: string) {
    try {
      // Reference to the specific document
      const docRef = doc(db, 'deliveries', deliveryId);
  
      // Get the document
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Document data
        const data = docSnap.data();
        console.log('Document data:', data);
        return data;
      } else {
        // Document does not exist
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }