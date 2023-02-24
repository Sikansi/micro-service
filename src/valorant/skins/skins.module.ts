import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinsController } from './skins.controller';
import { SkinsService } from './skins.service';
import { Skin, SkinSchema } from 'src/schemas/skin.schema';
import { Module } from '@nestjs/common';

/*
https://docs.nestjs.com/modules
*/

@Module({
  imports: [
    MongooseModule.forFeature([{name: Skin.name, schema: SkinSchema}]),
    HttpModule,
],
  controllers: [SkinsController],
  providers: [SkinsService],
})
export class SkinsModule {}
