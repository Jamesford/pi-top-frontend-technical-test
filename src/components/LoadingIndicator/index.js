// Adapted from: https://github.com/Jamesford/zonetime/blob/master/components/Loader.js

import React, { Component } from 'react'
import style from './LoadingIndicator.css'

export default class LoadingIndicator extends Component {
  getAnimationStyle(i) {
    const animation = `${style.ScaleLoader} 1s ${i *
      0.1}s infinite cubic-bezier(.2,.68,.18,1.08)`
    const animationFillMode = `both`
    const prefixes = ['Webkit', 'Moz', 'Ms', 'O']

    let inline_styles = {
      display: 'inline-block',
      backgroundColor: this.props.color,
      height: this.props.height,
      width: this.props.width,
      margin: this.props.margin,
      borderRadius: this.props.radius,
      verticalAlign: this.props.verticalAlign,
      animation,
      animationFillMode
    }

    prefixes.forEach(p => {
      inline_styles[`${p}Animation`] = animation
      inline_styles[`${p}AnimationFillMode`] = animationFillMode
    })

    return inline_styles
  }

  render() {
    const classNames = this.props.className
      ? `${style.loaderWrapper} ${this.props.className}`
      : `${style.loaderWrapper}`

    return (
      <div id={this.props.id} className={classNames}>
        <div style={this.getAnimationStyle(0)}></div>
        <div style={this.getAnimationStyle(1)}></div>
        <div style={this.getAnimationStyle(2)}></div>
        <div style={this.getAnimationStyle(3)}></div>
        <div style={this.getAnimationStyle(4)}></div>
      </div>
    )
  }
}

LoadingIndicator.defaultProps = {
  loading: true,
  color: '#000',
  height: '35px',
  width: '4px',
  margin: '2px',
  radius: '2px'
}
