FireBase:

Users:{
    id : {
        FirstName: String
        LastName: String
        Email: String
        Username: String
        PostIDs: [number]
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

Topics: {
    id: {
        Name of the topic: String
        Numbers: number
        PostID:[number];
    }
    ....
}

Posts: {

    id:{
        CategoryID: number;
        Title: String
        Content: String;
        CreatedBy : {
            ID: Username
        }
        CreatedOn: Date;
        NumberOfReplies: number;
        Likes: [{ID: Username},...];
        ReportsID: [reports.ID,...]
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
    },
    ...
}
