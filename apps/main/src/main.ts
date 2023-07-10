import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'mySecretKey',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    done(null, id);
  });
  app.enableCors({
    origin: [
      'http://localhost:4000',
    ],
    credentials: true,
  });
  await app.listen(process.env.API_PORT);
  console.log(
    `====== Application is running on: ${await app.getUrl()} as ${
      process.env.STAGE
    } ======`
  );
}
bootstrap();
