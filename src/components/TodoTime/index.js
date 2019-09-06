import React, { Component } from 'react'
import moment from 'moment'

export default ({ time, ...props }) => (
  <div className="ml-2 text-base text-gray-500 leading-normal" {...props}>
    {moment(time).fromNow()}
  </div>
)
