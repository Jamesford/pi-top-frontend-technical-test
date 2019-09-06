import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { API_HOST } from '../api'
import {
  types,
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  resetTodos
} from './todos'

const mockStore = configureMockStore([thunk])

const dummyTodo = {
  id: 'zXizI_6T4',
  createdAt: '2018-08-07T11:25:52.087Z',
  title: 'get milk',
  priority: '3',
  isDone: false
}

describe('Todos Async Actions', () => {
  afterEach(() => fetchMock.restore())

  it('should create actions to fetch todos', async () => {
    fetchMock.getOnce(`${API_HOST}/todos`, {
      body: [dummyTodo]
    })

    const expectedActions = [
      { type: types.ERROR_CLEAR },
      { type: types.LOADING, payload: true },
      { type: types.TODOS, payload: [dummyTodo] },
      { type: types.LOADING, payload: false }
    ]

    const store = mockStore()
    await store.dispatch(getTodos())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create actions to fetch a specific todo', async () => {
    const id = 'AAA'
    fetchMock.getOnce(`${API_HOST}/todos/${id}`, {
      body: dummyTodo
    })

    const expectedActions = [
      { type: types.ERROR_CLEAR },
      { type: types.LOADING, payload: true },
      { type: types.DETAIL, payload: dummyTodo },
      { type: types.LOADING, payload: false }
    ]

    const store = mockStore()
    await store.dispatch(getTodoById(id))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create actions to create a new todo', async () => {
    fetchMock.postOnce(`${API_HOST}/todos`, {
      body: dummyTodo
    })

    const expectedActions = [
      { type: types.ERROR_CLEAR },
      { type: types.LOADING, payload: true },
      { type: types.CREATE, payload: dummyTodo },
      { type: types.LOADING, payload: false }
    ]

    const store = mockStore()
    await store.dispatch(createTodo(dummyTodo))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create actions to update a todo', async () => {
    const id = 'AAA'
    fetchMock.putOnce(`${API_HOST}/todos/${id}`, {
      body: dummyTodo
    })

    const expectedActions = [
      { type: types.ERROR_CLEAR },
      { type: types.LOADING, payload: true },
      { type: types.DETAIL, payload: dummyTodo },
      { type: types.LOADING, payload: false }
    ]

    const store = mockStore()
    await store.dispatch(updateTodo(id, true))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create actions to reset todos', async () => {
    fetchMock.postOnce(`${API_HOST}/reset`, {
      body: true
    })
    fetchMock.getOnce(`${API_HOST}/todos`, {
      body: [dummyTodo]
    })

    const expectedActions = [
      { type: types.ERROR_CLEAR },
      { type: types.LOADING, payload: true },
      { type: types.RESET },
      { type: types.ERROR_CLEAR },
      { type: types.LOADING, payload: true },
      { type: types.TODOS, payload: [dummyTodo] },
      { type: types.LOADING, payload: false }
    ]

    const store = mockStore()
    await store.dispatch(resetTodos())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
