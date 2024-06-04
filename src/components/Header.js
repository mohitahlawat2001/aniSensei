import Logo from '../assets/wall3.png';
const Header = () => {
    return (
        <div className=' px-8 py-2 absolute bg-gradient-to-b from-blue-200 w-full z-10 ' >
            <img 
            src={Logo}
            alt="aniSensei Logo"
            className='w-12 cursor-pointer  '
            />
        </div>
    );
}

export default Header;