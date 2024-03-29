import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const verifyJWT : (req: NextApiRequest, res: NextApiResponse, token: string) => Promise<object> = (req: NextApiRequest, res: NextApiResponse, token: string) => {

  return new Promise((resolve, reject) => {
    // Check if process.env.JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      reject(new Error("JWT secret not defined"));
    }
// console.log('the token we received', token);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        // res.status(401).json({ success: false, error: 'Unauthorized' });
        resolve({ success: false })

      } else if (!decoded) {
        console.error('Decoded payload is undefined');
        // res.status(401).json({ success: false, error: 'Unauthorized' });
        resolve({ success: false })
      }

      else {
 
        resolve({ success: true, decoded })
      }
    })
  });
}
export default verifyJWT