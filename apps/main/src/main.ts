import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { EnvService } from '@app/common/env/env.service';

// serializing for using passport-google-oauth to authenticate user
// const serializeUser = () => {
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id: string, done) => {
//     done(null, id);
//   });
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const envService = app.get(EnvService);

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    // .setDescription('NestJS 1.0')
    // .setVersion('1.0')
    // .addTag('NestJS API Specification')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(
    session({
      secret: envService.get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(passport.initialize());
  app.use(passport.session());

  // Google Auth Guard Redirect
  // serializeUser();

  app.enableCors({
    origin: ['http://localhost:4000'],
    credentials: true,
  });

  await app.listen(envService.get('API_PORT'));

  console.log(
    `====== Application is running on: ${await app.getUrl()} as ${
      envService.get('STAGE')
    } ======`
  );
}
bootstrap();
