import { Router } from 'express';
import { hashPassword,comparePassword } from "../utils/password";


const router = Router();

const fakeUser = {
    username: 'testuser',
    // This is a bcrypt hash for the password 'password123'
    passwordHash: '$2a$10$22mqrzn.Cipbzl0bCh7GbOVcmz5.eQoURzyE9aw8PR4M3eckYbm6K'
};

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // 1. Guard Clause: Check if user exists
    // Inside your login route
if (username !== fakeUser.username) {
    return res.status(401).json({
        message: 'ユーザー名を入力してください',
    });
}

    // 2. Compare the password
    const isMatch = comparePassword(password, fakeUser.passwordHash);

    // 3. Guard Clause: If the password DOES NOT match, exit with error
    if (!isMatch) {
        return res.status(401).json({
            message: 'ユーザー名またはパスワードが正しくありません'
        });
    }

    // 4. Success Path: If we reach this line, both checks passed.
    // We use status 200 (OK) for successful login.
    return res.status(200).json({
        message: 'ログイン成功',
        body: {
            user: { username }
        }
    });
});

export default router;