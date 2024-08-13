import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/post.service";
import { getAllUsers } from "../../../services/user.service";
import './Footer.css'
export const Footer= () => {
    const [users, setUsers]= useState([]);
    const [posts, setPosts]= useState([]);

    useEffect (()=> {
        const getUsers = async () =>{
            const use= await getAllUsers();
        
            setUsers(use);
        }
        const getPosts = async () =>{
            const post= await getAllPosts();
         
            setPosts(Object.keys(post));
        }

        getUsers();
        getPosts();
    },[])


    return (
        <div id='Footer'>
        <h4> Number of users: {users.length}</h4>
        <h4> Number of posts on the forum: {posts.length}</h4>
        <br></br>
        <h4>© 2024 TEAM05 TELERIK. All rights reserved.</h4>
        </div>
    )


}

