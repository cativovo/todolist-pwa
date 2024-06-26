import { fastifySecureSession } from '@fastify/secure-session';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { UserWithoutPassword } from './users/users.service';

declare module '@fastify/secure-session' {
  interface SessionData {
    user: UserWithoutPassword;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const sessionSecret = configService.get('SESSION_SECRET');
  const sessionSalt = configService.get('SESSION_SALT');

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:5173',
  });
  await app.register(fastifySecureSession, {
    secret: sessionSecret,
    salt: sessionSalt,
    cookie: {
      secure: true,
    },
  });

  await app.listen(port);
}
bootstrap();
