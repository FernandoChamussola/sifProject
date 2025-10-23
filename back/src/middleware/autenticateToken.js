//midleware to authenticate token
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'price';

export async function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (token == null) return res.sendStatus(401);
    
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token inválido' });
    
            req.user = user;
            //console.log('User authenticated:', req.user)
            next();
        });
    }