import './Main.css';
import { cryptoStore } from '../../stores/crypto';
import CryptoList from "./componenst/CryptoList";
import UserPortfolio from "./componenst/UserPortfolio";
import { observer } from 'mobx-react';
import { groupType } from '../../interfaces/crypto';
import { userPortfolioStore } from '../../stores/userPortfolio';

export default observer(function Main() {
  return (
    <div className="main-container">
      <UserPortfolio />
      <CryptoList
        crypotList={cryptoStore.getCryptoList }
        position={groupType.cryptoList} />
    </div>
  )
})