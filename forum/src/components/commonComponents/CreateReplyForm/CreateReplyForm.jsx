import { useContext, useState } from "react";
import { AppContext } from "../../../state/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { createReply } from "../../../services/reply.service";

export const CreateReplyForm = () => {
  const { userData } = useContext(AppContext);
  const { subcategoryId, postId, categoryId } = useParams();

  const [reply, setReply] = useState({
    createdBy: {
      username: '',
      ID: ''
    },
    Content: '',
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

  const create = async () => {
    const { Content } = reply;
    if (!Content) {
      return alert('Please fill all of the needed fields');
    }
    if (Content.length < 10) {
      return alert('Content needs to be above 10 characters');
    }

    try {
      reply.CreatedOn = new Date().toString();
      reply.createdBy.ID = userData.uid;
      reply.createdBy.username = userData.username;
      const replyID = await createReply(reply, postId, subcategoryId);

      navigate(0);
    } catch (e) {
      // Handle the error
    }
  };

  return (
    <div className="create-reply-container">
      <textarea
        className="reply-textarea"
        placeholder="Write your reply..."
        value={reply.Content}
        onChange={updatePost('Content')}
        rows="5"
      />
      <button className="submit-reply-button" onClick={create}>
        Post Reply
      </button>
    </div>
  );
};

export default CreateReplyForm;