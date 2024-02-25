import { useEffect } from "react";
import { ICryptoItem } from "../../../interfaces/crypto";
import axios from "axios";
// import { cryptoUserPortStore } from "../../../stores/crypto";
import { observer } from "mobx-react";

export default observer( function CryptoLIstUserPortfolio(prop: { data: any }) {
  const { data } = prop;

  useEffect(() => {
    axios.get(`http://localhost:3000/user-portfolio`,{
      params:{
        user_id: 1
      }
    }).then(res => {
      return res.data?.data
    })
  }, [])

  return (
    <div className="crypto-item-user-portfolio">
      <div>
        {data.name}
      </div>
      <div>
        <div>
          {data.symbol}
        </div>
        <div >
          profit: {data.profit} THB
        </div>
      </div>

    </div>
  )
})