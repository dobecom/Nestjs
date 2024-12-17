import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatVertexAI } from '@langchain/google-vertexai';
import { request } from 'http';
import { lastValueFrom, map, Observable, reduce } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService, MessageEvent } from '@app/common/ext-http/http.service';
import { KnexOracleProvider } from '@app/database/clients/knex/knex.oracle.provider';
import { Knex } from 'knex';
import { KnexPgsqlProvider } from '@app/database/clients/knex/knex.pgsql.provider';

@Injectable()
export class AiService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly oracleProvider: KnexOracleProvider,
    private readonly pgsqlProvider: KnexPgsqlProvider
  ) {}

  async asyncGenerateMessage(prompt: string): Promise<string> {
    const options = {
      hostname: this.config.get('OLLAMA_HOST'),
      port: this.config.get('OLLAMA_PORT'),
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = JSON.stringify({
      model: this.config.get('OLLAMA_MODEL'),
      prompt,
      stream: false,
      options: {
        max_tokens: 50,
      },
    });

    // Handling Observable
    try {
      const response$ = this.httpService.request(options, data).pipe(
        // get response from each chunk
        map((event: { data: string }) => {
          const parsedChunk = JSON.parse(event.data as string);
          return parsedChunk.response || '';
        }),
        reduce((acc, chunk) => acc + chunk, '')
      );

      const result = await lastValueFrom(response$);
      return result;
    } catch (err) {
      throw err;
    }
  }

  generateMessage(prompt: string): Observable<MessageEvent> {
    const options = {
      hostname: this.config.get('OLLAMA_HOST'),
      port: this.config.get('OLLAMA_PORT'),
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = JSON.stringify({
      model: this.config.get('OLLAMA_MODEL'),
      prompt,
    });

    return this.httpService.request(options, data);
  }

  async testOpenAI() {
    const model = new ChatOpenAI();
    // const model = new ChatOpenAI({ model: 'gpt-4' });
    // 404 The model `gpt-4` does not exist or you do not have access to it.
    // 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.
    const messages = [
      new SystemMessage('Translate the following from English into Korean'),
      new HumanMessage('hi!'),
    ];

    const result = await model.invoke(messages);
    return result;
  }

  async testAnthropic() {
    const model = new ChatAnthropic({
      model: 'claude-3-5-sonnet-20240620',
      temperature: 0,
    });
    //400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Claude API. Please go to Plans & Billing to upgrade or purchase credits."}}
    const messages = [
      new SystemMessage('Translate the following from English into Korean'),
      new HumanMessage('hi!'),
    ];

    const result = await model.invoke(messages);
    return result;
  }

  async testVertexAI() {
    const model = new ChatVertexAI({
      model: 'gemini-1.5-flash',
      temperature: 0,
    });

    const msg1 = new SystemMessage(
      'Translate the following from English into Korean'
    );
    const msg2 = new HumanMessage('hi!');
    const messages = [msg1, msg2];
    const result = await model.invoke(messages);
    return result;
  }

  async testOllama() {
    const options = {
      hostname: this.config.get('OLLAMA_HOST'),
      port: this.config.get('OLLAMA_PORT'),
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify({
      model: this.config.get('OLLAMA_MODEL'),
      prompt: 'Why is the sky blue?',
    });

    const makeRequest = () => {
      const req = request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
          console.log('Response chunk:', chunk);
        });

        res.on('end', () => {
          console.log('No more data in response.');
        });
      });

      req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
      });

      // Write data to request body
      req.write(data);
      req.end();
    };

    makeRequest();
  }

  private get client(): Knex {
    return this.pgsqlProvider.client;
  }
  async test() {
    const result = await this.client('users').select('*');
    console.log(result);
    return 'Hello world';
  }
}
