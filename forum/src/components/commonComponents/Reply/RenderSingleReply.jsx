import { useContext, useState } from "react";
import { dislikeReply, likeReply, updateReply, deleteReply } from "../../../services/reply.service";
import { AppContext } from "../../../../state/app.context";
import { useParams } from "react-router-dom";
import './RenderSingleReply.css';

export const RenderSingleReply = ({ reply, subcategoryId }) => {
    const { userData } = useContext(AppContext);
    const [replyState, setReply] = useState({
        ...reply,
        likedBy: reply.likedBy || {}
    });
    const [isEditing, setIsEditing] = useState(false);  
    const [editedContent, setEditedContent] = useState(reply.Content); 
    const { postId } = useParams();

    const toggleLike = async () => {
        if (!userData || !userData.uid) {
            alert("You need to be logged in to like or dislike a reply.");
            return;
        }

        const isLiked = Object.keys(replyState.likedBy).includes(userData.uid);

        try {
            if (!isLiked) {
                await likeReply(userData.uid, postId, replyState.id);
                setReply(prevReply => ({
                    ...prevReply,
                    likedBy: {
                        ...prevReply.likedBy,
                        [userData.uid]: true
                    }
                }));
            } else {
                await dislikeReply(userData.uid, postId, replyState.id);
                const { [userData.uid]: _, ...newLikedBy } = replyState.likedBy;
                setReply(prevReply => ({
                    ...prevReply,
                    likedBy: newLikedBy
                }));
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            alert(error.message);
        }
    };
    console.log(userData)
    const handleEdit = () => {
        if (userData && userData.uid === replyState.createdBy.ID) {
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        try {
            await updateReply({ Content: editedContent }, postId, replyState.id );
            setReply(prevReply => ({
                ...prevReply,
                Content: editedContent
            }));
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating reply:", error);
            alert(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReply(postId, replyState.id, subcategoryId);
            window.location.reload(); // Reload the page after deletion
        } catch (error) {
            console.error("Error deleting reply:", error);
            alert(error.message);
        }
    };

    return (
        <div id="reply-container">
            <div id="reply-header">
                <span className="reply-author">{replyState.createdBy.username}</span>
                <span className="reply-date">{new Date(replyState.CreatedOn).toLocaleString()}</span>
            </div>
            {isEditing ? (
                <div id="reply-edit">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        style={{ width: '100%', overflow: 'hidden', minHeight: '50px' }} 
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div id="reply-body">{replyState.Content}</div>
            )}
            <div id="reply-footer-separator"></div>
            <div>
                <div>Likes: {Object.keys(replyState.likedBy).length}</div>
                <button onClick={toggleLike} disabled={!userData}>
                    {userData && Object.keys(replyState.likedBy).includes(userData.uid) ? 'Dislike' : 'Like'}
                </button>
                {(userData && (replyState.createdBy.ID === userData.uid || userData.role === "Admin")) && (
                    <>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
};