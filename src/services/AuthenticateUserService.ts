import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../Models/User';

interface Request {
    email: string;
    password: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<void> {
        const authRepository = getRepository(User);

        const user = await authRepository.findOne({ where: email });

        if (!user) {
            throw new Error('Email/password not founded');
        }
    }
}

export default AuthenticateUserService;
