const Navbar = ({ bgClass, logo }) => {

    return ( 
        <div className={`${bgClass} grid content-center px-5 md:px-10 py-4 mb-10 md:mb-0`}>
          <img src={logo} alt="" />
        </div>
     );
}
 
export default Navbar;