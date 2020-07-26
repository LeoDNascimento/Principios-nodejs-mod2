/* eslint-disable camelcase */

import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../Models/User';
import AppError from '../error/AppError';

interface Request {
    user_id: string;
    avatarFilename: string;
}
class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            // deleta avatar anterior

            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;
