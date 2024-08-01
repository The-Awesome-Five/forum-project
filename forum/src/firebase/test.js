import {batchUpdates} from "./batchUpdates.js";
import { ref, push } from 'firebase/database';
import { get, set, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from "./config.js";
// const categoryOneId = 1;
// const categoryTwoId = 2;

// const objectOne = `Role/${1}`;
// const objectTwo = `Role/${2}`;
// const objectThree = `Role/${3}`;

// const updates = {
//     // Creating new data
//     [objectOne]: {name: 'User', subcategories: ['']},
//     [objectTwo]: {name: 'Mod', subcategories: ['']},
//     [objectThree]: {name: 'Admin', subcategories: ['']},
// };

// try {
//     const message = await batchUpdates(updates);
//     console.log(message)
// } catch (e) {
//     console.log(e)
// }


const setFunction = async (info, paths) => {
    const result = await push(ref(db, `post`), info);
    const id = result.key;
    for (const path of paths) {
        await update(ref(db), {
            [`${path}/${id}`]: true,
        });
    }
}

const info={
    'Title': 'Test',
    'Content': "Test",
    'CreatedOn': new Date().toDateString(),
    'User': {
        'Test': 'Pesho'
    }
}
const paths= ['category/1/posts','category/2/posts','category/3/posts']

setFunction(info, paths);
// subcategoru/category
// posts/subcategory/
// replies/post/


