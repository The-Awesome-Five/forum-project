#FireBase:

Users: {

    id : {
        FirstName: String
        LastName: String
        Email: String
        Username: String
        Notification:  [number]
        FavoritesIDs: [number];
        RoleId: number
        PostsID: {
            postid:true
        }
        ReplyID: {
            replyid:true
        }
    }
    ....
}

Roles: {

    1:admin;
    2:Mod;
    3:User_Reg;

}

Categories: {

    id: {
        name: string
        isHidden: False;
    },
    ...
}

Subcategories: {
    CategoryID
        {
            id: {
                isLocked:false
                isHidden:false;
                Name of the Subcategory: String
        
        },
            id: {
                isLocked:false
                isHidden:false;
                Name of the Subcategory: String
        },

    }
    ....
}

Posts: {

subcategoryID:{
    id:{
        isLocked:false
        isHidden:false;
        Title: String
        Content: String;
        CreatedBy : {
            ID: Username
        }
        CreatedOn: Date;
        Likes: [{ID: Username},...];
        ReportsID: [reports.ID,...]
        Latest Reply Date: Date
    },
    ...
    }
}

Reply: {
    postID{
    id:{
        Content: String;
        CreatedBy : {
            ID: Username
        }
        CreatedOn: Date;
        Likes: [{ID: Username},...];
        ReportsID: [reports.ID,...]
    },
    }
    ...
}


Reports: {

    id:{
        Title: String
        Content: String;
        CreatedBy : {
            ID: Username
        }
        CreatedOn: Date;
        ReportedPostID: ID
        Resolved: Boolean;
    },
    ...
}

#Components:
Main Page
Subcategory Page
Post Page
Notification Page
Notification Component 
Account Profile
Admin Menu
Login Component
Register Component
Report Component
Post Component
Reports Page

/// Category, Subcategory Pages - isHidden && !isAdmin = hidden

// administrator - reports, user management, create, edit and delete categories, create, edit and delete subcategories, lock, delete and hide posts, hide and delete replies

// moderator - lock users from category, create, edit and delete subcategories, lock, delete and hide posts, hide and delete replies

// user - create, edit and delete posts, create, edit and delete replies

// when we delete post / reply made by user, we delete the post / reply and the user's post / reply ids are updated
// only when the user tries to access them

// category state - active, deleted or hidden
// delete - delete everything - not recommended (optional)
// hide - hide and lock everything - isHidden == true

// subcategory state - active, locked, deleted or hidden
// lock - lock creating posts and replying to them
// delete - delete subcategory, posts and replies 
// hide - hide subcategory and posts - isHidden === true

// posts - active, locked, deleted or hidden
// lock - lock creating replies
// delete - delete post and replies
// hide - hide post - isHidden === true

// reply - delete
// delete - delete reply
Search Page
Search Component 
Edit Post Component 
 
