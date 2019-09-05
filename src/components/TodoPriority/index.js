import React from 'react'

const getColours = priority => {
  if (priority < 4) {
    return 'bg-green-400 text-white'
  } else if (priority < 8) {
    return 'bg-yellow-400 text-gray-800'
  } else {
    return 'bg-red-400 text-white'
  }
}

export default ({ priority }) => {
  const colourClass = getColours(parseInt(priority, 10))
  return (
    <div className={`${colourClass} rounded px-2 font-bold`}>{priority}</div>
  )
}
