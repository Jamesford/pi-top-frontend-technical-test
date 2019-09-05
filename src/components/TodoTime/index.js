import React, { Component } from 'react'
import moment from 'moment'

export default ({ time }) => (
  <div className="ml-2 text-base text-gray-600 leading-normal">
    {moment(time).fromNow()}
  </div>
)
