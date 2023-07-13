export interface User {
    id: string
    username: string
    email: string
    accessToken: string,
    photos?: string[],
    phoneNumber?: string,
    price?: string,
    services: string[],
}