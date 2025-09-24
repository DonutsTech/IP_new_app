import { JwtPayload } from 'jsonwebtoken';

export interface Payload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}
