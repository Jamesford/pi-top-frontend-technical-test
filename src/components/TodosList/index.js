import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodos } from '../../modules/reducers/todos'

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
      <section className="flex-col">
        <div className="mx-auto max-w-sm w-full mb-2 flex justify-between">
          <div className="flex">
            <span className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l cursor-default">
              Priority
            </span>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
              ⬆️
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              ⬇️
            </button>
          </div>

          <div>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Filter: All
            </button>
          </div>
        </div>

        {loading && todos.length === 0 && <LoadingIndicator />}

        <div className="mx-auto flex-column shadow-2xl rounded max-w-sm w-full">
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
    getTodos: bindActionCreators(getTodos, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList)
