export interface AuthResponse {
    message: string;
    result: any;
    code: number;
    success: boolean;
}
export interface LoginCredentials {
    username: string;
    password: string;
    deviceId?:string;
    deviceName?:string;
    firebaseToken?:string;
}
interface Settings {
        "companyBackgroundURL": string;
        "companyLogoURL":string;
        "companyName": string;
        "companyId": string;
        "rememberMe": boolean,
        "theme": {
            "primary": string;
            "primary-lighten":string;
            "secondary": string;
            "success": string;
            "warning": string;
            "danger": string;
            "error": string;
            "link": string;
            "disabled": string;
            "border": string;
            "background":string;
            "icon-grey": string;
        }
}

export interface User  {
    "_id": string;
    "id": string;
    "firstname": string;
    "lastname": string;
    "imageURL": string;
    "phoneNumber": string;
    "gender": number;
    "birthday": string;
    "address": string;
    "username": string;
    "authorId":string;
    "managerId": string;
    "userPermissionTypeId": string;
    "userTypeId": string;
    "partnerCompanyId": string;
    "partnerCompanyBranchId": string;
    "mustChangePassword": false;
    "lastLoginOn": number;
    "tokenConfiguration": string | null;
    uiSettings :Settings;
    "passwordExpirationDateTime": number;
    "token": string,
    "partnerCompanyName": string;
    "partnerCompanyImageURL":string;
    "partnerCompanyLogoURL": string;
    "passwordExpiresIn": number,
    "webAdminURL": string
};

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
