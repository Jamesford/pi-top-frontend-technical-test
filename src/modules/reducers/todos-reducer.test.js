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

describe('Todos Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle LOADING', () => {
    expect(reducer(undefined, { type: types.LOADING, payload: true })).toEqual({
      ...initialState,
      loading: true
    })

    expect(
      reducer(
        { ...initialState, loading: true },
        { type: types.LOADING, payload: false }
      )
    ).toEqual({
      ...initialState,
      loading: false
    })
  })

  it('should hanle ERROR', () => {
    expect(
      reducer(undefined, {
        type: types.ERROR,
        payload: { code: 404, msg: 'File not found' }
      })
    ).toEqual({
      ...initialState,
      error: { code: 404, msg: 'File not found' }
    })
  })

  it('should handle ERROR_CLEAR', () => {
    expect(
      reducer(
        { ...initialState, error: { code: 404, msg: 'File not found' } },
        { type: types.ERROR_CLEAR }
      )
    ).toEqual({
      ...initialState,
      error: false
    })
  })

  it('should handle TODOS', () => {
    expect(
      reducer(undefined, {
        type: types.TODOS,
        payload: [dummyTodo]
      })
    ).toEqual({
      ...initialState,
      list: [dummyTodo]
    })
  })

  it('should handle DETAIL', () => {
    expect(
      reducer(
        { list: [{ id: 1, touched: false }, { id: 2, touched: false }] },
        {
          type: types.DETAIL,
          payload: { id: 2, touched: true }
        }
      )
    ).toEqual({
      list: [{ id: 1, touched: false }, { id: 2, touched: true }]
    })
  })

  it('should handle CREATE', () => {
    expect(
      reducer(
        { list: [1, 2, 3] },
        {
          type: types.CREATE,
          payload: 4
        }
      )
    ).toEqual({
      list: [1, 2, 3, 4]
    })
  })

  it('should handle RESET', () => {
    expect(reducer({}, { type: types.RESET })).toEqual(initialState)
  })
})
