//This is a HOC
//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { compose } from 'react-redux';

import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collection-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

//Here we use connect (HOC) to connect to redux the component passed to CollectionOverviewContainer, and at the same time use WithSpinner (HOC) with the same component that is passed
//We use compose to curry all the HOC so it would be more readable
//instead of this
// const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
//we do this
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);
//compose elaborates from right to left

export default CollectionOverviewContainer;