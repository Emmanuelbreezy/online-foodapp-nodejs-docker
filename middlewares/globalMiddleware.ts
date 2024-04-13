import { AuthPayloadDto } from '../dto';


declare global {
    namespace Express {
        interface Request {
            user?: AuthPayloadDto
        }
    }
}

declare module 'express-session' {
    interface SessionData {
      user: any; // Adjust the type according to your user object structure
    }
  }
  