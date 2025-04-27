

const ChatContainer = (props) => {
    return (  
        <div className="card w-100 border-2 border-danger">
        <div className="row vh">
          <div className="d-flex flex-column col-12 col-lg-12 col-xl-12">
          {props.children}
          </div>
        </div>
      </div>
    );
}
 
export default ChatContainer;