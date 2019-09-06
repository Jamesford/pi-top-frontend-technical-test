import React from 'react'

const Tag = ({ tag }) => (
  <span className="text-sm font-semibold text-gray-500 mr-2">#{tag}</span>
)

export default ({ tags }) => (
  <div className="flex">
    {tags.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </div>
)
