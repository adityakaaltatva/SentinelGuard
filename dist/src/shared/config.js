import 'dotenv/config';
export const config = {
    env: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    databaseUrl: process.env.DATABASE_URL
};
export const isProduction = config.env === 'production';
