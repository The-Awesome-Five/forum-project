import { useContext, useState, useEffect } from "react";
import { dislikeReply, likeReply } from "../../../services/reply.service";
import { AppContext } from "../../../../state/app.context";
import { useParams } from "react-router-dom";
import './RenderSingleReply.css';

export const RenderSingleReply = ({ reply }) => {
    const { userData } = useContext(AppContext);
    const [replyState, setReply] = useState({
        ...reply,
        likedBy: reply.likedBy || {} 
    });
    const { postId } = useParams();

    // Ensure the userData is available before rendering the component
    if (!userData || !userData.uid) {
        return null; // or return a loading state
    }

    const toggleLike = async () => {
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

    return (
        <div id="reply-container">
            <div id="reply-header">
                <span className="reply-author">{replyState.createdBy.username}</span>
                <span className="reply-date">{new Date(replyState.CreatedOn).toLocaleString()}</span>
            </div>
            <div id="reply-body">{replyState.Content}</div>
            <div id="reply-footer-separator"></div>
            <div>
                <div>Likes: {Object.keys(replyState.likedBy).length}</div>
                <button onClick={toggleLike}>
                    {Object.keys(replyState.likedBy).includes(userData.uid) ? 'Dislike' : 'Like'}
                </button>
            </div>
        </div>
    );
};