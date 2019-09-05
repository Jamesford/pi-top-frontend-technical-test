import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { API_HOST } from '../api'
import reducer, { initialState, types, getTodos } from './todos'

const mockStore = configureMockStore([thunk])

const dummyTodo = {
  id: 'zXizI_6T4',
  createdAt: '2018-08-07T11:25:52.087Z',
  title: 'get milk',
  priority: '3',
  isDone: false
}

/*
 * TODOS ACTIONS
 */

describe('Todos Actions', () => {
  afterEach(() => fetchMock.restore())

  it('should create an action to fetch todos', async () => {
    fetchMock.getOnce(`${API_HOST}/todos`, {
      body: [dummyTodo]
    })

    const expectedActions = [
      { type: types.TODOS_LOADING },
      { type: types.TODOS_RECEIVED, payload: [dummyTodo] }
    ]

    const store = mockStore()

    await store.dispatch(getTodos())

    expect(store.getActions()).toEqual(expectedActions)
  })
})

/*
 * TODOS REDUCER
 */

describe('Todos Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle TODOS_LOADING', () => {
    expect(reducer(undefined, { type: types.TODOS_LOADING })).toEqual({
      loading: true,
      error: false,
      list: []
    })
  })

  it('should handle TODOS_ERROR', () => {
    const payload = { code: 404, msg: 'File not found' }

    expect(
      reducer(
        {
          loading: true,
          error: false,
          list: []
        },
        {
          type: types.TODOS_ERROR,
          payload
        }
      )
    ).toEqual({
      loading: false,
      error: payload,
      list: []
    })
  })

  it('should hanle TODOS_RECEIVED', () => {
    const payload = [dummyTodo, dummyTodo]

    expect(
      reducer(
        {
          loading: true,
          error: true,
          list: []
        },
        {
          type: types.TODOS_RECEIVED,
          payload
        }
      )
    ).toEqual({
      loading: false,
      error: false,
      list: payload
    })
  })
})
