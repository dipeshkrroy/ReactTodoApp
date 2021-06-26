import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form,Field } from 'formik';

function ModalComponent(props){
const initialValues ={title:props.todo.title,completed:`${props.todo.completed}`}
    return (
            <>
            <Modal animation={false} show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validate={values => {
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        console.log(values)
                        props.addTodo({"title":values.title,"completed":values.completed,"id":props.todo.id});
                        setSubmitting(false);
                        props.handleClose();
                        }}
                        enableReinitialize="true"
                    >
                        {(isSubmitting) => (
                        <Form>
                            <div className="form-group">
                            <Field
                                type="text"
                                name="title"
                                placeholder="Title"                      
                            />
                            </div>
                            <div className="form-group">
                            <label className="my-1" htmlFor="true">Completed?</label><br/>
                            <Field
                                type="radio"
                                name="completed"
                                value="true"
                                id="true"
                            />
                            <label htmlFor="true" className="mx-1">True</label>
                            <Field
                                type="radio"
                                name="completed"
                                value="false"
                                id="false"
                            />
                            <label htmlFor="false" className="mx-1">False</label>
                            </div>
                            <Button className="m-1"  variant="success" type="submit">Save</Button>
                            <Button variant="outline-secondary" onClick={props.handleClose}>Close</Button>
                        </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </>        
        )
}

export default ModalComponent;