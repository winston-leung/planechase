import './header.css';


const Header = () => {

  return (
    <div className="header">
      {/* <h1 className='header_title'>Planechase</h1> */}
      <div className='header_links'>
        <a href="/" >Home</a>
        <div className='vertical_line' />
        <a href="/game" >Start</a>
        <div className='vertical_line' />
        <a href="/planes" >Planes</a>
      </div>
    </div>
  )
}

export default Header;