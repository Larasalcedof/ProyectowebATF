import { PropertyIngressType } from "../../request/property/propertyRequest.interface";

export interface PropertyResponse {
    id: number;
    name: string;
    department: string;
    city: string;
    description: string;
    img: string;
    price: number;
    peopleQuantity: number;
}

export interface PropertyDetailedResponse extends PropertyResponse{
    ingressType: PropertyIngressType;
    bathRoomQuantity: number;
    arePetsAllowed: boolean;
    hasPool: boolean;
    hasBBQ: boolean;
}