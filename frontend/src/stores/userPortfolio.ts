import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { ICryptoItem } from "../interfaces/crypto";

class UserPortfolioStore{
  userPort = []

  constructor() {
    makeObservable(this, {
      userPort: observable,
      setUserPort: action,
      getUserPort: computed,
    })
    this.userPort = [];
  }

  get getUserPort(){
    return this.userPort;
  }

  setUserPort(cryptoList: any){
    this.userPort = cryptoList;
  }
}

export const userPortfolioStore = new UserPortfolioStore()