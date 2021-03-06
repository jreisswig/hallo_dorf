// import utils
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components/macro'

// import images
import ArrowBack from '../images/arrow_back_ios.svg'
import HalloDorf from '../images/HalloDorf Logo.png'

export default function Header() {
  let pagetitle
  let icon
  let style

  const { pathname } = useLocation()

  function checkPath(currentpath) {
    return pathname.includes(currentpath)
  }

  switch (true) {
    case checkPath('/pinnwand'):
      pagetitle = 'Pinnwand'

      break
    case checkPath('/inserieren'):
      pagetitle = 'Inserieren'

      break
    case checkPath('/profil'):
      pagetitle = 'Profil'

      break
    case checkPath('/angebotdetail'):
      pagetitle = 'Angebot'

      icon = (
        <Link to="/">
          <img src={ArrowBack} alt="ArrowBack" height="20px" width="20px"></img>
        </Link>
      )
      break
    case checkPath('/detailangebot'):
      pagetitle = 'Angebot'

      icon = (
        <Link to="/profil">
          <img src={ArrowBack} alt="ArrowBack" height="20px" width="20px"></img>
        </Link>
      )
      break

    case checkPath('/settings'):
      pagetitle = 'settings'

      break
    case checkPath('/angebotbearbeiten'):
      pagetitle = 'Angebot bearbeiten'

      icon = (
        <Link to="/profil">
          <img src={ArrowBack} alt="ArrowBack" height="20px" width="20px"></img>
        </Link>
      )
      break
    case checkPath('/gesuchebearbeiten'):
      pagetitle = 'Gesuch bearbeiten'
      icon = (
        <Link to="/profil">
          <img src={ArrowBack} alt="ArrowBack" height="20px" width="20px"></img>
        </Link>
      )
      break
    case checkPath('/registrieren'):
      pagetitle = 'Registrieren'
      icon = (
        <Link to="/login">
          <img src={ArrowBack} alt="ArrowBack" height="20px" width="20px"></img>
        </Link>
      )
      break

    case checkPath('/'):
      pagetitle = (
        <img
          src={HalloDorf}
          alt="HalloDorfLogo"
          height="35px"
          width="105px"
          style={{
            objectFit: 'contain'
          }}
        ></img>
      )
      style = { marginTop: '5px' }
      break
    default:
      pagetitle = ''
  }

  return (
    <HeaderStyled>
      <Left>{icon}</Left>
      <HeaderTitle style={style}>{pagetitle}</HeaderTitle>

      <Right />
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 40px auto 40px;
  background: white;
  box-shadow: 0 2px 2px #f0efef;
  height: 48px;
  z-index: 1;

  transition-timing-function: ease;
  transition: 0.8s;
  &.headerHidden {
    transition-timing-function: ease;
    transition: 1.5s;
    transform: translateY(-130%);
  }
`

const Left = styled.div`
  margin-left: 26px;
  margin-top: 15px;
`
const HeaderTitle = styled.h1`
  margin: 12px auto 0 auto;
  height: 40px;
  font-size: 1.5rem;
`
const Right = styled.div``
