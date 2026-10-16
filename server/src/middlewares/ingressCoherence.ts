import { NextFunction, Request, Response } from "express";

/**
 * Stamps each incoming request with a monotonic start time so downstream
 * middleware and error handlers can attach elapsed-ms to logs.
 */
export const ingressCoherenceGate = (req: Request, _res: Response, next: NextFunction): void => {
  (req as Request & { _startMs: number })._startMs = Date.now();
  next();
};
