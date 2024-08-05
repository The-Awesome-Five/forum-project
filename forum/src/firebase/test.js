import {removeElement, updateElement} from "./firebase-funcs.js";
import { createElement } from "./firebase-funcs.js";
import { createPath } from "./firebase-funcs.js";
import { getElement } from "./firebase-funcs.js";
import {createCategory, editCategory} from "../services/category.service.js";
import {getSubcategoriesByCategoryId} from "../services/subcategory.service.js";

// const testingFunc = async () => {
//     let result;
//     let createdPath;
//     let element;
//     let editResult;
//     let deleteResult;
//
//     // First handle async calls and capture results
//     result = await createElement('admin', 'Roles');
//     console.log(result);
//
//     createdPath = createPath('Roles', result);
//
//     element = await getElement(createdPath);
//     console.log(element);
//
//     editResult = await updateElement('moderator', createdPath);
//     console.log(editResult);
//
//     deleteResult = await removeElement(createdPath);
//     console.log(deleteResult);
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
//     console.log("All operations completed");
// }).catch((error) => {
//     console.error("An error occurred:", error);
// });

const id = createCategory('Games');
await editCategory({subcategory_ids: 1}, id);
console.log(getSubcategoriesByCategoryId(id))


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
console.log( await getElement(result))*!/*/


