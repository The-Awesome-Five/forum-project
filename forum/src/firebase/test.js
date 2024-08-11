import {removeElement, updateElement} from "./firebase-funcs.js";
import { createElement } from "./firebase-funcs.js";
import { createPath } from "./firebase-funcs.js";
import { getElement } from "./firebase-funcs.js";
import {
    createCategory,
    editCategory,
    getAllCategories,
    hideCategory,
    lockUserFromCategory
} from "../services/category.service.js";
import {
    createSubcategory,
    deleteSubcategory,
    getSubcategoriesByCategoryId, hideSubcategories,
    hideSubcategory,
    lockSubcategory, unhideSubcategory, unlockSubcategory
} from "../services/subcategory.service.js";
import { createPost, deletePost, lockPosts, removePostsByCategoryId } from "../services/post.service.js";
import { createReply } from "../services/reply.service.js";

// const testingFunc = async () => {
//     let result;
//     let createdPath;
//     let element;
//     let editResult;
//     let deleteResult;
//
//     // First handle async calls and capture results
//     result = await createElement('admin', 'Roles');
//
//     createdPath = createPath('Roles', result);
//
//     element = await getElement(createdPath);
//
//     editResult = await updateElement('moderator', createdPath);
//
//     deleteResult = await removeElement(createdPath);
//
//     // Ensure all promises are wrapped correctly
//     const promises = [
//         await createElement('admin', 'Roles'),
//         await getElement(createdPath),
//         await updateElement('moderator', createdPath),
//         await removeElement(createdPath)
//     ];
//
//     return Promise.all(promises);
// }
//
// testingFunc().then(() => {
// }).catch((error) => {
//     console.error("An error occurred:", error);
// });

// try {
//     const id = await createCategory('Games');
//     await editCategory(1, id, 'subcategory_ids')
//     await hideCategory(id);
//     await lockUserFromCategory(id, 2, 'Pesho');
//     await lockUserFromCategory(id, 3, 'Gosho');
//     await editCategory(2, id, 'subcategory_ids')

//     const sub_id = await createSubcategory('PC Gaming', id);
//     await hideSubcategory(id, sub_id);
//    await unhideSubcategory(id, sub_id);

//     const id_2 = await createSubcategory('Console Gaming', id);

//     await hideSubcategories(id);

// } catch (e) {
// }


/*// const info={
//     'Title': 'Test',
//     'Content': "Test",
//     'CreatedOn': new Date().toDateString(),
//     'User': {
//         'Test': 'Pesho'
//     }
// }
const paths= ['category/1/posts','category/2/posts',{1:null}]
const pathForCreating= 'post'

// setFunction(info, paths,pathForCreating);
// subcategoru/category
// posts/subcategory/
// replies/post/

// const pathForUpdate= 'post/-O3DZD7sTYnubHGSaxHM/Title'
// createElement(info, pathForCreating);
// updateElement('What to do',pathForUpdate);

const name= ['post','-O3DZD7sTYnubHGSaxHM', 'Title']


const pathing= ['post', '-O3DZD7sTYnubHGSaxHM'];
/!*const info='Big Test';
let result= createPath(pathing);
// updateElement(info,result);


try {
    const category = {
        name: "PC Gaming",
        imgUrl: '/img/category-logo-test.png',
        description: 'This is PC Gaming category'
    }
    const category2 = {
        name: "Console Gaming",
        imgUrl: '/img/category-logo-test.png',
        description: 'This is Console Gaming category'
    }
    const categoryid= await createCategory(category);
    const categoryid2= await createCategory(category2);
    const subcategoriesId= await createSubcategory('PC Hardware', categoryid, '/img/subcategory-logo.png');
    const subcategoriesId1= await createSubcategory('PC Software', categoryid, '/img/subcategory-logo.png');
    const subcategoriesId2= await createSubcategory('PC News', categoryid, '/img/subcategory-logo.png');
    const subcategoriesId3= await createSubcategory('Console Hardware', categoryid2, '/img/subcategory-logo.png');
    const subcategoriesId4= await createSubcategory('Console Software', categoryid2, '/img/subcategory-logo.png');
    const subcategoriesId5= await createSubcategory('Console News', categoryid2, '/img/subcategory-logo.png');
    // const info=  {
    //     "id": "post1",
    //     'createdOn': new Date().toLocaleTimeString(),
    //     "isHidden": false,
    //     "isLocked": false,
    //     createdBy:{
    //     "username": "Post 1",
    //     },
    //     'updatedOn': null,
    //   }
    //   const info1=  {
    //     "id": "post3",
    //     'createdOn': new Date().toLocaleTimeString(),
    //     "isHidden": false,
    //     "isLocked": false,
    //     createdBy:{
    //     "username": "Post 3",
    //     },
    //     'updatedOn': null,
    //   }
    // const postId= await createPost(info, subcategoriesId);
    // const postId1= await createPost(info1, subcategoriesId1);
    // const reply=  {
    //     "id": "post2",
    //     'createdOn': new Date().toLocaleTimeString(),
    //     "isHidden": false,
    //     "isLocked": false,
    //     createdBy:{
    //         "username": "Post 2",
    //         },
    //   }
    // const replyid= await createReply(info,postId,subcategoriesId);
    //
    // const categories = await getAllCategories();


    // deleteSubcategory(categoryid, subcategoriesId);
}
catch(e){

}

//  const post={
//         isLocked:false,
//         isHidden:false,
//         'Title': 'What is the best Gaming Mouse?',
//         'Content': 'Hey guys, I am not sure what the best gaming mouse is... any advice?',
//         'createdBy' : {
//             'ID' : 'WTr47SzR3jfCDlnKx6YGbksqO5L2',
//             'username':'VladTheVolgarian',
//         },
//         'CreatedOn': new Date().toDateString(),
//         Likes: [],
//         ReportsID: [],
//         'LatestReplyDate': null,
// }
// createPost(post, '-O3llvnnzZ05F2Ojznvw')