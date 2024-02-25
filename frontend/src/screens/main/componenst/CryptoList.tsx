import './CryptoList.css';
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ICryptoItem, groupType } from '../../../interfaces/crypto';
import CryptoListItem from './CryptoListItem';
import CryptoLIstUserPortfolio from './CryptoLIstUserPortfolio';
import { userPortfolioStore } from '../../../stores/userPortfolio';
import { cryptoStore } from '../../../stores/crypto';

export default function CryptoList(prop: { crypotList: ICryptoItem[], crypotoUser?: ICryptoItem[], position: groupType }) {
  const { crypotList, position } = prop;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      width: '100%',
    },
  });

  return (
    <>{
      position === groupType.cryptoList &&
      <FlatList
        id='crypto-item-container'
        style={styles.container}
        data={cryptoStore.getCryptoList}
        renderItem={(item) => {
          const data = item.item;
          return (
            <div className="crypto-item-container">
              <div className='crypto-item-logo'>
                <img src={data.logo} />
              </div><CryptoListItem data={data} />
            </div>
          )
        }}
      />
}
{
      position === groupType.userPortfolio &&
      <FlatList
        id='crypto-item-container'
        style={styles.container}
        data={userPortfolioStore.getUserPort}
        renderItem={(item) => {
          const data = item.item;
          return (
            <div className="crypto-item-container">
              <div className='crypto-item-logo'>
              </div><CryptoLIstUserPortfolio data={data} />
            </div>
          )
        }}
      />
}
    </>

  )
}
