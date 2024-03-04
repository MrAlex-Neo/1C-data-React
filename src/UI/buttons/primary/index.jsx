

import './style.css'

const PrimaryBtn = (props) => {
    
    const {type, text, name} = props
  
    return(
        <div className='primaryBtn'>
            <button type={type} name={name} >{text}</button>
        </div>
    )
}

export default PrimaryBtn;