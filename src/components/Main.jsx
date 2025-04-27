//import react from "react";
import Login from "./Login";
import React, { useState, useEffect } from "react";
import Chat from "./Chat";


const Main=({socket})=>{

    const [newUser,setNewUser] = useState("")
    const [user,setUser]= useState({});
    // const [users,setUsers]= useState('');
    const [message,setMessage]= useState();
    const [messages,setMessages]= useState([]);

    useEffect(()=>{ 
      console.log("new",socket)
      socket.on("users",(users)=>{
        const messagesArr=[];
        console.log(users,"users")
        for(const {userId, username} of users){
          const newMessage={type:"UserStatus", userId, username};
          messagesArr.push(newMessage);
        }
        setMessages([...messages, ...messagesArr]);
        // setUsers(username)
      })
      socket.on("session",({userId, username})=>{
         setUser({userId, username})
      })
      socket.on("user connected",({userId,username})=>{
        console.log("user connectsd")
        const newMessage={type:"UserStatus", userId, username};
        setMessages((prev)=>[...prev, newMessage]);
      });
      socket.on("new message",({userId,username,message})=>{
        console.log(userId,";",username,":",message)
        const newMessage={type:"message", 
           userId:userId,
           username:username,
           message:message.message ?? message,
        };
        setMessages((messages)=>[...messages, newMessage]);
        console.log("received",messages,newMessage)
      })
      // return () => {
      //   socket.off("users");
      //   socket.off("session");
      //   socket.off("user connected");
      //   socket.off("new message");
      // };
    },[socket])

    function handleChange(e) {
      setNewUser(e.target.value);
    }
    // const handleChange = ({ currentTarget:input}) =>{
    //     setNewUser(input.value)
    // }
    function logNewUser(){
        setUser(newUser)
        socket.auth={username:newUser}

        if (!socket.connected) {
          socket.connect();
        }
        // setUser(newUser)
        console.log(user,socket)
    }

    function sendMessage(){
      const newMessage={type:"message", userId:user.userId,
         username:user.username,
         message
      };
      socket.emit("new message", newMessage);

      setMessages([...messages, newMessage]);
      console.log(messages,"new message")
      setMessages("");
      console.log(messages,"empty");
    }
    return(
        <main className="content">
        <div className="container mt-3">
           {user.userId && 
             <Chat user={user} message={message} messages={messages} setMessage={setMessage} sendMessage={sendMessage}/>
           }
           {!user.userId && 
             <Login newUser={newUser} handleChange={handleChange} 
             logNewUser={logNewUser}  />
           
           }
           
         </div>      
       </main>
    )
}

export default Main