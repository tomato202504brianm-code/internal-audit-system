import {Router} from 'express';

const router = Router();

router.post('/login', (req,res)=>{

    const {username}=req.body;

    console.log('login attempt:', {username});

    res.json({
        message: 'Login successful',
        body: {
            user:   { username }
        }
    });
});

export default router;