

const ChatInput = ({message,setMessage,sendMessage}) => {
    return ( 
        <div className="mt-auto align-items-end border-info py-3 px-4 border-top d-lg-block mb-0">
        <div className="input-group flex-fill gap-2">
            <input type="text" className="form-control" name="message" value={message} 
            placeholder="Type your Message...."  
            onChange={(e)=>setMessage(e.target.value)}
          />
            <button className="btn btn-info " onClick={()=>sendMessage()}>Send</button>
        </div>
    </div>
     );
}
 
export default ChatInput;