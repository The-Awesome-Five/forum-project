import {removeElement, updateElement} from "./firebase-funcs.js";
import { createElement } from "./firebase-funcs.js";
import { createPath } from "./firebase-funcs.js";
import { getElement } from "./firebase-funcs.js";
import {createCategory, editCategory, hideCategory, lockUserFromCategory} from "../services/category.service.js";
import {
    createSubcategory,
    getSubcategoriesByCategoryId, hideSubcategories,
    hideSubcategory,
    lockSubcategory, unhideSubcategory, unlockSubcategory
} from "../services/subcategory.service.js";

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

try {
    // const id = await createCategory('Games');
    // await editCategory(1, id, 'subcategories_ids')
    // await hideCategory(id);
    // await lockUserFromCategory(id, 2);
    // await lockUserFromCategory(id, 3);
    // await editCategory(2, id, 'subcategories_ids')

    const id = await createSubcategory('PC Gaming', 23123123);
    await hideSubcategory(23123123, id);
    await unhideSubcategory(23123123, id);

    const id_2 = await createSubcategory('Console Gaming', 23123123);

    await hideSubcategories(23123123);

} catch (e) {
    console.log(e)
}


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


