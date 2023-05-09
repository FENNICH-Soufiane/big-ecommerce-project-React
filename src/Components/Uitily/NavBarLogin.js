import React, { useState, useEffect } from 'react'
import { Navbar, Container, FormControl, Nav } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux'

import logo from '../../images/logo.png'
import login from '../../images/login.png'
import cart from '../../images/cart.png'
import { getLoggedUser } from '../../redux/actions/authAction'
import NavbarSearchHook from '../../hook/search/navbar-search-hook';
import GetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook';

const NavBarLogin = () => {

  const [ ,itemNum] = GetAllUserCartHook()

  const [OnChangeSearch, searchWord] = NavbarSearchHook()
  let word = ""
  if (localStorage.getItem('searchWord') != null)
    word = localStorage.getItem('searchWord')



  const [user, setUser] = useState('')
  // const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('user') != null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    // dispatch(getLoggedUser())
  }, [])
  // console.log(user)

  // const res = useSelector(state => state.authReducer.currentUser)
  // if(res) console.log(res)

  const logOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem("token")
    setUser('')
  }

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href='/'>
            <img src={logo} className='logo' alt='img brand' />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            value={word}
            onChange={OnChangeSearch}
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">

            {user != '' ?
              (
                <NavDropdown className='justify-content-center' title={user.name} id="basic-nav-dropdown">
                  {user.role === "admin" ?
                    (
                      <NavDropdown.Item href="/admin/allproducts">لوحة التحكم</NavDropdown.Item>
                    ) :
                    (
                      <NavDropdown.Item href="/user/profile">الصفحة الشخصية</NavDropdown.Item>
                    )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut} href="/">تسجيل الخروج</NavDropdown.Item>
                </NavDropdown>
              )
              :
              (
                <Nav.Link href='/login'
                  className="nav-text d-flex mt-3 justify-content-center">
                  <img src={login} className="login-img" alt="sfvs" />
                  <p style={{ color: "white" }}>دخول</p>
                </Nav.Link>
              )
            }

            <Nav.Link href='/cart'
              className="nav-text d-flex mt-3 justify-content-center position-relative"
              style={{ color: "white" }}>
              <img src={cart} className="login-img" alt="sfvs" />

              <p style={{ color: "white" }} >
                العربه

              </p>
              <span className="position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
                {itemNum || 0}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default NavBarLogin
