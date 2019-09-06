import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createTodo } from '../../modules/reducers/todos'
import styles from './TodoCreator.css'
import Selectable from '../Selectable'
import TodoPriority from '../TodoPriority'

const defaultState = {
  title: '',
  description: '',
  tags: '',
  priority: 1
}

export class TodoCreator extends Component {
  state = { ...defaultState }

  onText = evt => {
    const { name, value } = evt.target
    this.setState(() => ({ [name]: value }))
  }

  onPriority = value => this.setState(() => ({ priority: value }))

  onSubmit = () => {
    const { title, description, tags, priority } = this.state
    const { actions } = this.props

    const tagsArray = tags.split(',').map(s => s.trim()) // Transform tag string to array

    actions.createTodo({ title, description, priority, tags: tagsArray })
    this.setState(() => ({ ...defaultState }))
  }

  render() {
    const { title, description, tags, priority } = this.state

    return (
      <div className="bg-white flex-col mx-auto max-w-sm w-full shadow-lg mb-2 p-2">
        <header className={styles.header}>New Todo</header>

        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.onText}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={this.onText}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Comma, separated, tags"
          name="tags"
          value={tags}
          onChange={this.onText}
        />

        <div className={styles.priority}>
          <Selectable value={priority} onChange={this.onPriority}>
            {[...new Array(5)].map((_, i) => {
              const n = i + 1
              return <TodoPriority key={n} priority={n} value={n} />
            })}
          </Selectable>
        </div>

        <button className={styles.button} onClick={this.onSubmit}>
          Create
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    createTodo: bindActionCreators(createTodo, dispatch)
  }
})

export default connect(
  null,
  mapDispatchToProps
)(TodoCreator)
