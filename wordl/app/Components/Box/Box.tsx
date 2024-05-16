import "./Box.css"
const Box = (props:any) =>{

    return (
        <>
            <div className = "box" style={{backgroundColor:props.color}} >
            <p className = "text">{props.letter}</p>
            </div>
        </>
    );
}

export default Box;