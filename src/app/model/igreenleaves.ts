export interface IGreenLeavesRequest{
    name: string;
    email: string;
    phone: string;
    date: string;
    address: string;
}

export interface IGreenLeavesResponse{
    success: boolean;
}

export interface IAddress{
    id: number;
    addressFull: string;
}
