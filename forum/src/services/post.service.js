export const batchPosts = async (postData) => {
    try {
      const postRequests = postData.map(post =>
        fetch('/home/topics', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SubcategoryID: post.SubcategoryID,
            Title: post.Title,
            Content: post.Content,
            CreatedBy: {
              ID: post.CreatedBy.ID
            },
            CreatedOn: post.CreatedOn,
            NumberOfReplies: post.NumberOfReplies,
            Likes: post.Likes,
            ReportsID: post.ReportsID,
            Deleted: post.Deleted,
            RepliesId: post.RepliesId,
            LatestReplyDate: post.LatestReplyDate
          })
        })
      );
  
      const responses = await Promise.all(postRequests);
      const results = await Promise.all(responses.map(response => response.json()));
      console.log('Response:', results);
      return results;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  