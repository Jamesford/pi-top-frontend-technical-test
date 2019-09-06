import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodos, resetTodos } from '../../modules/reducers/todos'
import LoadingIndicator from '../LoadingIndicator'
import TodosListItem from '../TodosListItem'

const filters = [
  { text: 'All', func: () => true },
  { text: 'Done', func: ({ isDone }) => isDone },
  { text: 'Doing', func: ({ isDone }) => !isDone }
]

const sorters = [
  { text: '⬇️', func: ({ priority: a }, { priority: b }) => b - a },
  { text: '⬆️', func: ({ priority: a }, { priority: b }) => a - b }
]

export class TodosList extends Component {
  state = {
    filter: 0,
    sort: 0
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getTodos()
  }

  toggleFilter = () => {
    this.setState(state => ({
      filter: state.filter > 1 ? 0 : state.filter + 1
    }))
  }

  toggleSort = () => {
    this.setState(state => ({ sort: state.sort ? 0 : 1 }))
  }

  render() {
    const { loading, error, todos } = this.props
    const { filter, sort } = this.state

    const visibleTodos = todos
      .filter(filters[filter].func)
      .sort(sorters[sort].func)

    return (
      <section className="flex-col mx-10 max-w-sm w-full">
        <div className="mb-2 flex justify-end">
          <div className="flex">
            <button
              className="bg-white border-gray-400 border border-r-0 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={this.toggleSort}
            >
              Priority: {sorters[sort].text}
            </button>

            <button
              className="bg-white border-gray-400 border hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-r"
              onClick={this.toggleFilter}
            >
              Filter: {filters[filter].text}
            </button>
          </div>
        </div>

        {loading && visibleTodos.length === 0 && (
          <LoadingIndicator
            className="my-10"
            color={'#4299e1'}
            height={50}
            width={5}
            margin={2}
            radius={3}
          />
        )}

        {!loading && visibleTodos.length === 0 && (
          <p className="text-gray-800 font-bold py-2 px-4 text-center my-10">
            No todos, make some more!
          </p>
        )}

        <div className="bg-white flex-col shadow-lg rounded max-w-sm w-full">
          {visibleTodos.map(
            ({ id, title, description, createdAt, priority, tags, isDone }) => (
              <TodosListItem
                key={id}
                id={id}
                title={title}
                description={description}
                createdAt={createdAt}
                priority={priority}
                tags={tags}
                isDone={isDone}
              />
            )
          )}
        </div>

        <div className="text-center mt-5">
          <button
            className="hover:bg-gray-300 text-gray-800 py-2 px-4 rounded underline text-sm"
            onClick={this.props.actions.resetTodos}
          >
            Reset Todos
          </button>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.todos.loading,
  error: state.todos.error,
  todos: state.todos.list
})

const mapDispatchToProps = dispatch => ({
  actions: {
    getTodos: bindActionCreators(getTodos, dispatch),
    resetTodos: bindActionCreators(resetTodos, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList)
