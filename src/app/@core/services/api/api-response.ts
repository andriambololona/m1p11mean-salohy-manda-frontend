export class ApiResponse<T>{
    data: T;
    detailsMessage: string;
    errorCode: string;
    externalState: string;
    message: string;
    state: string;
    validationErrors: Array<string>
}
