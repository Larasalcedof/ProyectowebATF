export interface PropertyRequest{
    name: string
    department: string
    city: string
    ingressType: PropertyIngressType
    description: string
    roomQuantity: number
    bathRoomQuantity: number
    arePetsAllowed: boolean
    hasPool: boolean
    hasBBQ: boolean
    price: number
}

export type PropertyIngressType = "MUNICIPAL" | "PRINCIPAL_STREET" | "SECONDARY_STREET" | "TERTIARY_STREET"
