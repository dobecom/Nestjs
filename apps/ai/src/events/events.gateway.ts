import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { request } from 'http';

@Injectable()
@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly config: ConfigService) {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { prompt: string }): void {
    console.log(`Received message: ${data.prompt}`);

    const options = {
      hostname: this.config.get('OLLAMA_HOST'),
      port: this.config.get('OLLAMA_PORT'),
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestData = JSON.stringify({
      model: this.config.get('OLLAMA_MODEL'),
      prompt: data.prompt,
    });

    const apiReq = request(options, (apiRes) => {
      apiRes.setEncoding('utf8');

      apiRes.on('data', (chunk) => {
        // console.log('Response chunk:', chunk);
        this.server.emit('response', { data: chunk.toString() });
      });

      apiRes.on('end', () => {
        this.server.emit('response', { data: 'Stream ended' });
      });
    });

    apiReq.on('error', (e) => {
      console.log(e);
      console.error(`Problem with request: ${e.message}`);
      this.server.emit('error', {
        message: `Problem with request: ${e.message}`,
      });
    });

    apiReq.write(requestData);
    apiReq.end();
  }

  @SubscribeMessage('chat')
  handleChatMessage(
    @MessageBody()
    data: {
      model: string;
      messages: { role: string; content: string }[];
      stream?: boolean;
    }
  ): void {
    console.log(`Received chat message: ${JSON.stringify(data.messages)}`);

    const options = {
      hostname: this.config.get('OLLAMA_HOST'),
      port: this.config.get('OLLAMA_PORT'),
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestData = JSON.stringify({
      model: this.config.get('OLLAMA_MODEL'),
      messages: data.messages,
      stream: data.stream !== undefined ? data.stream : true,
    });

    const apiReq = request(options, (apiRes) => {
      apiRes.setEncoding('utf8');

      apiRes.on('data', (chunk) => {
        console.log('Response chunk:', chunk);
        this.server.emit('chat_response', { data: chunk.toString() });
      });

      apiRes.on('end', () => {
        this.server.emit('chat_response', { data: 'Stream ended' });
      });
    });

    apiReq.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      this.server.emit('chat_error', {
        message: `Problem with request: ${e.message}`,
      });
    });

    apiReq.write(requestData);
    apiReq.end();
  }
}
