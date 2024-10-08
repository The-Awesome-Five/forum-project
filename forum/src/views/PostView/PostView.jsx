import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getReplies } from '../../services/reply.service.js';
import { RenderSingleReply } from '../../components/commonComponents/Reply/RenderSingleReply.jsx';
import { CreateReplyForm } from '../../components/commonComponents/CreateReplyForm/CreateReplyForm.jsx';
import { PostDetail } from '../../components/postViewComponents/posts.jsx';
import {AppContext} from "../../state/app.context.js";
import { getSinglePost } from '../../services/post.service.js';

export const PostView = () => {
    const { postId } = useParams();
    const [replies, setReplies] = useState([]);
    const {user,userData} = useContext(AppContext);
    const {subcategoryId}= useParams()
    const [post, setPost]= useState({});
    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const fetchedReplies = await getReplies(postId);
                setReplies(Object.values(fetchedReplies));
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };

        const fetchPost = async () => {
            try {
                const fetchedPost = await getSinglePost( subcategoryId, postId);
                setPost((fetchedPost));
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };
        fetchPost();
        fetchReplies();
    }, [postId]);
  
    return (
        <div>
            <PostDetail />
            <div>
                {replies.length > 0 ? (
                    replies.map((reply) => (
                        <RenderSingleReply key={reply.id} reply={reply}  subcategoryId={subcategoryId}/>
                    ))
                ) : (
                    <p>No replies yet</p>
                )}
            </div>
            {userData && !post.isLocked && (userData && !userData.isBlocked) && <CreateReplyForm postId={postId} />}
        </div>
    );
};
