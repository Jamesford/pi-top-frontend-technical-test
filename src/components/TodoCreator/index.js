import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './TodoCreator.css'
import Selectable from '../Selectable'
import TodoPriority from '../TodoPriority'

export class TodoCreator extends Component {
  state = {}

  render() {
    const {} = this.props

    return (
      <div className="bg-white flex-col mx-auto max-w-sm w-full shadow-lg mb-2 p-2">
        <header className={styles.header}>New Todo</header>

        <input className={styles.input} type="text" placeholder="Title" />

        <input className={styles.input} type="text" placeholder="Description" />

        <input
          className={styles.input}
          type="text"
          placeholder="Comma, separated, tags"
        />

        <div className={styles.priority}>
          <Selectable value={1} onChange={() => {}}>
            <TodoPriority priority={1} value={1} />
            <TodoPriority priority={2} value={2} />
            <TodoPriority priority={3} value={3} />
            <TodoPriority priority={4} value={4} />
            <TodoPriority priority={5} value={5} />
            <TodoPriority priority={6} value={6} />
            <TodoPriority priority={7} value={7} />
            <TodoPriority priority={8} value={8} />
            <TodoPriority priority={9} value={9} />
            <TodoPriority priority={10} value={10} />
          </Selectable>
        </div>

        <button className={styles.button}>Create</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  actions: {}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCreator)
