export interface loginData{
    email: string,
    password: string
}

export interface RegisterData extends loginData {
    name: string,
    phone: string,
    rePassword: string    
}
