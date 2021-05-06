import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//importing firebase api key
import Config from './Api_Key';

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
};

//Create a collection into firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    //We create a batch to make sure all the calls were made and all the documents were created
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        //randomly generates a unique id for each obj, if you pass something inside the parenthesis, 
        //it will use that as id, instead of the random id.
        //this becomes the key(id) on firestore
        const newDocRef = collectionRef.doc();

        batch.set(newDocRef, obj);
    });

    //this will fire off our batch request, and it returns a promise, if it success it will resolve a void value(null)
    return await batch.commit()
};

firebase.initializeApp(Config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;