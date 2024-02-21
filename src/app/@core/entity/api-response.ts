export class ApiResponse<T>{
    data: T;
    totalPages?:number;
    currentPage?:number;
    totalItems?:number;
    detailsMessage: string;
    errorCode: string;
    externalState: string;
    message: string;
    state: string;
    validationErrors: Array<string>
}
