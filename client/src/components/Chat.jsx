import { getPreviousChats, sendMessage, logout } from "../services/chat.js";
 import { useRef, useState, useEffect } from "react";
 import "./Chat.css";

 export default function Chat() {
   const [conversations, setConversations] = useState([]);
   const [message, setMessage] = useState("");
   const [currentConversation, setCurrentConversation] = useState(null);
   const [error, setError] = useState("");
   const scrollRef = useRef();
   const token = localStorage.getItem("token");

   useEffect(() => {
     async function getHistory() {
       try {
         const { data } = await getPreviousChats(token);
         setConversations(data);
         if (data.length) setCurrentConversation(data[0]);
       } catch {
         setError("Unable to get the conversations");
       }
     }
     getHistory();
   }, [token]);

   useEffect(() => {
     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [currentConversation?.messages]);

   const handleSendMessage = async (e) => {
     e.preventDefault();
     if (!message.trim()) return;

     const userMsg = { sender: "user", content: message };
     const convoId = currentConversation?._id || null;
     const updatedMessages = [
       ...(currentConversation?.messages || []),
       userMsg,
     ];
     const updatedConvo = {
       _id: convoId,
       messages: updatedMessages,
       updatedAt: new Date().toISOString(),
     };

     setCurrentConversation(updatedConvo);
     setConversations((prev) => {
       const exists = prev.find((c) => c._id === convoId);
       if (exists) {
         return prev.map((c) =>
           c._id === convoId ? updatedConvo : c
         );
       }
       return [updatedConvo, ...prev];
     });
     setMessage("");

     try {
       const { data } = await sendMessage(
         { conversationId: convoId, message },
         token
       );
       const aiMsg = { sender: "ai", content: data.reply };
       const finalMessages = [...updatedMessages, aiMsg];
       const finalConvo = {
         _id: data.conversationId,
         messages: finalMessages,
         updatedAt: new Date().toISOString(),
       };

       setCurrentConversation(finalConvo);
       setConversations((prev) =>
         prev.map((c) => (c._id === finalConvo._id ? finalConvo : c))
       );
     } catch {
       console.error("Send message failed");
       setError("Failed to send message");
     }
   };

   return (
     <div className="chat-wrapper">
       <aside className="conversation-list">
         <button
           className="logout"
           onClick={() => {
             logout();
             window.location = "/login";
           }}
         >
           Logout
         </button>
         <h3>Conversations</h3>
         {conversations.map((c) => (
           <div
             key={c._id}
             className={`conversation-item${
               currentConversation?._id === c._id ? " active" : ""
             }`}
             onClick={() => setCurrentConversation(c)}
           >
             {new Date(c.updatedAt).toLocaleString()}
           </div>
         ))}
       </aside>

       <main className="chat-window">
         {currentConversation ? (
           <>
             <div className="messages">
               {currentConversation.messages.map((m, i) => (
                 <div key={i} className={`message ${m.sender}`}>
                   {m.content}
                 </div>
               ))}
               <div ref={scrollRef} />
             </div>
             <form className="input-form" onSubmit={handleSendMessage}>
               <input
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="Type your message here"
               />
               <button type="submit" className="send-button">
                 Send message
               </button>
             </form>
             {error && <div className="error">{error}</div>}
           </>
         ) : (
            <div className="empty">
              <p>No conversations yet. Say Hello!</p>
              <form className="input-form" onSubmit={handleSendMessage}>
                <input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type your message here"
                />
                <button type="submit" className="send-button">
                  Send message
                </button>
              </form>
            </div>
         )}
       </main>
     </div>
   );
 }