import { batch } from 'react-redux'
import createReducer from '../utils/createReducer'
import api from '../api'
import { async } from 'q'

/*
 * TYPES
 */

const LOADING = 'LOADING'
const ERROR = 'ERROR'
const ERROR_CLEAR = 'ERROR_CLEAR'
const TODOS = 'TODOS'
const DETAIL = 'DETAIL'
const RESET = 'RESET'
export const types = { LOADING, ERROR, ERROR_CLEAR, TODOS, DETAIL, RESET }

/*
 * ACTIONS
 */

const loading = status => ({ type: LOADING, payload: status })

const error = (code, msg) => ({ type: ERROR, payload: { code, msg } })

const errorClear = () => ({ type: ERROR_CLEAR })

const todos = todos => ({ type: TODOS, payload: todos })

const detail = todo => ({ type: DETAIL, payload: todo })

const reset = () => ({ type: RESET })

export const getTodos = () => async dispatch => {
  batch(() => {
    dispatch(errorClear())
    dispatch(loading(true))
  })

  let res = await api.getTodos()
  if (!res.ok) {
    batch(() => {
      dispatch(error(res.status, res.statusText))
      dispatch(loading(false))
    })
  } else {
    res = await res.json()
    batch(() => {
      dispatch(todos(res))
      dispatch(loading(false))
    })
  }
}

export const getTodoById = id => async (dispatch, getState) => {
  batch(() => {
    dispatch(errorClear())
    dispatch(loading(true))
  })

  let res = await api.getTodoById(id)
  if (!res.ok) {
    batch(() => {
      dispatch(error(res.status, res.statusText))
      dispatch(loading(false))
    })
  } else {
    res = await res.json()
    batch(() => {
      dispatch(detail(res))
      dispatch(loading(false))
    })
  }
}

/*
 * INITIAL STATE
 */

export const initialState = {
  loading: false,
  error: false,
  list: []
}

/*
 * REDUCER
 */

const actionHandlers = {
  [LOADING]: (state, action) => ({
    ...state,
    loading: !!action.payload
  }),
  [ERROR]: (state, action) => ({
    ...state,
    error: {
      code: action.payload.code,
      msg: action.payload.msg
    }
  }),
  [ERROR_CLEAR]: state => ({
    ...state,
    error: false
  }),
  [TODOS]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [DETAIL]: (state, action) => ({
    ...state,
    list: state.list.map(todo =>
      todo.id === action.payload.id ? action.payload : todo
    )
  }),
  [RESET]: () => initialState
}

export default createReducer(initialState, actionHandlers)
