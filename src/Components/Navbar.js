import React, { useEffect } from 'react';
import '../App.css';
import logo1 from '../Assets/logo1.png';
import {useCookies} from 'react-cookie'
import { useContext } from 'react';
import UserContext from '../context/User/UserContext';
import { toast } from 'react-hot-toast';

function Navbar() {

  const [cookies , setCookies] = useCookies();
  const {user , getuser} = useContext(UserContext);

  // useEffect(()=>{
  //     getuser()
  // }, [cookies.token])

  return (
    <div>
        <nav> 
            <img src={logo1} alt="Logo image" className='navbar-logo'  height= "100px"  />
            <input type="checkbox" id="check" />
            <label for="check" className="menu-btn"> <i className="fa-solid fa-bars"></i></label> 
            <ul>
                <li> <a href="/" className="active"> Home </a> </li>
                <li> <a href="/about"> About </a> </li>
                <li> <a href="/contact"> Contact </a>  </li>
                <li><a href="#"> help </a> </li>
            </ul>

            <div className="navbar-sign">

            {/* <p> {user.length !== 0 ? `hello ${user.name}!` : ''}</p> */}

            {cookies.token === undefined ?  
            <a href='/signin' className='sign-btn' > sign Up <i className="fa-solid fa-right-to-bracket"></i>  </a> : 
            <a href='#' className='sign-btn' > Logout <i className="fa-solid fa-right-to-bracket"></i>  </a>
            }
            </div>

            {/* {console.log(cookies.token)} */}

        </nav>

    </div>
  )
}

export default Navbar