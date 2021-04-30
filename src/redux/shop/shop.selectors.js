import { createSelector } from 'reselect';
//memoize using lodash
import memoize from 'lodash.memoize';

//we need this object because our url is a string, example hats, sneakers, etc. 
//And the id we want to match (from shop.data.js) is a number, so we write this map where the string value goes to the id value (number)
//
const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
};

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

//it receives the url parameter to search into the collections (e.g. hats, sneakers)
export const selectShopCollection = memoize(collectionUrlParam => 
    createSelector(
        [selectShopCollections],
        collections => 
            collections.find( collection => 
                collection.id === COLLECTION_ID_MAP[collectionUrlParam]
            )
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