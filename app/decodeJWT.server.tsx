import * as jwt from 'jsonwebtoken'

export default function decode (token: string) {
  return jwt.decode(token)
}
