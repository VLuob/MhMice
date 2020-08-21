import React from 'react'

import './index.less'

const List = ({
  listClick,
  list,
  listStyle
}) => {
  return (
    list && list.map((e, index) => (
      < div
        key={index}
        onClick={listClick.bind(this, e)}
        style={listStyle}
      >{e.name}</div >
    ))

  )
}


export default List