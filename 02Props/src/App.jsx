import Button from './component/button'
import Card from './component/card'
import Header from './component/Header'
import './App.css'
import Footer from './component/Footer'

function App() {

  let myObj = {
    name: "ali",
    age: 18
  }
  let nums = [2, 4, 6]
  return (
    <>
      <Header />
      <div className="centers">

      <Button type="danger" text="search me" obj={myObj} arr={nums} />
      <Button type="info" text="learn more" />
      <Button type="primary" text="search me" />
      <Button type="warning" text="click me" />
      </div>

      <h2 className='  mt-1 text-center'>Learning props with manipulation in the cards</h2>
      <div className=' centers d-flex align-items-center flex-direction column'>
        <Card text="hello Some quick example text to build on the card title and make up the bulk of the card's content." title="Cloths" btnText="Read more" />
        <Card text="hello Some quick  build on the card title and make up the bulk of the card's content." title="Watches" btnText="Click here" />
      </div>

      <Footer />
      
    </>
  )
}

export default App

// note: we can return object and array but with in the {}
