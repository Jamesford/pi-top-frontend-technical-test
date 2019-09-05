import React, { Component } from 'react'

export default class Selectable extends Component {
  onChange = value => this.props.onChange(value)

  render() {
    const selected = this.props.value

    return React.Children.map(this.props.children, child => {
      const value = child.props.value
      const opacity = selected === child.props.value ? 1 : 0.25
      const onClick = () => this.onChange(value)

      return React.cloneElement(child, {
        onClick,
        style: { opacity, cursor: 'pointer' }
      })
    })
  }
}
