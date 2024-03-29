import connectDB from "@/middleware/mongooseMiddleware";
import { User } from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next"
const jwt = require('jsonwebtoken');


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {


        const { email, name, image, password } = req.body


        const user = await User.findOne({ email: email })
   
        

        if (!user) {
            try {
                const newUser = new User({
                    password: password,
                    name: name,
                    email: email,
                    image: image,
                    
                })

                const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                    expiresIn: '5h'
                })
          

                const response = await newUser.save()

                res.status(200).json({ response, token })

            } catch (error) {
                console.log(error);
            }

        } else {


            console.log(user);
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: '5h'
            })


            res.status(200).json({ user, token })
        }
    }
    else {
        res.status(400).json({ message: 'Bad Request' })
    }



}

export default connectDB(handler)