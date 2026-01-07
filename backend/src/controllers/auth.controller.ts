import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log('Login Attempt:', { username, password });

    if(!username || !password) {
        return res.status(400).json({ 
            message: 'Username and password are required' 
        });
    }


    return res.json({ 
        message: 'Login successful',
        user: { username } 
    });
};