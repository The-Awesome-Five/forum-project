import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../state/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { createPost } from "../../../services/post.service";
import { getUserByID } from "../../../services/user.service";
export const CreatePost = () =>  {
    const { user } = useContext(AppContext); 
    const { subcategoryId } = useParams();

    const [poster, setPoster] = useState(null); // State to store user data
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const result = await getUserByID(user.uid); // Fetch user data
          setPoster(result); // Update state with the fetched data
        } catch (err) {
          console.log(err);
        } 
      };
  
      fetchUser(); // Call the async function
    }, []); 
const [post, setPost] = useState({
    createdBy: {
        username: '',
        ID: ''
    },
    Title:'',
    Content:'',
    CreatedOn: '',
    isHidden: false,
    isLocked: false,

  });
  
  const navigate = useNavigate();
  console.log(poster)
  const updatePost = (prop) => (e) => {
     
      setPost((prevPost) => ({
      
      ...prevPost,
      [prop]: e.target.value,
    }));
  };

  const create= async() => {
    const { Title, Content } = post;
    if(!Title  || !Content){
        return alert('Please fill all of the needed fields');
    }
    if(Title.length < 16 || 64 < Title.length){
        return alert('Title should be between 16 and 64 symbols');
    }
    if(Content.length < 32 || 8192 < Content.length){
        return alert('Content needs to be between 32 and 8192 symbols');
    }

    try {
        post.CreatedOn=new Date().toString();
        post.createdBy.ID= poster.uid
        post.createdBy.username= poster.username
        await createPost(post, subcategoryId);
        navigate('/');
    }
    catch(e){
        console.log(e);
    }
  }

return (
  <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Title"
          value={post.Title}
          onChange={updatePost('Title')}
        />
        <br/>
        <textarea
        placeholder="Content"
        value={post.Content}
        onChange={updatePost('Content')}
        rows="5" 
      />
         
         <br/>
         <button onClick={create}>Post</button>
  </div>
)
}