import { db } from '../../utils/firebase';

export async function get ({params}) {
    
    let projects = [];

    const querySnapshot = await db.collection('projet').orderBy('name').get();
    
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            projects = [...projects, {id: doc.id, ...doc.data()}];
        });
    }
    return {
        body:{
            projects
        }
    };
};