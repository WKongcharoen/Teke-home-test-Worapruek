import { groupType } from '../../../interfaces/crypto';
import { cryptoStore } from '../../../stores/crypto';
import { userPortfolioStore } from '../../../stores/userPortfolio';
import CryptoList from './CryptoList';
import './UserPortfolio.css';
import { FlatList, Text, View } from "react-native";

export default function UserPortfolio() {
  const data = userPortfolioStore.getUserPort;

  return (
    <View id="user-portfolio-container">
      <Text>Assets</Text>
      <CryptoList
        crypotList={[...data]}
        position={groupType.userPortfolio}
      />
    </View>
  )
}