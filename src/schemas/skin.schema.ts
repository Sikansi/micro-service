import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SkinsDto } from 'src/dtos/skins.dto';

export type SkinDocument = Skin & Document;

@Schema()
export class Skin {
    @Prop()
    name: string;

    @Prop()
    id: string;

    @Prop({type: SkinsDto})
    data: SkinsDto;

    @Prop()
    url: string;
}

export const SkinSchema = SchemaFactory.createForClass(Skin);