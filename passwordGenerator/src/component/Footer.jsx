import React from 'react'

function Footer() {
    let now = new Date().getFullYear();
  return (
    <div className="mt-2">
    <h5 className=" m-0  text-center bg-dark text-white py-3"><b>&copy; {now} .All Rights are Reserved</b></h5>
    </div>
  )
}

export default Footer
