import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodoById } from '../../modules/reducers/todos'
import TodoPriority from '../TodoPriority'
import TodoTime from '../TodoTime'
import TodoTags from '../TodoTags'
import Checkbox from '../Checkbox'

export class TodosListItem extends Component {
  loadDetails = () => {
    this.props.actions.getTodoById(this.props.id)
  }

  render() {
    const { title, description, createdAt, priority, tags, isDone } = this.props

    return (
      <section
        className="flex justify-between items-center group p-4 border-b cursor-pointer"
        onClick={this.loadDetails}
      >
        <div>
          <header className="font-bold text-lg mb-1">{title}</header>

          {!!description && (
            <p className="text-base text-gray-700 mb-2">{description}</p>
          )}

          <div className="flex mb-1">
            <TodoPriority priority={priority} />

            <TodoTime time={createdAt} />
          </div>

          {!!tags && <TodoTags tags={tags} />}
        </div>

        <Checkbox checked={isDone} onClick={v => console.log(v)} />
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    getTodoById: bindActionCreators(getTodoById, dispatch)
  }
})

export default connect(
  null,
  mapDispatchToProps
)(TodosListItem)
