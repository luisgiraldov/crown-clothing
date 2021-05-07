import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
 
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

//firebase
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const ShopPage = ({ match, updateCollections }) => {
    const unsubscribeFromSnapshot = null;

    useEffect(() => {
        //brings the collections from firestore
        const collectionRef = firestore.collection('collections');

        //verify if the collectionRef exist and convert them into an object and then update the collections inside redux
        collectionRef.onSnapshot( async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
        });
    }, [updateCollections]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
    );
}

//Using match.path makes it more flexible to reuse instead of hardcode the path to /shop
// const ShopPage = ({ match }) => (
//     <div className="shop-page">
//         <Route exact path={`${match.path}`} component={CollectionsOverview} />
//         <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
// );

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
});



export default connect(null, mapDispatchToProps)(ShopPage);