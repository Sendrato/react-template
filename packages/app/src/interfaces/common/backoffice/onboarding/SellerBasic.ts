import { IEnhancedApiResponce } from '@services/types/generated/common';

export interface SellerBasic {
  Address: string | null;
  City: string | null;
  Country: string | null;
  Email: string | null;
  Name: string | null;
  Phone: string | null;
  SellerId?: string | null;
  _id: string | null;
}

export interface SellerDTO extends Partial<SellerBasic> {
  BankAccountBranch: string;
  BankAccountName: string;
  BankAccountNumber: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Zipcode: string;
}

export interface ListSellers extends IEnhancedApiResponce {
  Seller: SellerBasic[];
}

export interface SellerSearch {
  Query: string | null;
  Seller: SellerBasic[];
}
