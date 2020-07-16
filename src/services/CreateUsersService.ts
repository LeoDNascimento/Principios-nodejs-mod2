interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUsersService {
    public async execute(): Promise<void> {}
}

export default CreateUsersService;
