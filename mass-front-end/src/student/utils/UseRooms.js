import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/configFirebase';
export default function UseRooms(){

    const [snapShot] = useCollection(collection(db, "rooms"))
    const rooms = snapShot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    console.log(rooms)
    return rooms
    
}