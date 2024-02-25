import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { map } from 'rxjs';
import { headerApi } from 'src/main';

@Injectable()
export class CryptoService {
  // constructor(private readonly http: HttpService) { }

  async getCryptoPrice(prop: { id?: string, symbol?: string }) {
    const { id, symbol } = prop;
    return await axios.get(`${process.env.CRYPTO_URL}/v1/cryptocurrency/quotes/latest`, {
      headers: headerApi,
      params: {
        id,
        symbol,
        convert: 'THB'
      }
    }).then(res => {
      const data = res.data;
      return data
    });
  }

  async updateUserPortfolio(prop?: {id?: string}){
    const {id} = prop;
    return await await axios.get(`http://localhost:3000/user-portfolio`, {
      params: {
        user_id: id,
      }
    }).then(res => res.data);
  }

  async getCryptoListings(prop?: { limit?: number, id?: string }): Promise<any> {
    let limit: number = prop ? prop.limit : undefined;
    let coinId: string = prop ? prop.id : undefined;

    const listings = await axios.get(`${process.env.CRYPTO_URL}/v1/cryptocurrency/listings/latest`, {
      headers: headerApi,
      params: {
        start: 1,
        limit: limit,
        id: coinId,
        aux: 'num_market_pairs',
        convert: 'THB'
      }
    }).then(res => res.data?.data);

    const id = listings.map(item => {
      return item.id
    }).toString();

    const info: any[] = await axios.get(`${process.env.CRYPTO_URL}/v2/cryptocurrency/info`, {
      headers: headerApi,
      params: {
        id: id,
        aux: 'logo'
      }
    }).then(res => {
      return res.data?.data;
    })

    const result = listings.map(item1 => {
      return {
        name: item1.name,
        logo: info[item1.id].logo,
        symbol: item1.symbol,
        price: parseFloat(item1.quote.THB.price).toFixed(2)
      }
    })

    return {
      status: {
        error_code: 0,
        error_message: null,
      },
      data: result
    }
  }
}
