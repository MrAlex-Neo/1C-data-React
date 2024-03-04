import './style.css'

const SecondaryBtn = (props) => {
    const {type, text, name} = props
    return(
        <div className='secondaryBtn'>
            <button type={type} name={name}>{text}</button>
        </div>
    )
}

export default SecondaryBtn;