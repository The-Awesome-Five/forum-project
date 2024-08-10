import { useContext, useState } from "react";
import { AppContext } from "../../../../state/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { createReply } from "../../../services/reply.service";
export const CreateReplyForm = () =>  {
    const { userData } = useContext(AppContext); 
    const { subcategoryId } = useParams();
    const {postId} = useParams();
    const {categoryId}= useParams();
const [reply, setReply] = useState({
    createdBy: {
        username: '',
        ID: ''
    },
    Content:'',
    CreatedOn: '',
    isHidden: false,
    isLocked: false,

  });
  
  const navigate = useNavigate();
  const updatePost = (prop) => (e) => {
     
    setReply((prevPost) => ({
      
      ...prevPost,
      [prop]: e.target.value,
    }));
  };

  const create= async() => {
    const { Content } = reply;
    if(!Content){
        return alert('Please fill all of the needed fields');
    }
    if(Content.length < 10){
        return alert('Content needs to be above 10 characters');
    }

    try {
        reply.CreatedOn=new Date().toString();
        reply.createdBy.ID= userData.uid
        reply.createdBy.username= userData.username
        const replyID= await createReply(reply,postId, subcategoryId);

        navigate(0);
    }
    catch(e){
        console.log(e);
    }
  }

return (
  <div>
        <br/>
        <textarea
        placeholder="Content"
        value={reply.Content}
        onChange={updatePost('Content')}
        rows="5" 
      />
         
         <br/>
         <button onClick={create}>Post</button>
  </div>
)
}