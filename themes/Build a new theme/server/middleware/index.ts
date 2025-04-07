import { defineEventHandler, fromNodeMiddleware, createError } from 'h3';
import express from 'express';
import config from 'config';

// Create Express middleware
const expressMiddleware: any = express.Router();
expressMiddleware.use(express.json({ limit: '50mb' }));
expressMiddleware.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Convert Express middleware to H3-compatible handler
const h3ExpressHandler = fromNodeMiddleware(expressMiddleware);

export default defineEventHandler(async (event) => {
  try {
    // Attach config to event context
    const tokenConfig = config.get<{ clientId: string; clientSecret: string }>(
      'token'
    );
    event.context.config = {
      env: config.get<string>('env'),
      token: tokenConfig,
    };

    // Apply Express middleware
    await h3ExpressHandler(event);
  } catch (error) {
    console.error('Middleware error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});
