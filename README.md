FireBase:

Users: {

    id : {
        FirstName: String
        LastName: String
        Email: String
        Username: String
        Notification:  [number]
        FavoritesIDs: [number];
        RoleId: number
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
        subcategories:[topics.ids];
    },
    ...
}

Subcategories: {
    
    id: {
        CategoryId: number
        Name of the topic: String
        Numbers: number
        PostID:[number];
        Deleted: Boolean;
    }
    ....
}

Posts: {

    id:{
        SubcategoryID: number;
        Title: String
        Content: String;
        CreatedBy : {
            ID: Username
        }
        CreatedOn: Date;
        NumberOfReplies: number;
        Likes: [{ID: Username},...];
        ReportsID: [reports.ID,...]
        Deleted: Boolean;
    },
    ...
}

Reply: {
    
    id:{
        PostID: number;
        Content: String;
        CreatedBy : {
            ID: Username
        }
        CreatedOn: Date;
        Likes: [{ID: Username},...];
        ReportsID: [reports.ID,...]
         Deleted: Boolean;
    },
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


