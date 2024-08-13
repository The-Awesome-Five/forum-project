#FireBase:

Users: {

    id : {
        FirstName: String
        LastName: String
        Email: String
        Username: String
        avatarURL:
        Posts: {}
        RoleId: number
        ReplyID: {
            replyid:true
        }
        likedPosts:{}
        likedReplies: {}
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
        imgURL: string
        description: string
        id:
    },
    ...
}

Subcategories: {
    CategoryID
        {
            id: {
                  name: string
                    isHidden: False;
                    imgURL: string
                 isLocked: False;
                    id:
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
        likedBy: {}
        subcategoryID:
        UpdatedOn:
        Replies:
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
        likedBy:{}
        id: string
        isHidden: false
        isLocked: false
    },
    }
    ...
}

Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js: Install the latest stable version of Node.js from the official website.
npm: Comes bundled with Node.js. Verify it's installed by running npm -v in your terminal.
Git: If you're cloning the project from a repository, make sure you have Git installed. You can download it from the official website.

1. Clone the Repository (If Applicable)

2. Install Dependencies
After navigating to the project directory, install all necessary dependencies. The package manager (npm or yarn) will read the package.json file and install the required package

3. Run the Project 
npm run dev
