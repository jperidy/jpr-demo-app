import { db } from '../../../utils/firebase';

export async function get ({params}) {
    
    let notes = [];

    const querySnapshot = await db.collection('notes').orderBy('title').get();
    
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            notes = [...notes, {id: doc.id, ...doc.data()}];
        });
    }
    return {
        body:{
            notes
        }
    };
};