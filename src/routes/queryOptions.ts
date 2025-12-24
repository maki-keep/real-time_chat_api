import type { Request } from 'express';

const queryOptions = (request: Request) => {
  const limit = request.query.limit as string | undefined;
  const offset = request.query.offset as string | undefined;

  const options: { [key: string]: string | number | undefined; } = {
    ...request.query,
    limit: limit ? parseInt(limit, 10) : undefined,
    offset: offset ? parseInt(offset, 10) : undefined,
  };
  return options;
};

export default queryOptions;
