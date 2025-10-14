import AuthService from '../services/auth.js';


class AuthController {

    async register(req, res) {
       // console.log("Register request received");
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
       // console.log("Login request received");
        try {
            const { email, senha } = req.body;
            const user = await AuthService.login(email, senha);
            res.json(user);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

export default new AuthController();