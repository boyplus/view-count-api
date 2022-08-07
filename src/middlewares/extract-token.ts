import { Request } from 'express';

const extractToken = (req: Request) => {
  console.log('header is');
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }
};

export default extractToken;
