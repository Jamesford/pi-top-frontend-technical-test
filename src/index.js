import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './modules/store'
import DevTool from './modules/utils/DevTool'
import Layout from './components/Layout'
import './index.css'

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Layout />

      {process.env.NODE_ENV !== 'production' && <DevTool />}
    </Provider>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept(render)
}

render()
