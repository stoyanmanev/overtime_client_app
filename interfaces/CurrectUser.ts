import { Hour } from "../generated/graphql"

export default interface CurrentUser{
    _id: string
    username: string
    fullname: string
    email: string
    password: string
    lastLogin: number
    overtime: Hour[]
    roles: string[]
}