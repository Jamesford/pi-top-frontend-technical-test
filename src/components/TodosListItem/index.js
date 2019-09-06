import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodoById, updateTodo } from '../../modules/reducers/todos'
import TodoPriority from '../TodoPriority'
import TodoTime from '../TodoTime'
import TodoTags from '../TodoTags'
import Checkbox from '../Checkbox'

export class TodosListItem extends Component {
  state = {
    showDetails: false
  }

  toggleDetails = () => {
    const { actions, id, description, tags } = this.props
    if (!description || !tags) actions.getTodoById(id) // Fetch details if missing
    this.setState(({ showDetails }) => ({ showDetails: !showDetails }))
  }

  updateStatus = status => {
    const { actions, id, isDone } = this.props
    actions.updateTodo(id, !isDone)
  }

  render() {
    const { title, description, createdAt, priority, tags, isDone } = this.props
    const { showDetails } = this.state

    const showDescription = !!description && showDetails
    const showTags = !!tags && showDetails

    return (
      <section
        className="flex justify-between items-stretch group border-b cursor-pointer"
        onClick={this.toggleDetails}
      >
        <div className="flex-grow p-4">
          <header className="font-bold text-lg mb-1">{title}</header>

          {showDescription && (
            <p className="text-base text-gray-700 mb-2">{description}</p>
          )}

          <div className="flex mb-1">
            <TodoPriority priority={priority} />

            <TodoTime time={createdAt} />
          </div>

          {showTags && <TodoTags tags={tags} />}
        </div>

        <div className="p-4 flex items-center" onClick={this.updateStatus}>
          <Checkbox checked={isDone} readOnly />
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    getTodoById: bindActionCreators(getTodoById, dispatch),
    updateTodo: bindActionCreators(updateTodo, dispatch)
  }
})

export default connect(
  null,
  mapDispatchToProps
)(TodosListItem)
