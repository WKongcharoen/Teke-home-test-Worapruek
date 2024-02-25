import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { HttpService } from '@nestjs/axios';
import { CryptoController } from 'src/crypto/crypto.controller';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  
  // controllers: [CryptoController],
  providers: [EventsGateway],
})
export class EventsModule {}