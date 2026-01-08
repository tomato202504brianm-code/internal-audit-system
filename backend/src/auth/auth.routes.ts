import { Router } from 'express';
import { hashPassword, comparePassword } from "../utils/password";
import { findUserByUsername } from '../repositories/user.repository';


const router = Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(401).json({
            message: 'ユーザーが見つかりません',
        });
    }

    // 2. Compare the password
    const isMatch =await comparePassword(password, user.password_hash);

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