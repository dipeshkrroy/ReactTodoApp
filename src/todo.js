import Card from  "./card"
function Todos(props){
    console.log(props);
    return (
        <>
        {
            props.todos.map( (todo,index) => {return <Card key={index} todo={todo} {...props} />} )
        }       
        </>
    );
}

export default Todos;