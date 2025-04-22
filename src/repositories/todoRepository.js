class TodoRepository {
    constructor() {
        this.todos = [];
        this.currentId = 1;
    }

    findAll() {
        return this.todos;
    }

    findById(id) {
        return this.todos.find(todo => todo.id === id);
    }

    create(todoData) {
        const todo = new Todo(
            this.currentId++,
            todoData.title,
            todoData.description
        );
        this.todos.push(todo);
        return todo;
    }

    update(id, todoData) {
        const todo = this.findById(id);
        if (!todo) return null;

        Object.assign(todo, todoData);
        return todo;
    }

    delete(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;
        
        this.todos.splice(index, 1);
        return true;
    }
}

module.exports = new TodoRepository();