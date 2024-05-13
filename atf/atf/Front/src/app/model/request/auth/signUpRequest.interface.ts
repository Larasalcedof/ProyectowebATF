export interface SignUpRequest{
    email : string
    name : string
    surname : string
    password : string
    tel : number
    type: UserType
}


export type UserType = 'LANDLORD' | 'TENANT'