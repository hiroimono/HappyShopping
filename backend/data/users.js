import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'hiroi',
        email: 'hiroi@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'mono',
        email: 'mono@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
]

export default users;