import React from 'react'
import style from './Layout.css'
import TodoCreator from '../TodoCreator'
import TodosList from '../TodosList'

export default () => (
  <React.Fragment>
    <header className={style.header}>
      <h1>Pi-Top Todo</h1>
    </header>

    <main className={style.main}>
      <TodoCreator />

      <TodosList />
    </main>
  </React.Fragment>
)
