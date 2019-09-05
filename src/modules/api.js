export const API_HOST = 'https://backend.pi-top.com/todo-test/v1'

export const getTodos = () => fetch(`${API_HOST}/todos`)

export const getTodoById = id => fetch(`${API_HOST}/todos/${id}`)

export const createTodo = ({ title, description, priority, tags }) =>
  fetch(`${API_HOST}/todos`, {
    method: 'POST',
    body: JSON.stringify({ title, description, priority, tags }),
    headers: {
      'content-type': 'application/json'
    }
  })

export const updateTodo = (id, isDone) =>
  fetch(`${API_HOST}/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ isDone }),
    headers: {
      'content-type': 'application/json'
    }
  })

export const resetTodos = () =>
  fetch(`${API_HOST}/reset`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'content-type': 'application/json'
    }
  })

export default {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  resetTodos
}
