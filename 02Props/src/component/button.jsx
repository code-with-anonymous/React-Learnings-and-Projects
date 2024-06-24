import React from 'react'

function Button(props) {
  console.log('props', props.type)
  console.log('props', props.text)
  console.log('props', props.obj)
  console.log('propsarr=', props.arr)
  return (
  
      <>
      <button type="button" className={`btn btn-${props.type} m-2 mt-3`}>{props.text}</button>


     </>
    
  )
}

export default Button
