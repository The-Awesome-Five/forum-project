import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReplies } from '../../services/reply.service.js';
import { RenderSingleReply } from '../../components/commonComponents/Reply/RenderSingleReply.jsx';
import { CreateReplyForm } from '../../components/commonComponents/CreateReplyForm/CreateReplyForm.jsx';
import { PostDetail } from '../../components/postViewComponents/posts.jsx';

export const PostView = () => {
    const { postId } = useParams();
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const fetchedReplies = await getReplies(postId);
                setReplies(Object.values(fetchedReplies)); 
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };
        
        fetchReplies();
    }, [postId]);

    return (
        <div>
            <PostDetail />
            <div>
                {replies.length > 0 ? (
                    replies.map((reply) => (
                        <RenderSingleReply key={reply.id} reply={reply} />
                    ))
                ) : (
                    <p>No replies yet</p>
                )}
            </div>
            <CreateReplyForm postId={postId} />
        </div>
    );
};