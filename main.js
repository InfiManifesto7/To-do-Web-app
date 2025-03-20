window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');
	const username = localStorage.getItem('username') || '';
	nameInput.value = username;
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}
		todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(todos));
		e.target.reset();
		DisplayTodos()
	})
	DisplayTodos()
	const themeToggle = document.querySelector('#theme-toggle');
	const currentTheme = localStorage.getItem('theme') || 'light';
	document.body.classList.toggle('dark-theme', currentTheme === 'dark');
	updateThemeToggleIcon(currentTheme);
	themeToggle.addEventListener('click', () => {
		const isDark = document.body.classList.toggle('dark-theme');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		updateThemeToggleIcon(isDark ? 'dark' : 'light');
	});
})

function DisplayTodos() {
	const businessTodoList = document.querySelector('#business-todo-list');
	const personalTodoList = document.querySelector('#personal-todo-list');

	businessTodoList.innerHTML = "";
	personalTodoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		if (todo.done) {
			todoItem.classList.add('done');
		}
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			DisplayTodos()
		})
		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
			})
		})
		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

		if (todo.category === 'business') {
			businessTodoList.appendChild(todoItem);
		} else if (todo.category === 'personal') {
			personalTodoList.appendChild(todoItem);
		}
	})
}

function updateThemeToggleIcon(theme) {
	const themeToggle = document.querySelector('#theme-toggle');
	themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
}










