import './style.css'

const ListElem = (props) => {
    const {title, id} = props

    const dataHandler = (e) => {
        props.clickElem(e.target.textContent)
    }
    return(
        <div className='listElem' id={id} onClick={dataHandler}>
            <p>{title}</p>
        </div>
    )
}

export default ListElem;