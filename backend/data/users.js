import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Rajat Agarwal',
        email: 'rajat@example.com',
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: 'Cool Boy',
        email: 'coolboy@example.com',
        password: bcrypt.hashSync('123456',10)
    },
]

export default users;