import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../Models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const authRepository = getRepository(User);

        const user = await authRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Email/password incorrect');
        }
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Email/password incorrect');
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiredin,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
