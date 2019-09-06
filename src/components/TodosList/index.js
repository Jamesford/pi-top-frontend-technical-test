import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodos, resetTodos } from '../../modules/reducers/todos'
import LoadingIndicator from '../LoadingIndicator'
import TodosListItem from '../TodosListItem'

export class TodosList extends Component {
  componentDidMount() {
    const { actions } = this.props
    actions.getTodos()
  }

  render() {
    const { loading, error, todos } = this.props

    return (
      <section className="flex-col mx-auto max-w-sm w-full">
        <div className="mb-2 flex justify-between">
          <div className="flex">
            <span className="bg-white border-gray-400 border text-gray-800 font-bold py-2 px-4 rounded-l cursor-default">
              Priority
            </span>
            <button className="bg-white border-gray-400 border-t border-b hover:bg-gray-100 text-gray-800 font-bold py-2 px-4">
              ⬆️
            </button>
            <button className="bg-white border-gray-400 border hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-r">
              ⬇️
            </button>
          </div>

          <div>
            <button className="bg-white border-gray-400 border hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded">
              Filter: All
            </button>
          </div>
        </div>

        {loading && todos.length === 0 && <LoadingIndicator />}

        <div className="bg-white flex-col shadow-lg rounded max-w-sm w-full">
          {todos.map(
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
