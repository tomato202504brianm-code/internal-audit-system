import { Request, Response } from "express";
import { users } from "../data/users";
import { hashPassword,comparePassword } from "../utils/password";
import { isMainThread } from "node:worker_threads";


export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body; 

    if(!username || !password) {
        return res.status(400).json({ 
            message: 'Username and password are required' 
        });
    }

    const existingUser = users.find(user => user.username === username);
    if(existingUser) {
        return res.status(409).json({ 
            message: 'Username already exists' 
        });
    }

    const passwordHash = await hashPassword(password);
    users.push({ username, passwordHash });

    return res.status(201).json({ 
        message: 'User registered successfully',
        user: { username } 
    });
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log('--- TEST LOG 123 ---');

    if(!username || !password) {
        return res.status(400).json({ 
            message: 'Username and password are required' 
        });
    }

    const user=users.find(u=>u.username===username);

    if(!user) {
        return res.status(401).json({ 
            message: 'Invalid username or password' 
        });
    }

    const isMatch=await comparePassword(password,user.passwordHash);

    if(!isMatch){
        return res.status(401).json({ 
            message: 'Invalid username or password' 
        });
    }


    return res.json({ 
        message: 'Login successful',
        user: { username: user.username } 
    });
};