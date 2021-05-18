import { createSelector } from 'reselect';
//memoize using lodash
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

//returns a boolean value because of the !!, to check if it is a truthy value
export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)

export const selectIsCollectionFetching = createSelector(
    [selectShop], 
    shop => shop.isFetching
);

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

//convert the collections object into an array
export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => 
        collections ? Object.keys(collections).map(key => collections[key]) : []
    );

//it receives the url parameter to search into the collections (e.g. hats, sneakers)
export const selectShopCollection = memoize(collectionUrlParam => 
    createSelector(
        [selectShopCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
    )
); //end memoize
/**
 * our selectShopCollection function we just wrote is not memoized 
 * due to collectionUrlParam being passed in from our 
 * collection component's mapStateToProps running whenever our state changes 
 * and and calling a new instance of our selectShopCollection function. In this 
 * case collectionUrlParam is a dynamic argument meaning it can change, 
 * so to memoize selectCollection we actually have to memoize the
 * whole function using a memoize helper function. We can 
 * leverage the lodash library, specifically their memoize helper function
 * 
 * Memoize does the same idea of memoization as 
 * reselect does for our selectors, except this time we're 
 * memoizing the return of our function which returns our selector:
 * createSelector inside selectShopCollection
 * 
 * by wrapping the selectShopCollection we're saying that whenever 
 * this function gets called and receives collectionUrlParam, I want 
 * to memoize the return of this function (in this case we return a selector). 
 * If this function gets called again with the same collectionUrlParam, 
 * don't rerun this function because we'll return the 
 * same value as last time, which we've memoized so just return 
 * the selector that's been stored.
 */

