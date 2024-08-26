import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext';
import logo from '../../assets/images/freshcart-logo.svg'
export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  let { userToken, setUserToken } = useContext(AuthContext)
  // console.log(userToken);

  const navigate = useNavigate()

  function signOut() {
    setUserToken(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>

      <header className="bg-gray-300 absolute w-full z-50">
        <nav className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className='flex items-center'>
              <div className="text-white font-bold text-xl me-2 ">
                <img src={logo} width={120} alt="" />
              </div>
              {userToken && <div className="hidden md:block">
                <ul className="flex items-center space-x-1">
                  <li><NavLink to={'/'} className="block px-2 py-2">Home</NavLink></li>
                  <li><NavLink to={'/products'} className="block px-2 py-2">Products</NavLink></li>
                  <li><NavLink to={'/categories'} className="block px-2 py-2">Categories</NavLink></li>
                  <li><NavLink to={'/brands'} className="block px-2 py-2">Brands</NavLink></li>
                  <li><NavLink to={'/cart'} className="block px-2 py-2">Cart</NavLink></li>
                </ul>
              </div>}

              <div className="md:hidden me-2 mt-2">
                <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
                  <svg className="w-6 h-6" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className='flex items-center gap-2'>

              <div className='social-media flex gap-2'>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-tiktok"></i>
              </div>


              <div>
                <ul className="flex items-center mx-1">
                  {!userToken && <>
                    <li><NavLink to={'/login'} className="block px-2 py-2">Login</NavLink></li>
                    <li><NavLink to={'/register'} className="block px-2 py-2">Register</NavLink></li>
                  </>}
                  {userToken && <li><button onClick={signOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    <p className='text-xs'>SignOut</p>
                  </button></li>}
                </ul>
              </div>
            </div>

          </div>
          {userToken && <div className={isOpen ? "mobile-menu  md:hidden" : "mobile-menu  md:hidden hidden"}>
            <ul className="mt-4 space-y-4">
              <li><NavLink to={'/'} className="block px-2 py-2">Home</NavLink></li>
              <li><NavLink to={'/products'} className="block px-2 py-2">Products</NavLink></li>
              <li><NavLink to={'/categories'} className="block px-2 py-2">Categories</NavLink></li>
              <li><NavLink to={'/brands'} className="block px-2 py-2">Brands</NavLink></li>
              <li><NavLink to={'/cart'} className="block px-2 py-2">Cart</NavLink></li>
            </ul>
          </div>}

        </nav>
      </header>
    </>
  )
}
