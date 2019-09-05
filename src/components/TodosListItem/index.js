import React, { Component } from 'react'
import TodoPriority from '../TodoPriority'
import TodoTime from '../TodoTime'
import Checkbox from '../Checkbox'

// Connect to be used when adding updateTodo functionality
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getTodos } from '../../modules/reducers/todos'

export default class TodosListItem extends Component {
  render() {
    const { title, createdAt, priority, isDone } = this.props

    return (
      <section className="flex justify-between items-center group p-4 border-b">
        <div>
          <header className="font-bold text-lg mb-1">{title}</header>

          <div className="flex">
            <TodoPriority priority={priority} />

            <TodoTime time={createdAt} />
          </div>
        </div>

        <Checkbox checked={isDone} onClick={v => console.log(v)} />
      </section>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   actions: {
//     updateTodos: bindActionCreators(updateTodos, dispatch)
//   }
// })

// export default connect(
//   null,
//   mapDispatchToProps
// )(TodosList)
