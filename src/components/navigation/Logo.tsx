import { useNavigate } from "react-router-dom";

interface LogoProps {
  scrolled: boolean;
}

const Logo = ({ scrolled }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex items-center cursor-pointer transform hover:scale-105 transition-all duration-300" 
      onClick={() => navigate('/')}
    >
      <span className={`font-bold text-3xl tracking-tight ${
        scrolled ? 'text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark' : 'text-white'
      }`}>
        AGREGAÍ
      </span>
    </div>
  );
};

export default Logo;