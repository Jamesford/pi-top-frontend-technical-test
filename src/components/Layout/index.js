import React from 'react'
import style from './Layout.css'
import TodoCreator from '../TodoCreator'
import TodosList from '../TodosList'

export default () => (
  <React.Fragment>
    <header>
      <h1 className={style.header}>Pi-Top Todo</h1>
    </header>

    <main>
      <TodoCreator />
      <TodosList />
    </main>
  </React.Fragment>
)
