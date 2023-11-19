import React from "react"

const Filt = ({handleInput}) => {

//Handle input from input field and filter countries by name.
return (
    <>
<form>
<input type='text' onChange={handleInput}/>
</form>
</>
)
}

export default Filt;