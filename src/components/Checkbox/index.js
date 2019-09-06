import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Checkbox.css'

export default class Checkbox extends Component {
  onClick = () => {
    const { onClick, checked } = this.props
    onClick(!checked)
  }

  render() {
    const { checked, disabled, readOnly } = this.props

    return (
      <label className={`${style.checkbox} flex cursor-pointer`}>
        <div className="bg-white w-6 h-6 p-1 flex justify-center items-center border rounded">
          <input
            type="checkbox"
            className="hidden"
            checked={checked}
            disabled={disabled}
            onClick={this.onClick}
            readOnly={readOnly}
          />
          <svg
            className="hidden w-4 h-4 text-green-600 pointer-events-none"
            viewBox="0 0 172 172"
          >
            <g
              fill="none"
              strokeWidth="none"
              strokeMiterlimit="10"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: 'normal' }}
            >
              <path d="M0 172V0h172v172z" />
              <path
                d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                fill="currentColor"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </label>
    )
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  readOnly: false,
  onClick: () => {}
}
