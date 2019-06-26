import { TanamConfig } from '../models';

let tanamConfig: TanamConfig = {
    firebaseApp: {
        apiKey: process.env.TANAM_API_KEY,
        authDomain: process.env.TANAM_AUTH_DOMAIN,
        databaseURL: `https://${process.env.TANAM_DATABASE_INSTANCE}.firebaseio.com`,
        projectId: process.env.TANAM_PROJECT_ID,
        storageBucket: process.env.TANAM_STORAGE_BUCKET,
        messagingSenderId: process.env.TANAM_MESSAGING_SENDER_ID,
        appId: process.env.TANAM_APP_ID,
    },
    users: {
        [process.env.TANAM_SUPER_ADMIN]: 'superAdmin',
    }
};
export function setConfig(config: TanamConfig) {
    console.log(`[ConfigService:setConfig] ${JSON.stringify({ config })}`)
    tanamConfig = { ...tanamConfig, ...config };
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
