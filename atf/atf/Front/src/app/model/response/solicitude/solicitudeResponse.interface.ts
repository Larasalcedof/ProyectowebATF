import { RentSolicitudeStatus } from "../../request/solicitude/rentSolicitudeSetStatusRequest.interface"
import { PropertyResponse } from "../property/propertyResponse.interface"

export interface RentSolicitudeResponse {
    id: number
    requester: string 
    timestamp: Date
    property: PropertyResponse
    status: RentSolicitudeStatus
    arrivalDate: Date
    departureDate: Date
    price: number
    peopleQuantity: number
}