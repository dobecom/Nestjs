import { Injectable } from '@nestjs/common';
import puppeteer, { executablePath, Page } from 'puppeteer-core';
import { PuppeteerRepository } from './puppeteer.repository';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@app/common/ext-http/http.service';

@Injectable()
export class PuppeteerService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly puppeteerRepository: PuppeteerRepository
  ) {}

  // async handlePrompt(prompt: string): Promise<any> {
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     executablePath: executablePath('chrome'),
  //   });
  //   const page = await browser.newPage();
  //   console.log(prompt);
  //   try {
  //     const gotoResult = await page.goto(
  //       'https://copilot.microsoft.com/onboarding'
  //     );
  //     await page.waitForSelector('button:has-text("Sign in")');
  //     await page.click('button:has-text("Sign in")');

  //     // 로그인 페이지로 리다이렉트 기다리기
  //     await page.waitForNavigation({ waitUntil: 'networkidle0' });

  //     // login.microsoftonline.com에서 이메일 입력란 대기
  //     await page.waitForSelector('#i0116');
  //     // 이메일 입력 (실제 로그인용 이메일로 변경)
  //     await page.type('#i0116', 'your_email@example.com', { delay: 50 });

  //     // Next 버튼 누르기
  //     await page.click('#idSIButton9');

  //     // 이후 비밀번호 입력 등 추가 단계 처리...
  //     await page.waitForNavigation({ waitUntil: 'networkidle0' });

  //     // Save the response to the database
  //     // await this.puppeteerRepository.saveResponse(prompt, response);

  //     // return { success: true, data: response };
  //   } catch (error) {
  //     console.error('Error processing prompt:', error);
  //     throw error;
  //   } finally {
  //     await browser.close();
  //   }
  // }

  // private async typeAndEnterPrompt(page: Page, prompt: string) {
  //   // Wait for the input area to load

  //   const waitResult = await page.waitForSelector('#prompt-textarea');
  //   console.log('waitResult');
  //   console.log(waitResult);
  //   await page.setUserAgent(
  //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36'
  //   );
  //   await page.setViewport({ width: 1280, height: 800 });

  //   // Type the prompt into the contenteditable ProseMirror element
  //   // await page.evaluate((inputPrompt) => {
  //   //   const textarea = document.querySelector(
  //   //     '#prompt-textarea'
  //   //   ) as HTMLElement;
  //   //   textarea.innerHTML = `<p>${inputPrompt}</p>`;
  //   //   textarea.dispatchEvent(new Event('input', { bubbles: true }));
  //   // }, prompt);

  //   await page.type('#prompt-textarea', prompt, { delay: 50 });

  //   // Wait for 3 seconds to ensure all elements are fully loaded

  //   // Puppeteer 버전 상관 없이 사용할 수 있는 3초 대기 코드
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  //   // Wait for the send button and click it instead of pressing Enter
  //   await page.waitForSelector('[data-testid="send-button"]', {
  //     timeout: 5000,
  //   });
  //   await page.click('[data-testid="send-button"]');

  //   // // Press Enter to submit the prompt
  //   // await page.keyboard.press('Enter');

  //   // Puppeteer 버전 상관 없이 사용할 수 있는 3초 대기 코드
  //   await new Promise((resolve) => setTimeout(resolve, 10000));

  //   // Wait for the response to load by monitoring changes in the response area
  //   await page.waitForSelector('article[data-testid="conversation-turn"]');

  //   // Extract the latest response based on the content structure
  //   const response = await page.evaluate(() => {
  //     const responseElements = document.querySelectorAll(
  //       'article[data-testid="conversation-turn"]'
  //     );
  //     const lastResponseElement = responseElements[responseElements.length - 1];
  //     if (!lastResponseElement) return null;
  //     const assistantResponse = lastResponseElement.querySelector(
  //       '[data-message-author-role="assistant"] .markdown'
  //     );
  //     return assistantResponse ? assistantResponse.textContent : null;
  //   });

  //   if (!response) {
  //     throw new Error('No response received from ChatGPT');
  //   }
  // }
  async handlePrompt(prompt: string): Promise<any> {
    const browser = await puppeteer.launch({
      headless: false,
      // executablePath: executablePath('chrome'),
    });
    const page = await browser.newPage();
    console.log(prompt);
    try {
      const gotoResult = await page.goto('https://chatgpt.com/');
      await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      );
      console.log('gotoResult');
      console.log(gotoResult);
      /*
      <button class="btn relative btn-primary btn-small" data-testid="login-button"><div class="flex items-center justify-center">Log in</div></button>
      */
      await page.click('button[data-testid="login-button"]');

      await new Promise((resolve) => setTimeout(resolve, 30000));
      // Save the response to the database
      // await this.puppeteerRepository.saveResponse(prompt, response);

      // return { success: true, data: response };
    } catch (error) {
      console.error('Error processing prompt:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  async bypass(prompt: string): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // navigate to a URL
    await page.goto('https://chatgpt.com', {
      waitUntil: 'load',
    });

    // take page screenshot
    await page.screenshot({ path: 'screenshot.png' });

    // close the browser instance
    await browser.close();
  }
}
