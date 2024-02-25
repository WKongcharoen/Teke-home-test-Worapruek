export interface ICryptoItem {
  name: string;
  price: number;
  logo: string;
  symbol: string
}

export enum groupType{
  cryptoList,
  userPortfolio
}