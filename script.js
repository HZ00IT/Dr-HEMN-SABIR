class Task {
    constructor(title, description, priority) {
        this.id = crypto.randomUUID();
        this.is_selected = false;
        this.at = new Date();
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    toggleComplete() {
        this.is_selected = !this.is_selected;
    }
}

class Task_List {
    constructor() {
        this.tasks = [];
        this.currentFilter = "all";
        this.loadFromStorage();
    }

    addTask(title, description, priority) {
        const task = new Task(title, description, priority);
        this.tasks.push(task);
        this.saveToStorage();
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToStorage();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.toggleComplete();
            this.saveToStorage();
        }
    }

    updateTask(id, updates) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, updates);
            this.saveToStorage();
            return task;
        }
        return null;
    }

    saveToStorage() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('currentFilter', this.currentFilter);
        } catch (e) {
            console.error('Failed to save:', e);
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('tasks');
            const filterStored = localStorage.getItem('currentFilter');

            if (stored) {
                this.tasks = JSON.parse(stored, (key, value) => {
                    if (key === 'at') return new Date(value);
                    return value;
                });
            }

            if (filterStored) {
                this.currentFilter = filterStored;
            }
        } catch (e) {
            console.error('Failed to load:', e);
            this.tasks = [];
        }
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(task => !task.is_selected);
            case 'completed':
                return this.tasks.filter(task => task.is_selected);
            case 'all':
            default:
                return this.tasks;
        }
    }
}

class Task_UI {
    constructor(all_tasks) {
        this.task_list = all_tasks;
        this.editingTaskId = null;
        this.initElements();
        this.bindEvents();
        this.renderTasks();
        this.setFilterButtonActive(this.task_list.currentFilter);
    }

    initElements() {
        this.taskForm = document.querySelector('#todoForm');
        this.taskTitle = document.querySelector('#todoTitle');
        this.taskDescription = document.querySelector('#todoDescription');
        this.taskPriority = document.querySelector('#todoPriority');
        this.taskListContainer = document.querySelector('#todoList');
        this.formSubmitBtn = this.taskForm?.querySelector('button[type="submit"]');

        this.totalTasks = document.querySelector('#totalTasks');
        this.pendingTasks = document.querySelector('#pendingTasks');
        this.completedTasks = document.querySelector('#completedTasks');

        this.initFilterButtons();
    }

    initFilterButtons() {
        this.filterButtons = document.querySelectorAll('.filter-btn');

        if (this.filterButtons.length === 0) {
            let filterContainer = document.querySelector('#filterContainer');

            if (!filterContainer) {
                filterContainer = document.createElement('div');
                filterContainer.id = 'filterContainer';
                filterContainer.className = 'filter-container';
                this.taskListContainer.parentNode.insertBefore(filterContainer, this.taskListContainer);
            }

            filterContainer.innerHTML = `
                <button class="filter-btn" data-filter="all">All Tasks</button>
                <button class="filter-btn" data-filter="pending">Pending</button>
                <button class="filter-btn" data-filter="completed">Completed</button>
            `;

            this.filterButtons = document.querySelectorAll('.filter-btn');
        }
    }

    bindEvents() {
        this.taskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleFormSubmit();
        });

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });
    }

    handleFormSubmit() {
        const title = this.taskTitle.value.trim()
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
        const description = this.taskDescription.value.trim();
        const priority = this.taskPriority.value;

        if (!title) return;

        if (this.editingTaskId) {
            this.task_list.updateTask(this.editingTaskId, {
                title: title,
                description: description,
                priority: priority
            });
            this.exitEditMode();
        } else {
            this.task_list.addTask(title, description, priority);
        }

        this.clearForm();
        this.renderTasks();
    }

    enterEditMode(task) {
        this.editingTaskId = task.id;
        this.taskTitle.value = task.title;
        this.taskDescription.value = task.description;
        this.taskPriority.value = task.priority;

        if (this.formSubmitBtn) {
            this.formSubmitBtn.textContent = 'Update Task';
            this.formSubmitBtn.classList.add('editing');
        }

        if (!document.querySelector('#cancelEditBtn')) {
            const cancelBtn = document.createElement('button');
            cancelBtn.id = 'cancelEditBtn';
            cancelBtn.type = 'button';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.className = 'btn-cancel';
            cancelBtn.onclick = () => this.exitEditMode();
            this.formSubmitBtn?.parentNode?.insertBefore(cancelBtn, this.formSubmitBtn.nextSibling);
        }

        this.taskForm.scrollIntoView({ behavior: 'smooth' });
        this.taskTitle.focus();
    }

    exitEditMode() {
        this.editingTaskId = null;
        this.clearForm();

        if (this.formSubmitBtn) {
            this.formSubmitBtn.textContent = 'Add Task';
            this.formSubmitBtn.classList.remove('editing');
        }

        const cancelBtn = document.querySelector('#cancelEditBtn');
        if (cancelBtn) cancelBtn.remove();
    }

    setFilter(filter) {
        this.task_list.currentFilter = filter;
        this.task_list.saveToStorage();
        this.setFilterButtonActive(filter);
        this.renderTasks();
    }

    setFilterButtonActive(filter) {
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    clearForm() {
        this.taskTitle.value = '';
        this.taskDescription.value = '';
        this.taskPriority.value = 'medium';
    }

    renderTasks() {
        this.taskListContainer.innerHTML = '';
        this.updateStats();

        const tasksToShow = this.task_list.getFilteredTasks();

        if (tasksToShow.length === 0) {
            this.emptyState();
        } else {
            tasksToShow.forEach((task) => {
                this.createTaskElement(task);
            });
        }
    }

    updateStats() {
        const total = this.task_list.tasks.length;
        const completed = this.task_list.tasks.filter(t => t.is_selected).length;
        const pending = total - completed;

        if (this.totalTasks) this.totalTasks.textContent = total;
        if (this.pendingTasks) this.pendingTasks.textContent = pending;
        if (this.completedTasks) this.completedTasks.textContent = completed;

        if (this.pendingTasks?.parentElement) {
            this.pendingTasks.parentElement.style.cursor = 'pointer';
            this.pendingTasks.parentElement.onclick = () => this.setFilter('pending');
        }
        if (this.completedTasks?.parentElement) {
            this.completedTasks.parentElement.style.cursor = 'pointer';
            this.completedTasks.parentElement.onclick = () => this.setFilter('completed');
        }
        if (this.totalTasks?.parentElement) {
            this.totalTasks.parentElement.style.cursor = 'pointer';
            this.totalTasks.parentElement.onclick = () => this.setFilter('all');
        }
    }

    emptyState() {
        const filterText = this.task_list.currentFilter === 'all' ? '' :
            this.task_list.currentFilter === 'pending' ? 'pending ' : 'completed ';

        this.taskListContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No ${filterText}tasks found!</p>
            </div>
        `;
    }

    // ADD: Format date with time helper method
    formatDateTime(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `todo-item ${task.is_selected ? 'complete' : ''} ${task.priority}-priority`;
        taskElement.dataset.id = task.id;

        taskElement.innerHTML = `
            <div class="todo-header">
                <h3 class="todo-title" style="${task.is_selected ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                    ${task.title}
                </h3>
                <div class="todo-actions">
                    <button class="action-btn btn-complete">
                        ${task.is_selected ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>'}
                    </button>
                    <button class="action-btn btn-edit">
                        <i class="fas fa-edit"></i> 
                    </button>
                    <button class="action-btn btn-delete">
                        <i class="fas fa-trash"></i> 
                    </button>
                </div>
            </div>
            ${task.description ? `<p class="todo-description" style="${task.is_selected ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.description}</p>` : ''}
            <div class="todo-meta">
                <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                <span class="task-date"><i class="far fa-clock"></i> ${this.formatDateTime(task.at)}</span>
            </div>
        `;

        const completeBtn = taskElement.querySelector('.btn-complete');
        completeBtn.addEventListener('click', () => {
            this.task_list.toggleTask(task.id);
            this.renderTasks();
        });

        const editBtn = taskElement.querySelector('.btn-edit');
        editBtn.addEventListener('click', () => {
            this.enterEditMode(task);
        });

        const deleteBtn = taskElement.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                if (this.editingTaskId === task.id) {
                    this.exitEditMode();
                }
                this.task_list.deleteTask(task.id);
                this.renderTasks();
            }
        });

        this.taskListContainer.appendChild(taskElement);
    }
}

const tasklist = new Task_List();
const UI = new Task_UI(tasklist);