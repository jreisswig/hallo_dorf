import React, { useState } from 'react'
import Nav from './Nav'
import Grid from './Grid'
import NewPost from './NewPost'
import Bulletinboard from './Bulletinboard'
import Home from './Home'
import OfferDetailList from './OfferDetailList'
import Header from './Header'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'
//import postData from './posts.json'
import offersData from './offers.json'

export default function App() {
  let savedData = JSON.parse(localStorage.savedData || null) || {}
  const [posts, setPosts] = useState(savedData)
  saveData(posts)

  const [offers, setOffers] = useState(offersData)
  const [selectedOffer, setSelectedOffer] = useState(offers[0])

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
                handleOfferClick={index => handleOfferClick(index)}
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
            <Route path="/angebotdetail">
              <OfferDetailList
                title={selectedOffer.title}
                description={selectedOffer.description}
                name={selectedOffer.name}
                phonenumber={selectedOffer.phonenumber}
                email={selectedOffer.email}
              ></OfferDetailList>
            </Route>

            <Route path="/profil">
              <h2>Profilseite</h2>
            </Route>
          </Switch>

          <Nav />
        </Router>
      </Grid>
    </Appcontainer>
  )

  function saveData(posts) {
    savedData = posts
    savedData.time = new Date().getTime()
    localStorage.savedData = JSON.stringify(savedData)
  }

  function handleAddPost(addPost) {
    setPosts([addPost, ...posts])
  }

  function handleAddOffer(addOffer) {
    setOffers([addOffer, ...offers])
  }

  function handleOfferClick(index) {
    setSelectedOffer(offers[index])
  }
}
const Appcontainer = styled.div`
  height: 100vh;
`
