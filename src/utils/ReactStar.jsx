import React from 'react'
import ReactStars from 'react-stars'

function ReactStar({value,size}) {
  return (
    <ReactStars
        count={5}
        edit={false}
        size={size || 30}
        value={value}
        color1={'gray'}
        color2={'#eec4e9'} 
        half={true}
    />
  )
}

export default ReactStar
