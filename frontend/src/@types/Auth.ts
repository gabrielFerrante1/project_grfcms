export type User = {
    id: number;
    name: string;
    email: string;
}

export type UserDetails = User & {
    refresh: string;
    access: string;
}

export type ApiSignIn = {
    user: User;
    refresh: string;
    access: string;
} 

export type ApiGetUser = {
    user: User;
}