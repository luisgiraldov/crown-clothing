import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//Auth firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
  // How to make use of  addCollectionAndDocuments to programatically add shop data into firebase
  // import {  addCollectionAndDocuments  } from './firebase/firebase.utils';
  //this selector brings info from redux based on the info that got from shop.data.js, that is the file that contains the shop data
  //import { selectShopCollectionsForPreview } from './redux/shop/shop.selectors';
//Redux
import { connect } from 'react-redux';

import './App.css';
import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component';
import { setCurrentUser } from './redux/user/user.actions';

//selector 
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // How to make use of  addCollectionAndDocuments to programatically add shop data into firebase
    //we destructure the collectionArray passed from mapStateToProps
    //const { collectionArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }  else {
        setCurrentUser(userAuth);
        // How to make use of  addCollectionAndDocuments to programatically add shop data into firebase
        //we send a new array off the collectionsArray, destructuring just the properties we need (title and items) from 
        //the obj that pass from each iteration, we do this to send to firestore just the properties we want
        // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({
        //   title, 
        //   items 
        // })));
      } 
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/** If there is an user redirect to home page otherwise render the SignInAndSignUpPage */}
          <Route path='/signin' render={
            () => this.props.currentUser ? 
              (<Redirect to='/' />) :
              (<SignInAndSignUpPage />)
          } />
        </Switch>
      </div>
    );
  }
}

// //connect to redux to get state
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

//connect to redux to get state by using reselect to avoid unnecesary rerenders when some state properties haven't changed
//reselect pass in the state
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// How to make use of  addCollectionAndDocuments to programatically add shop data into firebase
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   collectionsArray: selectShopCollectionsForPreview
// });

//connect to redux to modify the state
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);
