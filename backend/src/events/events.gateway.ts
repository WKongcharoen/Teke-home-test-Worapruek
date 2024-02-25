import { Interval } from '@nestjs/schedule';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { CryptoService } from 'src/crypto/crypto.service';
import { ICryptoItem } from 'src/interfaces/crypto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class EventsGateway {
  constructor() {
    this.cryptoService = new CryptoService();
    this.setCrypto();
    this.updateUserPort({id: '1'});
  }

  @WebSocketServer()
  server: Server;
  cryptoService: CryptoService;
  cryptoList: ICryptoItem;

  private setCrypto(): Promise<void> {
    return this.cryptoService.getCryptoListings()
      .then(res => {
        this.cryptoList = res;
        this.server.emit('update-crypto', res);

        return res;
      })
  }

  private updateUserPort(prop?: { id?: string }): any {
    const { id } = prop;
    return this.cryptoService.updateUserPortfolio({ id })
      .then(res => {
        this.server.emit('update-user', res.data);
        return res
      });
  }

  @Interval(10000)
  handleInterval() {
    this.setCrypto();
    this.updateUserPort({ id: '1' });
  }

  handleConnection(client: Socket) {
    client.emit('connected', this.cryptoList);
  }

  @SubscribeMessage('update-crypto')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: any
  ): string {
    console.log(client)
    return data
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

}