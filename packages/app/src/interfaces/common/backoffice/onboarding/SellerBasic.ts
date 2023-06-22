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

export interface ListSellers extends IEnhancedApiResponce {
  Seller: SellerBasic[];
}

export interface SellerSearch {
  Query: string | null;
  Seller: SellerBasic[];
}
