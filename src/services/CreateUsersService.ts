import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../Models/User';
import AppError from '../error/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUsersService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email address already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        delete user.password;

        return user;
    }
}

export default CreateUsersService;
