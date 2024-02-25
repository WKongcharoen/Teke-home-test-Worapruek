import { ICryptoItem } from "../../../interfaces/crypto";

export default function CryptoListItem(prop: { data: ICryptoItem }) {
  const { data } = prop;
  return (
    <div>
      <div>
        {data.name}
      </div>
      <div>
        {data.symbol}
      </div>
      <div >
        Price: {data.price} THB
      </div>
    </div>
  )
}