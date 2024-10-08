import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { likePost, dislikePost, updatePost, deletePost } from '../../services/post.service';
import { getUserAvatar } from '../../services/user.service';
import { AppContext } from '../../state/app.context';
import './posts.css';
import { reportPost, UpdateReport } from '../../services/report.service';

export const PostDetail = () => {
    const { postId, subcategoryId, categoryId } = useParams();
    const [post, setPost] = useState(null);
    const { userData } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getUserAvatar(subcategoryId, postId);
                console.log('Fetched post data:', data);  // Логваме данните, които получаваме
                setPost({
                    likedBy: data.likedBy ?? {},
                    ...data,
                });
                setEditedContent(data.Content);
            } catch (e) {
                console.error('Error fetching post:', e);
            }
        };

        fetchPost();
    }, [subcategoryId, postId]);


    const toggleLike = async () => {
        if (!userData || !post) {
            alert("You need to be logged in to like or dislike a post.");
            return;
        }

        const isLiked = Object.keys(post.likedBy).includes(userData.uid);

        try {
            if (!isLiked) {
                await likePost(userData.uid, postId, subcategoryId, post.Title, post.createdBy?.ID, userData.username);
                setPost(prevPost => ({
                    ...prevPost,
                    likedBy: {
                        ...prevPost.likedBy,
                        [userData.uid]: true,
                    },
                }));
            } else {
                await dislikePost(userData.uid, postId, subcategoryId);
                const { [userData.uid]: _, ...newLikedBy } = post.likedBy;
                setPost(prevPost => ({
                    ...prevPost,
                    likedBy: newLikedBy,
                }));
            }
        } catch (error) {
            console.error('Error updating like status:', error);
            alert(error.message);
        }
    };

    const handleEdit = () => {
        if (userData && post && userData.uid === post.createdBy.ID) {
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        try {
            await updatePost({ Content: editedContent }, subcategoryId, postId);
            setPost(prevPost => ({
                ...prevPost,
                Content: editedContent
            }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating post:', error);
            alert(error.message);
        }
    };

    const handelReport = async () => {

        try {
            await UpdateReport(userData.uid, postId);
            await reportPost (userData.uid, postId ,subcategoryId,  categoryId);
       
        }
        catch(e){
            console.log(e);
        }

      window.location.reload()
    }

    const handleDelete = async () => {
        try {
            await deletePost(subcategoryId, postId);
            navigate('/')
        } catch (error) {
            console.error('Error deleting post:', error);
            alert(error.message);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }


    return (
        <div id="post-container">
            <div id="post-header">
                {post.isHidden ? <div>Post is Hidden</div> :<></> }
                <img
                    src={post.createdBy.avatarUrl || 'default-avatar.png'}
                    alt="User Avatar"
                    id="post-avatar"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                />


                <Link to={`/profile/${post.createdBy?.ID}`}><span className="reply-author">{post.createdBy.username}</span>
                </Link>
                <span className="reply-date">{new Date(post.CreatedOn).toLocaleString()}</span>




                <h1 id="post-title">{post.Title}</h1>
            </div>
            <div id="post-separator"></div>

            {isEditing ? (
                <div id="post-edit">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div id="post-body">{post.Content}</div>
            )}

            <div id="post-footer-separator"></div>
            <>
                <div>Likes: {Object.keys(post.likedBy).length}</div>
                <button onClick={toggleLike} disabled={!userData}>
                    {userData && Object.keys(post.likedBy).includes(userData.uid) ? 'Dislike' : 'Like'}
                    
                </button>
                <button onClick={handelReport} disabled={!userData}>
                    {userData && post.reportedBy && (Object.keys(post.reportedBy).includes(userData.uid)) ? 'Reported' : 'Report'}
                </button>
                {userData && (post.createdBy.ID === userData.uid || userData.role === "Admin") && (
                    <>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
            </>
        </div>
    );
};
