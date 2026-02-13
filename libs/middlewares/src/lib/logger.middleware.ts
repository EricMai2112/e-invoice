import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { getProcessId } from '@common/utils/string.util';
import { MetadataKeys } from '@common/constants/common.constant';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const starTime = Date.now();
    const { method, originalUrl, body } = req;
    const processId = getProcessId();
    const now = Date.now();

    (req as any)[MetadataKeys.PROCESS_ID] = processId;
    (req as any)[MetadataKeys.START_TIME] = starTime;

    Logger.log(
      `HTTP >> Start process '${processId}' >> path: '${originalUrl}' >> method: '${method}' at '${now}' >> input: ${JSON.stringify(body)}`,
    );

    const originalSend = res.send.bind(res);

    res.send = (body: any) => {
      const durationMs = Date.now() - starTime;
      Logger.log(
        `HTTP >> End process '${processId}' >> path: '${originalUrl}' >> method: '${method}' at '${now}' >> duration: ${durationMs} ms`,
      );

      return originalSend(body);
    };

    next();
  }
}
