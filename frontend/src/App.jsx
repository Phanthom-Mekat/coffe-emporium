
import { useLoaderData } from 'react-router-dom'
import './App.css'
import CoffeCard from './components/CoffeCard'
import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {

  const loadedCoffees = useLoaderData()
  const [coffees,setCoffees] = useState(loadedCoffees)

  return (
    <>
      <Navbar/>
      <h1 className='text-3xl text-purple-300 mb-10'>Gorom Gorom coffees {coffees.length}</h1>
      
      <div className='grid grid-cols-2 gap-4'>
        {
          coffees.map(coffee=><CoffeCard key={coffee._id} coffee={coffee}
          coffees={coffees} 
          setCoffees={setCoffees}
          ></CoffeCard>)
        }
      </div>
    </>
  )
}

export default App
