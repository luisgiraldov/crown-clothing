import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
 
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
//HOC for loading animation
import WithSpinner from '../../components/with-spinner/with-spiner.component';

//firebase
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

//HOC for loading animation
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {
    const unsubscribeFromSnapshot = null;

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        //brings the collections from firestore
        const collectionRef = firestore.collection('collections');

        //verify if the collectionRef exist and convert them into an object and then update the collections inside redux
        // collectionRef.onSnapshot( async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     setLoading(false);
        // });

        //We are going to use a promise based function instead of the function above (it is firebase' function as well)
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            setLoading(false);
        });
    }, [updateCollections]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
            <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
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