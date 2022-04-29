import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typeDefs: ['./../*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.schema') },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
