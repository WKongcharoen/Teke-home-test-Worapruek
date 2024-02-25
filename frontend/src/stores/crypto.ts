import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { ICryptoItem } from "../interfaces/crypto";

class CryptoStore{
  cryptoList:ICryptoItem[] = []

  constructor() {
    makeObservable(this, {
      cryptoList: observable,
      setCryptoList: action,
      getCryptoList: computed,
    })
    this.cryptoList = [];
  }

  get getCryptoList(){
    return this.cryptoList;
  }

  setCryptoList(cryptoList: ICryptoItem[]){
    this.cryptoList = [...cryptoList];
  }
}

export const cryptoStore = new CryptoStore()
// export const cryptoUserPortStore = new CryptoStore();