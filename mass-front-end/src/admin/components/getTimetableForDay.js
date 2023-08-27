import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/configFirebase";

export const getTimetableForDay = async (day) => {
    try {
        const dayDocRef = doc(db, "timetable", day);
        const daySnapshot = await getDoc(dayDocRef);

        if (daySnapshot.exists()) {
            const modulesCollectionRef = collection(dayDocRef, "modules");
            const modulesSnapshot = await getDocs(modulesCollectionRef);

            const modules = modulesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(modules)
            return modules;
        } else {
            console.log(`No timetable found for ${day}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching timetable:", error);
        return [];
    }
};
