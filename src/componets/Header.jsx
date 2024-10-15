import { faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import  Container  from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import  Navbar  from "react-bootstrap/Navbar"



function Header() {
  return (
    <>
       <Navbar className="bg-transparent">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand className='text-warning fs-3'>
            <FontAwesomeIcon icon={faVideo} beatFade className='me-3y' />
             {' '}
             Media player
          
            </Navbar.Brand>
          </Link>
        </Container>
        
      </Navbar>
      <hr />
    </>
  )
}

export default Header
