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
import puppeteer from 'puppeteer';
import { KnexPgsqlProvider } from '@app/database/clients/knex/knex.pgsql.provider';

@Injectable()
export class PuppeteerRepository {
  constructor(
    private readonly config: ConfigService,
    private readonly oracleProvider: KnexOracleProvider
  ) {}

  private get client(): Knex {
    return this.oracleProvider.client;
  }

  async saveResponse(prompt: string, response: string): Promise<void> {
    console.log(prompt);
    console.log(response);
    // await this.client('chatgpt_responses').insert({
    //   prompt,
    //   response,
    //   created_at: new Date(),
    // });
  }
}
