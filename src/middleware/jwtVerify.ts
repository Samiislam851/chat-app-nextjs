import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const verifyJWT: (req: NextApiRequest, res: NextApiResponse, token: string) => boolean | void = (req: NextApiRequest, res: NextApiResponse, token: string) => {
  // Check if process.env.JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret not defined");
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);

      return null
    } else if (!decoded) {
      console.error('Token verification failed:');
      return null
    }

    else {
      console.log('Token verification succeeded:', decoded);
      // Proceed with handling the request or additional logic
      return decoded
    }
  });
}

export default verifyJWT