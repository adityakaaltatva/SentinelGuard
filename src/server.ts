import Fastify from 'fastify';
import { config } from './shared/config.js';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
});

app.get('/health', async () => {
  return {
    status: 'ok',
    service: 'sentinelguard'
  };
});

const start = async () => {
  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
export { app };