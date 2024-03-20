import { AuthPayloadDto } from '../dto';


declare global {
    namespace Express {
        interface Request {
            user?: AuthPayloadDto
        }
    }
}