import ShopActionTypes from './shop.types';

//firebase
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

//if redux-thunk middleware is enabled, anytime you attempt to dispatch a function instead of an object, the middleware 
//will call that function with dispatch method itself as the first argument
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        //brings the collections from firestore
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        //We are going to use a promise based function (it is firebase' function as well)
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    };
};

