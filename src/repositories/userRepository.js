const User = require('../models/user');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor() {
        this.users = [];
        this.currentId = 1;
    }

    async create(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(this.currentId++, username, hashedPassword);
        this.users.push(user);
        return user;
    }

    async findByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    async validatePassword(user, password) {
        return bcrypt.compare(password, user.password);
    }
}

module.exports = new UserRepository();