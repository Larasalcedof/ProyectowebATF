import { UserType } from "./signUpRequest.interface"

export interface UserDetails{
    email:string
    type: UserType
    enabled: boolean
    jwt: string
}