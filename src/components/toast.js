import {Toast} from "react-bootstrap";

function ToastComponent(props){

    return (
        <Toast
        animation={false}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background:props.bg,
            color:props.color,
          }}
          onClose={props.setToast} 
          show={props.toast} delay={3000} 
          autohide>
          <Toast.Body>{props.toastMessage}</Toast.Body>
        </Toast>
        );
}

export default ToastComponent;