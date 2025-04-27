
 
const ChatHeader = ({user}) => {
    return (  
        <div className="align-item-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top ">
        <div className="d-flex align-item-center py-1">
          <div className="position-relative">
            <img src="https://w0.peakpx.com/wallpaper/760/108/HD-wallpaper-new-whatsapp-dp-plant-whats-app-dp.jpg"
            className="rounded-circle mx-2"
            alt={user.username} width="40" height="40"
            />
          </div>
          <div className="flex-grow-1 fs-3 fw-bold text-primary ">
            <strong>Logged in {user.username}</strong>
          </div>
        </div>
      </div>
    );
}
 
export default ChatHeader;