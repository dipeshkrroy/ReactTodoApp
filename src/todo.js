import Card from  "./card"
function Todos(props){
    return (
        <>
        {
            props.todos.map( (todo,index) => {return <Card key={index} todo={todo} {...props} />} )
        }       
        </>
    );
}

export default Todos;