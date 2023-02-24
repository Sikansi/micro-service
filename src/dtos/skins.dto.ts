export class SkinsDto {
    status: number;
    data: {
        uuid: string;
        displayName: string;
        themeUuid: string;
        contentTierUuid: string;
        displayIcon: string;
        wallpaper: string;
        assetPath: string;
        chromas: {
            uuid: string;
            displayName: string;
            displayIcon: string;
            fullRender: string;
            swatch: string;
            streamedVideo: string;
            assetPath: string;
        }[];
        levels: {
            uuid: string;
            displayName: string;
            levelItem: string;
            displayIcon: string;
            streamedVideo: string;
            assetPath: string;
        }[];
    }[];
}