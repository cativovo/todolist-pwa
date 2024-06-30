import { fastifySecureSession } from '@fastify/secure-session';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify from 'fastify';
import { AppModule } from './app.module';
import { UserWithoutPassword } from './users/schemas/user';

declare module '@fastify/secure-session' {
  interface SessionData {
    user: UserWithoutPassword;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: UserWithoutPassword;
  }
}

async function bootstrap() {
  const server = fastify();
  server.decorateRequest('user', null);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(server),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const sessionSecret = configService.get('SESSION_SECRET');
  const sessionSalt = configService.get('SESSION_SALT');

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  });
  await app.register(fastifySecureSession, {
    secret: sessionSecret,
    salt: sessionSalt,
    cookie: {
      secure: true,
      path: '/',
    },
  });

  await app.listen(port);
}
bootstrap();
