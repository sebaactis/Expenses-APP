export interface LoginResponse {
    email: string;
    access_token: string;
    message: string;
}

export interface RegisterResponse extends LoginResponse { }