import React from 'react'
import { connect } from 'react-redux'
import style from './ErrorMessage.css'

export const ErrorMessage = ({ code, msg }) =>
  !!code &&
  !!msg && (
    <div className={style.container}>
      <div className={style.error}>{msg}</div>
    </div>
  )

const mapStateToProps = ({ todos }) => ({
  code: !!todos.error ? todos.error.code : null,
  msg: !!todos.error ? todos.error.msg : null
})

export default connect(mapStateToProps)(ErrorMessage)
