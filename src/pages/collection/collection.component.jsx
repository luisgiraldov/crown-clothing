import React from 'react';

//redux
import { connect } from 'react-redux';
import { selectShopCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

//Styles
import {
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
} from './collection.styles';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
      <CollectionPageContainer>
        <CollectionTitle>{title}</CollectionTitle>
        <CollectionItemsContainer>
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </CollectionItemsContainer>
      </CollectionPageContainer>
    );
};

//The ownProps gives us all the props that has been passed to the CollectionPage component
//match is being passed through shop component (Route from react-router-dom)
const mapStateToProps = (state, ownProps) => {
    //it is necessary to pass state to the selectShopCollection because unlike
    //other selectors, this selector needs a part of the state depending on the URL parameter
    return (
        {
            collection: selectShopCollection(ownProps.match.params.collectionId)(state)
        }
    );   
};

export default connect(mapStateToProps)(CollectionPage);