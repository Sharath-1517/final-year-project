import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const { url } = req;
    console.log(`Requesting from ${url}`);
  }
}
