import CivicPulse from '../assets/civicpulse_logo.png'

const Navbar = () => {
  return (
    <nav className="w-full h-25 flex items-center px-6 shadow-sm bg-white">
      <img
        src={CivicPulse}
        alt="CivicPulse Logo"
        className="h-25 w-auto object-contain cursor-pointer"
      />
    </nav>
  )
}

export default Navbar
