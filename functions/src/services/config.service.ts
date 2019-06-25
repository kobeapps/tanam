import { TanamConfig } from '../models';

let tanamConfig: TanamConfig = {
    firebaseApp: {
        apiKey: process.env.TANAM_API_KEY,
    },
    users: {
        [process.env.TANAM_SUPER_ADMIN]: 'superAdmin',
    }
};
export function setConfig(config: TanamConfig) {
    console.log(`[ConfigService:setConfig] ${JSON.stringify({ config })}`)
    tanamConfig = { ...config };
}

export function getPublicConfig(): TanamConfig {
    return !tanamConfig ? null : {
        firebaseApp: tanamConfig.firebaseApp,
        loginProviders: tanamConfig.loginProviders,
    } as TanamConfig;
}

export function getConfig(): TanamConfig {
    return !!tanamConfig ? { ...tanamConfig } : null;
}
