import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { EnvService } from '@app/common/env/env.service';
import { Logger, ValidationPipe } from '@nestjs/common';

// serializing for using passport-google-oauth to authenticate user
// const serializeUser = () => {
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id: string, done) => {
//     done(null, id);
//   });
// }
const logger = new Logger('Main Application');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

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
      secret: envService.get('SESSION_SECRET') || 'default',
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
    origin: (envService.get('CORS_ORIGINS') as string).split('||') || [],
    credentials: true,
  });

  await app.listen(envService.get('API_PORT') || 3000);

  logger.log(
    `Application is running on: ${await app.getUrl()} as ${
      envService.get('STAGE') || 'LOCAL'
    }}`
  );
}
bootstrap();
