//// import Utils
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { db, signUp } from './services/firebase'

//// import Components
import Header from './Header'
import Nav from './Nav'
import Grid from './Grid'
import Registration from './Registration'
//import Offers from './offers.json'
//import Posts from './posts.json'

//// import Pages
import NewPost from './NewPost'
import Bulletinboard from './Bulletinboard'
import Home from './Home'
import OfferDetailPage from './OfferDetailPage'
import Profile from './Profile'
import FormEditOffer from './FormEditOffer'
import FormEditPost from './FormEditPost'

export default function App() {
  const user = firebase.auth().currentUser

  let savedPosts = JSON.parse(localStorage.savedPosts || null) || {}
  const [posts, setPosts] = useState(savedPosts)

  let savedOffers = JSON.parse(localStorage.savedOffers || null) || {}
  const [offers, setOffers] = useState(savedOffers)
  console.log(offers)
  console.log(posts)

  function getDataPosts() {
    db.collection('Posts')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        setPosts(data)
      })
  }
  let enddataPost = setTimeout(getDataPosts, 1000)
  clearTimeout(enddataPost)

  function getDataOffer() {
    db.collection('Offers')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        setOffers(data)
      })
  }
  let enddataOffer = setTimeout(getDataOffer, 1000)
  clearTimeout(enddataOffer)

  useEffect(() => {
    let savedPosts = posts
    savedPosts.time = new Date().getTime()
    localStorage.savedPosts = JSON.stringify(savedPosts)
  }, [posts])

  useEffect(() => {
    let savedOffers = offers
    savedOffers.time = new Date().getTime()
    localStorage.savedOffers = JSON.stringify(savedOffers)
  }, [offers])

  useEffect(() => {
    let savedOffers = offers
    savedOffers.time = new Date().getTime()
    localStorage.savedOffers = JSON.stringify(savedOffers)
  }, [offers])

  return (
    <Appcontainer>
      <Grid>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home
                offers={offers}
                posts={posts}
                toggleBookmarked={id => toggleBookmarked(id)}
              ></Home>
            </Route>
            <Route path="/pinnwand">
              <Bulletinboard posts={posts}></Bulletinboard>
            </Route>
            <Route path="/inserieren">
              <NewPost
                handleAddPost={handleAddPost}
                handleAddOffer={handleAddOffer}
              ></NewPost>
            </Route>
            <Route exact path={`/angebotdetail/:id`}>
              <OfferDetailPage
                offers={offers}
                toggleBookmarked={id => toggleBookmarked(id)}
              ></OfferDetailPage>
            </Route>
            <Route exact path={`/detailangebot/:id`}>
              <OfferDetailPage
                offers={offers}
                toggleBookmarked={id => toggleBookmarked(id)}
              ></OfferDetailPage>
            </Route>
            <Route path="/profil">
              <Profile
                offers={offers}
                posts={posts}
                handleAddUser={handleAddUser}
                handleSignUp={handleSignUp}
                toggleBookmarked={id => toggleBookmarked(id)}
                deleteOffer={id => deleteOffer(id)}
                deletePost={id => deletePost(id)}
              />
            </Route>

            <Route path="/registrieren">
              <Registration handleSignUp={handleSignUp} />
            </Route>

            <Route path="/angebotbearbeiten">
              <FormEditOffer offers={offers} updateOffer={updateOffer} />
            </Route>
            <Route path="/gesuchebearbeiten">
              <FormEditPost posts={posts} updatePost={updatePost} />
            </Route>
          </Switch>

          <Nav />
        </Router>
      </Grid>
    </Appcontainer>
  )

  function handleSignUp(name) {
    const email = document.getElementById('useremail').value
    const password = document.getElementById('userpassword').value

    if (email.length < 4) {
      alert('Bitte gebe eine EmailAdresse an.')
      return
    }
    if (password.length < 4) {
      alert('Bitte gebe ein Passwort ein.')
      return
    }
    signUp(email, password)
    setTimeout(function() {
      window.location.replace('/profil')
    }, 1500)
  }

  function handleAddPost(addPost) {
    setPosts([addPost, ...posts])
    db.collection('Posts')
      .add(addPost)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  }

  function handleAddOffer(addOffer) {
    setOffers([addOffer, ...offers])
    db.collection('Offers')
      .add(addOffer)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  }

  function updateOffer(updatedOffer) {
    const index = offers.findIndex(el => el.id === updatedOffer.id)
    setOffers([
      ...offers.slice(0, index),
      { ...updatedOffer },
      ...offers.slice(index + 1)
    ])

    db.collection('Offers')
      .where('id', '==', updatedOffer.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('Offers')
            .doc(doc.id)
            .update(updatedOffer)
        })
      })
  }
  function deleteOffer(id) {
    const index = offers.findIndex(el => el.id === id)

    setOffers([...offers.slice(0, index), ...offers.slice(index + 1)])
    db.collection('Offers')
      .where('id', '==', id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('Offers')
            .doc(doc.id)
            .delete()
            .then(function() {
              console.log('Document successfully deleted!')
            })
            .catch(function(error) {
              console.error('Error removing document: ', error)
            })
        })
      })
  }

  function updatePost(updatedPost) {
    const index = posts.findIndex(el => el.id === updatedPost.id)

    setPosts([
      ...posts.slice(0, index),
      { ...updatedPost },
      ...posts.slice(index + 1)
    ])

    db.collection('Posts')
      .where('id', '==', updatedPost.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('Posts')
            .doc(doc.id)
            .update(updatedPost)
        })
      })
  }

  function deletePost(id) {
    const index = posts.findIndex(el => el.id === id)

    setPosts([...posts.slice(0, index), ...posts.slice(index + 1)])
    db.collection('Posts')
      .where('id', '==', id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('Posts')
            .doc(doc.id)
            .delete()
            .then(function() {
              console.log('Document successfully deleted!')
            })
            .catch(function(error) {
              console.error('Error removing document: ', error)
            })
        })
      })
  }

  function handleAddUser(email, password, name, phonenumber) {
    db.collection('users')
      .add({
        name: name,
        email: email,
        phonenumber: phonenumber,
        password: password
      })
      .then(function(dataUser) {
        console.log('Document written with ID: ', dataUser.id)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  }

  function toggleBookmarked(id) {
    const index = offers.findIndex(el => el.id === id)
    const offer = offers[index]
    setOffers([
      ...offers.slice(0, index),
      { ...offer, isBookmarked: !offer.isBookmarked },
      ...offers.slice(index + 1)
    ])

    db.collection('Offers')
      .where('id', '==', id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('Offers')
            .doc(doc.id)
            .update({
              isBookmarked: [offer.isBookmarked, user && user.uid]
            })
          console.log(offer.isBookmarked)
        })
      })
    let enddataOffer = setTimeout(getDataOffer, 1000)
    clearTimeout(enddataOffer)
  }
}

const Appcontainer = styled.div`
  height: 100vh;
`
