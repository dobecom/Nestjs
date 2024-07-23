import { Injectable } from '@nestjs/common';
import { Document, VectorStoreIndex } from 'llamaindex';

@Injectable()
export class AiService {
  async getHello() {
    // Create Document object with essay
    const document = new Document({
      text: 'Hi. first try to test llama index',
    });

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index = await VectorStoreIndex.fromDocuments([document]);

    // Query the index
    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query({
      query: 'What did the author do in college?',
    });
    // Output response
    console.log(response.toString());

    return 'Hello World!';
  }
}
