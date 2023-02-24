import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { SkinsDto } from 'src/dtos/skins.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Skin, SkinDocument } from 'src/schemas/skin.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkinsService {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Skin.name) private skinModel: Model<SkinDocument>
        ) {}

    public async getSkins(): Promise<SkinsDto>{
        const { data } = await firstValueFrom(
            this.httpService.get('https://valorant-api.com/v1/weapons/skins').pipe(
                catchError((error: AxiosError) => {
                    throw 'Error getting skins';
                }),
            ),
        );
        return data;
    }

    public async getChromas(): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get('https://valorant-api.com/v1/weapons/skinchromas').pipe(
                catchError((error: AxiosError) => {
                    throw 'Error getting chromas';
                }),
            ),
        );
        return data;
    }

    public async getLevels(): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get('https://valorant-api.com/v1/weapons/skinlevels').pipe(
                catchError((error: AxiosError) => {
                    throw 'Error getting chromas';
                }),
            ),
        );
        return data;
    }

    public async saveSkin(id: string): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get(`https://valorant-api.com/v1/weapons/skins/${id}`).pipe(
                catchError((error: AxiosError) => {
                    throw 'Error getting skin';
                }),
            ),
        );
        const skin = new this.skinModel({
            name: data.data.displayName,
            id,
            data,
            url: data.data.displayIcon,
        });
        skin.save();
        return 'Skin salva com sucesso';
    }

    public async deleteSkin(id: string): Promise<any> {
       var response = "";
       await this.skinModel.deleteOne({id}, function(err, result) {
        if(err) {
            response = 'Skin não encontrada';
        } else {
            response = 'Skin excluida com sucesso';
        }
       });
       return response;
    }

    public async findSkin(id: string): Promise<any> {
        var skin = await this.skinModel.findOne({id});
        if(skin != null) {
            return skin;
        } else {
            return 'Skin não encontrada';
        }
    }

    public async getSkinImage(id: string): Promise<any> {
        var skin = await this.skinModel.findOne({id});
        if(skin != null) {
            return skin.url;
        } else {
            return 'Skin não encontrada';
        }
    }

    public async listSkins(): Promise<any[]> {
        var skin = await this.skinModel.find();
        var skinList = new Array<any>();
        skin.forEach(value => {
            skinList.push(value.name + ' - ' + value.id);
        });
        return skinList;
    }

    public async saveAll(): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get('https://valorant-api.com/v1/weapons/skins').pipe(
                catchError((error: AxiosError) => {
                    throw 'Error getting skins';
                }),
            ),
        );
        data.data.forEach(data => {
            const skin = new this.skinModel({
                name: data.displayName,
                id: data.uuid,
                data: {
                    status: 200,
                    data,
                },
                url: data.displayIcon,
            });
            skin.save();
        })
        return 'Skins salvas com sucesso';
    }

    public async deleteAll(): Promise<any> {
        await this.skinModel.deleteMany();
        return 'Skins excluidas com sucesso';
    }
}
