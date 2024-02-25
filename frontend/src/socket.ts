import { io } from "socket.io-client";
import { cryptoStore } from "./stores/crypto";
import { userPortfolioStore } from "./stores/userPortfolio";

export const SocketIo = io('ws://localhost:3000', {
  autoConnect: true
});

SocketIo.on('connected', (arg) => {
  cryptoStore.setCryptoList(arg.data);
});

SocketIo.on('update-crypto', (arg) => {
  cryptoStore.setCryptoList(arg.data);
});

SocketIo.on('update-user', (arg) => {
  console.log(arg)
  userPortfolioStore.setUserPort(arg)
})