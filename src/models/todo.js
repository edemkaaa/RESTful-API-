class Todo {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = false;
        this.createdAt = new Date();
    }
}

module.exports = Todo;