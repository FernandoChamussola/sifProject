import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const JWT_SECRET = 'price';


class AuthService {
  async register(data) {
    if (!data.nome) {
      throw new Error('Campo nome é obrigatório');
    }

    if (!data.email) {
      throw new Error('Campo email é obrigatório');
    }

    if (!data.telefone) {
      throw new Error('Campo telefone é obrigatório');
    }

    if (!data.senhaHash) {
      throw new Error('Campo senhaHash é obrigatório');
    }

    if (!data.perfil) {
      throw new Error('Campo perfil é obrigatório');
    }

    if(!data.morada){
      throw new Error('Campo morada é obrigatório');
    }

    const existingUser = await prisma.usuario.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Usuário já existe');
    }
     
   // console.log("111111111111111111111111111111111111111")
    const hashedPassword = await bcrypt.hash(data.senhaHash, 10);

    const user = await prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senhaHash: hashedPassword,
        telefone: data.telefone,
        perfil: data.perfil,
        morada: data.morada
      }

    });

    return user;
  }

    async login(email, senha) {
      const user = await prisma.usuario.findUnique({
        where: { email },
      });    

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senhaHash);

      if (!isPasswordValid) {
        throw new Error('Senha inválida');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      const { senhaHash, ...userData } = user;
      return { token , userData};
    }
  

  async verifyToken(token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
      } catch (err) {
        throw new Error('Token inválido');
      }
    }
  }

  export default new AuthService();

