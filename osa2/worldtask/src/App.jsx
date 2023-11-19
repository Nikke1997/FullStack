import { useState } from 'react'
import worldService from './services/axio'
import { useEffect } from 'react'
import Filt from './components/Filt'
import List from './components/List'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredWorlds, setFilteredWorlds] = useState([])
  

  //Get all countries from API and set them to state.
  useEffect(() => {
worldService.get()
.then(worlds => {
  setCountries(worlds);
  setFilteredWorlds(worlds)
})}, [])


//Handle input from input field and filter countries by name.
const handleInput = (event) => {
const world = event.target.value.toLowerCase();
const filtered = countries.filter(p => p.name.common.toLowerCase().includes(world))
setFilteredWorlds(filtered)
}



  return (
    <>
  <Filt handleInput={handleInput}/>
<div>
  <List filteredWorlds={filteredWorlds} countries={countries} />
</div>
    </>
  )
}

export default App
