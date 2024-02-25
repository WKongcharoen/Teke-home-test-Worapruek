import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { ApiResponse } from 'src/interfaces/api-response';
import { HttpService } from '@nestjs/axios';
import { query } from 'express';

export interface ICoinInfo {
  id: string;
  fund: number;
  profit?: number;
}

export interface IUserInfo {
  coinId: string;
  coinInfo: ICoinInfo[];
}

@Controller()
export class CryptoController {
  constructor(private readonly crypto: CryptoService, private readonly http: HttpService) { }

  @Get('crypto')
  async getCryptoMap(@Query() query) {
    const { limit, id } = query;
    return this.crypto.getCryptoListings({ limit, id });
  }

  @Get('crypto/price')
  async getCryptoPrice(@Res() res, @Query() query) {
    const { id, symbol } = query;

    if (!id && !symbol) {
      return res.status(400).send({
        status: {
          error_code: 400,
          error_message: `Query param must contain 'id' or 'symbol'`,
        }
      } as ApiResponse);
    } else if (id && symbol) {
      return res.status(400).send({
        status: {
          error_code: 400,
          error_message: `Query param must only 'id' or 'symbol'`,
        }
      } as ApiResponse);
    } else {
      return res
        .status(200)
        .send(
          await this.crypto.getCryptoPrice(
            {
              id: id ? id.replaceAll(' ', '') : undefined,
              symbol: symbol ? symbol.replaceAll(' ', '') : undefined
            }));
    }
  }

  private async calProfit(prop: { user: IUserInfo}){
    const { user } = prop;
    const result = await this.crypto.getCryptoPrice({ id: user.coinId });
    const cointInfo: ICoinInfo[] = user.coinInfo.map((item) => {
      const data = result.data[item.id];
      return ({
        ...item, 
        profit: Number((data.quote.THB.price - item.fund).toFixed(2)),
        name: data.name,
        symbol: data.symbol,
      })
    })

    return cointInfo;
  }

  @Get('user-portfolio')
  async getUserPortfolio(@Query('user_id') userId, @Res() res) {
    if (!userId) {
      return res.status(400).send({
        status: {
          error_code: 400,
          error_message: `Query param must contain 'id'`,
        }
      } as ApiResponse)
    }

    // simulate user from DB
    const user: IUserInfo =
    {
      coinId: '1,184',
      coinInfo: [
        {
          id: '1',
          fund: 501.24,
        }, {
          id: '184',
          fund: 24.15,
        }
      ]
    }

    const result = await this.calProfit({user});

    res.status(200).send({
      status: {
        error_code: 0,
        error_message: null
      },
      data:
         result 
    });

  }
}
