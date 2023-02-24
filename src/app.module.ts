import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkinsModule } from './valorant/skins/skins.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    SkinsModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/valorant'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
