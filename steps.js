// ========================================
// OOP TODO LIST MANAGER - BUILDING STEP BY STEP
// ========================================

// ========================================
// STEP 1: Create Empty TodoList Class
// ========================================

class TodoList {
    constructor() {
        // We'll add properties here later
    }
}

// Test Step 1
console.log('Step 1: Empty TodoList class created');
const todoList = new TodoList();
console.log('TodoList instance:', todoList);

// ========================================
// STEP 2: Add Basic Properties to TodoList
// ========================================

class TodoList {
    constructor() {
        this.todos = [];           // Array to store todos
        this.currentFilter = 'all'; // Default filter
    }
}

// Test Step 2
console.log('Step 2: Added basic properties');
const todoList2 = new TodoList();
console.log('Todos array:', todoList2.todos);
console.log('Current filter:', todoList2.currentFilter);

// ========================================
// STEP 3: Create Empty Todo Class
// ========================================

class Todo {
    constructor(title) {
        // We'll add more properties here later
    }
}

// Test Step 3
console.log('Step 3: Empty Todo class created');
const todo = new Todo('Learn JavaScript');
console.log('Todo instance:', todo);

// ========================================
// STEP 4: Add Properties to Todo Class
// ========================================

class Todo {
    constructor(title, description = '', priority = 'medium') {
        this.id = Date.now().toString(); // Simple ID for now
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }
}

// Test Step 4
console.log('Step 4: Added properties to Todo class');
const todo2 = new Todo('Learn JavaScript', 'Study OOP concepts', 'high');
console.log('Todo with properties:', todo2);
console.log('Todo title:', todo2.title);
console.log('Todo priority:', todo2.priority);

// ========================================
// STEP 5: Add addTodo Method to TodoList
// ========================================

class TodoList {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
    }

    addTodo(title, description, priority) {
        const todo = new Todo(title, description, priority);
        this.todos.push(todo);
        return todo;
    }
}

// Test Step 5
console.log('Step 5: Added addTodo method');
const todoList3 = new TodoList();
todoList3.addTodo('Learn HTML', 'Study basic tags', 'low');
todoList3.addTodo('Learn CSS', 'Study styling', 'medium');
console.log('Todos after adding:', todoList3.todos);

// ========================================
// STEP 6: Add removeTodo Method
// ========================================

class TodoList {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
    }

    addTodo(title, description, priority) {
        const todo = new Todo(title, description, priority);
        this.todos.push(todo);
        return todo;
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}

// Test Step 6
console.log('Step 6: Added removeTodo method');
const todoList4 = new TodoList();
const todo1 = todoList4.addTodo('Learn HTML', 'Study basic tags', 'low');
const todo2 = todoList4.addTodo('Learn CSS', 'Study styling', 'medium');
console.log('Before removal:', todoList4.todos.length, 'todos');
todoList4.removeTodo(todo1.id);
console.log('After removal:', todoList4.todos.length, 'todos');

// ========================================
// STEP 7: Add toggleComplete Method to Todo
// ========================================

class Todo {
    constructor(title, description = '', priority = 'medium') {
        this.id = Date.now().toString();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

// Test Step 7
console.log('Step 7: Added toggleComplete method');
const todo3 = new Todo('Learn JavaScript', 'Study OOP', 'high');
console.log('Before toggle:', todo3.completed);
todo3.toggleComplete();
console.log('After toggle:', todo3.completed);

// ========================================
// STEP 8: Add getStatistics Method
// ========================================

class TodoList {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
    }

    addTodo(title, description, priority) {
        const todo = new Todo(title, description, priority);
        this.todos.push(todo);
        return todo;
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    getStatistics() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    }
}

// Test Step 8
console.log('Step 8: Added getStatistics method');
const todoList5 = new TodoList();
todoList5.addTodo('Learn HTML', 'Study basic tags', 'low');
todoList5.addTodo('Learn CSS', 'Study styling', 'medium');
todoList5.addTodo('Learn JavaScript', 'Study OOP', 'high');
console.log('Statistics:', todoList5.getStatistics());

// ========================================
// STEP 9: Create Empty TodoUI Class
// ========================================

class TodoUI {
    constructor(todoList) {
        this.todoList = todoList;
    }
}

// Test Step 9
console.log('Step 9: Empty TodoUI class created');
const todoList6 = new TodoList();
const todoUI = new TodoUI(todoList6);
console.log('TodoUI instance:', todoUI);

// ========================================
// STEP 10: Add initializeElements Method
// ========================================

class TodoUI {
    constructor(todoList) {
        this.todoList = todoList;
        this.initializeElements();
    }

    initializeElements() {
        // Get form elements
        this.todoForm = document.getElementById('todoForm');
        this.todoTitle = document.getElementById('todoTitle');
        this.todoDescription = document.getElementById('todoDescription');
        this.todoPriority = document.getElementById('todoPriority');
        
        // Get list container
        this.todoListContainer = document.getElementById('todoList');
        
        // Get statistics elements
        this.totalTasks = document.getElementById('totalTasks');
        this.pendingTasks = document.getElementById('pendingTasks');
        this.completedTasks = document.getElementById('completedTasks');
        
        console.log('Elements initialized:', {
            form: this.todoForm,
            title: this.todoTitle,
            container: this.todoListContainer
        });
    }
}

// ========================================
// STEP 11: Add bindEvents Method
// ========================================

class TodoUI {
    constructor(todoList) {
        this.todoList = todoList;
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.todoForm = document.getElementById('todoForm');
        this.todoTitle = document.getElementById('todoTitle');
        this.todoDescription = document.getElementById('todoDescription');
        this.todoPriority = document.getElementById('todoPriority');
        this.todoListContainer = document.getElementById('todoList');
        this.totalTasks = document.getElementById('totalTasks');
        this.pendingTasks = document.getElementById('pendingTasks');
        this.completedTasks = document.getElementById('completedTasks');
    }

    bindEvents() {
        // Listen for form submission
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTodo();
        });
        
        console.log('Events bound successfully');
    }

    handleAddTodo() {
        const title = this.todoTitle.value.trim();
        const description = this.todoDescription.value.trim();
        const priority = this.todoPriority.value;

        if (title) {
            this.todoList.addTodo(title, description, priority);
            this.clearForm();
            this.render();
            console.log('Todo added successfully!');
        }
    }

    clearForm() {
        this.todoTitle.value = '';
        this.todoDescription.value = '';
        this.todoPriority.value = 'medium';
    }
}

// ========================================
// STEP 12: Add render Method
// ========================================

class TodoUI {
    constructor(todoList) {
        this.todoList = todoList;
        this.initializeElements();
        this.bindEvents();
        this.render(); // Initial render
    }

    initializeElements() {
        this.todoForm = document.getElementById('todoForm');
        this.todoTitle = document.getElementById('todoTitle');
        this.todoDescription = document.getElementById('todoDescription');
        this.todoPriority = document.getElementById('todoPriority');
        this.todoListContainer = document.getElementById('todoList');
        this.totalTasks = document.getElementById('totalTasks');
        this.pendingTasks = document.getElementById('pendingTasks');
        this.completedTasks = document.getElementById('completedTasks');
    }

    bindEvents() {
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTodo();
        });
    }

    handleAddTodo() {
        const title = this.todoTitle.value.trim();
        const description = this.todoDescription.value.trim();
        const priority = this.todoPriority.value;

        if (title) {
            this.todoList.addTodo(title, description, priority);
            this.clearForm();
            this.render();
            console.log('Todo added successfully!');
        }
    }

    clearForm() {
        this.todoTitle.value = '';
        this.todoDescription.value = '';
        this.todoPriority.value = 'medium';
    }

    render() {
        this.todoListContainer.innerHTML = '';

        if (this.todoList.todos.length === 0) {
            this.todoListContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No tasks found. Add a new task to get started!</p>
                </div>
            `;
        } else {
            this.todoList.todos.forEach(todo => {
                this.todoListContainer.appendChild(this.createTodoElement(todo));
            });
        }

        this.updateStatistics();
    }

    createTodoElement(todo) {
        const todoElement = document.createElement('div');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''} ${todo.priority}-priority`;
        
        todoElement.innerHTML = `
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-actions">
                    <button class="action-btn btn-complete" title="${todo.completed ? 'Mark as pending' : 'Mark as complete'}">
                        <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                    <button class="action-btn btn-delete" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${todo.description ? `<p class="todo-description">${todo.description}</p>` : ''}
            <div class="todo-meta">
                <span class="priority-badge priority-${todo.priority}">${todo.priority.toUpperCase()}</span>
            </div>
        `;

        // Add event listeners
        const completeBtn = todoElement.querySelector('.btn-complete');
        const deleteBtn = todoElement.querySelector('.btn-delete');

        completeBtn.addEventListener('click', () => {
            todo.toggleComplete();
            this.render();
        });

        deleteBtn.addEventListener('click', () => {
            this.todoList.removeTodo(todo.id);
            this.render();
        });

        return todoElement;
    }

    updateStatistics() {
        const stats = this.todoList.getStatistics();
        this.totalTasks.textContent = stats.total;
        this.pendingTasks.textContent = stats.pending;
        this.completedTasks.textContent = stats.completed;
    }
}

// ========================================
// STEP 13: Initialize the Application
// ========================================

// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Todo List Manager...');
    
    // Create TodoList instance
    const todoList = new TodoList();
    
    // Create TodoUI instance
    const todoUI = new TodoUI(todoList);
    
    console.log('✅ Todo List Manager initialized successfully!');
    console.log('📊 Current statistics:', todoList.getStatistics());
    
    // Make available globally for debugging
    window.todoList = todoList;
    window.todoUI = todoUI;
});

// ========================================
// STEP 14: Add Filtering Functionality
// ========================================

// Add to TodoList class
class TodoList {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
    }

    addTodo(title, description, priority) {
        const todo = new Todo(title, description, priority);
        this.todos.push(todo);
        return todo;
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    getStatistics() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            case 'pending':
                return this.todos.filter(todo => !todo.completed);
            default:
                return this.todos;
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
    }
}

// Update TodoUI render method to use filtered todos
class TodoUI {
    // ... previous methods ...

    render() {
        this.todoListContainer.innerHTML = '';
        const filteredTodos = this.todoList.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.todoListContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No tasks found. Add a new task to get started!</p>
                </div>
            `;
        } else {
            filteredTodos.forEach(todo => {
                this.todoListContainer.appendChild(this.createTodoElement(todo));
            });
        }

        this.updateStatistics();
    }

    // Add filter button event listeners
    bindEvents() {
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTodo();
        });

        // Add filter button listeners
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterChange(e.target.dataset.filter);
            });
        });
    }

    handleFilterChange(filter) {
        this.todoList.setFilter(filter);
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        this.render();
    }
}

// ========================================
// STEP 15: Add Local Storage
// ========================================

// Add to TodoList class
class TodoList {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.loadFromLocalStorage(); // Load saved todos
    }

    addTodo(title, description, priority) {
        const todo = new Todo(title, description, priority);
        this.todos.push(todo);
        this.saveToLocalStorage(); // Save after adding
        return todo;
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage(); // Save after removing
    }

    getStatistics() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            case 'pending':
                return this.todos.filter(todo => !todo.completed);
            default:
                return this.todos;
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            const todoData = JSON.parse(savedTodos);
            this.todos = todoData.map(data => {
                const todo = new Todo(data.title, data.description, data.priority);
                todo.id = data.id;
                todo.completed = data.completed;
                todo.createdAt = new Date(data.createdAt);
                return todo;
            });
        }
    }
}

// Update TodoUI to save when toggling completion
class TodoUI {
    // ... previous methods ...

    createTodoElement(todo) {
        const todoElement = document.createElement('div');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''} ${todo.priority}-priority`;
        
        todoElement.innerHTML = `
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-actions">
                    <button class="action-btn btn-complete" title="${todo.completed ? 'Mark as pending' : 'Mark as complete'}">
                        <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                    <button class="action-btn btn-delete" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${todo.description ? `<p class="todo-description">${todo.description}</p>` : ''}
            <div class="todo-meta">
                <span class="priority-badge priority-${todo.priority}">${todo.priority.toUpperCase()}</span>
            </div>
        `;

        // Add event listeners
        const completeBtn = todoElement.querySelector('.btn-complete');
        const deleteBtn = todoElement.querySelector('.btn-delete');

        completeBtn.addEventListener('click', () => {
            todo.toggleComplete();
            this.todoList.saveToLocalStorage(); // Save after toggle
            this.render();
        });

        deleteBtn.addEventListener('click', () => {
            this.todoList.removeTodo(todo.id);
            this.render();
        });

        return todoElement;
    }
}

// ========================================
// APPLICATION COMPLETE!
// ========================================

/*
CONGRATULATIONS! You've built a complete Todo List Manager step by step!

What you've learned:
1. How to create classes with constructors
2. How to add properties and methods
3. How to create objects from classes
4. How to handle user interactions
5. How to update the DOM
6. How to save data to localStorage
7. How to filter and display data
8. How to manage application state

The application now has all core features:
✅ Add todos
✅ Delete todos  
✅ Mark todos as complete
✅ Filter todos (All/Pending/Completed)
✅ Save data to browser storage
✅ Real-time statistics
✅ Beautiful UI

You can now use this as a foundation to add more features like:
- Edit functionality
- Due dates
- Categories
- Search
- Sorting
- Export/Import
*/ 