// appLoader.ts
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { createServer, Server } from 'http';
import morgan from 'morgan';

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';

const appLoader = async (app: Express, router: any) => {
  console.log('Starting URL Backend Service...');

  return new Promise<void>(resolve => {
    const server: Server = createServer(app);

    // Express Middlewares
    const allowedOrigins = [
    'https://url-monitor-frontend.netlify.app',
    'http://localhost:5173'
  ];

    app.use(
      cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan('dev'));

    // Routes
    app.use('/api', router);

    // 404 Middleware
    app.use((req, res) => {
      res
      .status(404)
      .send({
        success: false,
        data: undefined,
        message: 'The resource you are looking for is not found.'
      });
    });

    // Start Server
    server.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
      resolve();
    });
  });
};

export { appLoader };
