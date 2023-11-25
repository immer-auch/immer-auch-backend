import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Immer-Auch-Backend')
    .setDescription('Immer-Auch-Backend Description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api', 'Local Development')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 'swagger' is the path you can access the docs from
  SwaggerModule.setup('swagger', app, document);
}
