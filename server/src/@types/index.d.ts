export interface IAuthorizationJwtPayload {
  claims?: string[];
  sensitiveFields?: string[];
  callbackUrl: string;
}

export interface IUserAuthToken {
  id: string;
  verified: boolean;
}
