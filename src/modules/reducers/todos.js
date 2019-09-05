import createReducer from '../utils/createReducer'
import api from '../api'

/*
 * TYPES
 */

const TODOS_LOADING = 'TODOS_LOADING'
const TODOS_ERROR = 'TODOS_ERROR'
const TODOS_RECEIVED = 'TODOS_RECEIVED'
export const types = { TODOS_LOADING, TODOS_ERROR, TODOS_RECEIVED }

/*
 * ACTIONS
 */

export const getTodos = () => async (dispatch, getState) => {
  dispatch({ type: TODOS_LOADING })
  let res = await api.getTodos()
  if (!res.ok) {
    dispatch({
      type: TODOS_ERROR,
      payload: { code: res.status, msg: res.statusText }
    })
  } else {
    res = await res.json()
    dispatch({
      type: TODOS_RECEIVED,
      payload: res
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
  [TODOS_LOADING]: (state, action) => ({
    ...state,
    loading: true,
    error: false
  }),
  [TODOS_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: {
      code: action.payload.code,
      msg: action.payload.msg
    }
  }),
  [TODOS_RECEIVED]: (state, action) => ({
    ...state,
    loading: false,
    error: false,
    list: action.payload
  })
}

export default createReducer(initialState, actionHandlers)
