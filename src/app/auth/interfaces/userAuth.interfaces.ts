export interface UserAuth {
    userName: string;
    email?: string;
    password: string;
    isOwner?:boolean;
}
