import { Body, Controller, Delete, Get, Header, Param, Post, Req } from '@nestjs/common';
import { SkinsDto } from 'src/dtos/skins.dto';
import { SkinsService } from './skins.service';

@Controller('skins')
export class SkinsController {
    constructor(private skinsService: SkinsService) {}
    
    @Get()
    async findAll(): Promise<SkinsDto> {
        return await this.skinsService.getSkins();
    }

    @Get('chromas')
    async findChromas(): Promise<any> {
        return await this.skinsService.getChromas();
    }

    @Get('levels')
    async findLevels(): Promise<any> {
        return await this.skinsService.getLevels();
    }

    @Post('save')
    async saveSkin(@Body('id') id: string): Promise<any> {
        return await this.skinsService.saveSkin(id);
    }

    @Delete()
    async deleteSkin(@Body('id') id: string): Promise<any> {
        return await this.skinsService.deleteSkin(id);
    }

    @Get('findById')
    async findById(@Body('id') id: string): Promise<any> {
        return await this.skinsService.findSkin(id);
    }

    @Get('findImage')
    async findImage(@Body('id') id: string): Promise<any> {
        return await this.skinsService.getSkinImage(id);
    }

    @Get('listSkins')
    async listSkins(): Promise<any[]> {
        return await this.skinsService.listSkins();
    }

    @Post('saveAll')
    async saveAll(): Promise<any> {
        return await this.skinsService.saveAll();
    }

    @Delete('deleteAll')
    async deleteAll(): Promise<any> {
        return await this.skinsService.deleteAll();
    }
}
