import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../Models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const authRepository = getRepository(User);

        const user = await authRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Email/password not founded');
        }
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Email/password not founded');
        }

        return { user };
    }
}

export default AuthenticateUserService;
