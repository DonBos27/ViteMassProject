import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/configFirebase';
export default function useChats(user){
    const [snapShot] = useCollection(
        query(collection(db, `usersChat/${user.uid}/chats`), orderBy('timestamp', 
        'desc')));
    const chats = snapShot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    
    return chats
}