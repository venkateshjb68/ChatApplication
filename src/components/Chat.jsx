import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatContainer from "./ChatContainer";

const Chat = ({user,message,messages, sendMessage,setMessage}) => {
    return ( 
        
        <ChatContainer>
          <ChatHeader user={user} />
          <div className="position-relative chat-height overflow-auto">
            <div className="d-flex flex-column p-4">
              {/* {messages&&messages.map((message,index)=>{
                return message.type === "UserStatus" ?( 
                <div key={index} className="text-center">
                  <span className="badge bg-info">
                    {message.userId === user.userId ? "You have Joined!" : `${message.username} has Joined`}
                  </span>
                </div>): 
                <div key={index} className={message.userId === user.userId ? "chat-message-right pb-4":"chat-message-left pb-4"}>
                  <div>
                    <img src="https://w0.peakpx.com/wallpaper/760/108/HD-wallpaper-new-whatsapp-dp-plant-whats-app-dp.jpg" 
                    className="rounded-circle mr-1" alt={message.username}
                    title={message.username} 
                    width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">
                      12.00am
                    </div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div className="font-weight-bold mb-1">
                      {message.userId === user.userId ? "you" : message.username }
                    </div>
                    {message.message}
                  </div>
                </div>;
              }
              )}  */}
              {messages && messages.map((message, index) => (
                  message.type === "UserStatus" ? (
    <div key={index} className="text-center">
      <span className="badge bg-info">
        {message.userId === user.userId ? "You have Joined!" : `${message.username} has Joined`}
      </span>
    </div>
  ) : (
    <div key={index} className={message.userId === user.userId ? "chat-message-right pb-4" : "chat-message-left pb-4"}>
      <div>
        <img
          src="https://w0.peakpx.com/wallpaper/760/108/HD-wallpaper-new-whatsapp-dp-plant-whats-app-dp.jpg"
          className="rounded-circle mr-1"
          alt={message.username}
          title={message.username}
          width="40"
          height="40"
        />
        <div className="text-muted small text-nowrap mt-2">
          12.00am
        </div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div className="font-weight-bold mb-1">
          {message.userId === user.userId ? "You" : message.username}
        </div>
        {message.message}
      </div>
    </div>
  )
))}

            </div>
          </div>
          <ChatInput message={message} setMessage={setMessage}  sendMessage={sendMessage}/>

         
        </ChatContainer>
        
     );
}
 
export default Chat;