import {batchUpdates} from "./batchUpdates.js";

const categoryOneId = 1;
const categoryTwoId = 2;

const objectOne = `category/${categoryOneId}`;
const objectTwo = `category/${categoryTwoId}`;

const updates = {
    // Creating new data
    [objectOne]: {name: 'Information', subcategories: []},
    [objectTwo]: {name: 'PC Gaming', subcategories: []},
};

try {
    const message = await batchUpdates(updates);
    console.log(message)
} catch (e) {
    console.log(e)
}

// subcategoru/category
// posts/subcategory/
// replies/post/


