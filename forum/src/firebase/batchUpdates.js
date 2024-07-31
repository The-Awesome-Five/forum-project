import { db } from './config.js'
import { ref, update } from 'firebase/database';

export const batchUpdates = async (updates) => {

        try {
            // Perform the multi-path update
            await update(ref(db), updates);
            console.log("Batch update successful");
        } catch (error) {
            console.error("Batch update failed:", error);
        }

}

