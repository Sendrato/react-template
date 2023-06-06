export enum UserRole {
  ADMIN = 'administrator',
  SELLER = 'seller',
  HELPDESK = 'helpdesk',
}

export interface ILoginData {
  username: string;
  password: string;
  tenant: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface IUserRole {
  AccountType: string;
  SellerId: null | string;
  IsSuperuser: boolean;
}
