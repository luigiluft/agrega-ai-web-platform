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
      <img 
        src="/lovable-uploads/25ca2603-e3be-4cea-9ca8-54050f619e24.png"
        alt="Agregaí"
        className={`h-48 ${scrolled ? 'brightness-75' : 'brightness-100'} transition-all duration-300`}
      />
    </div>
  );
};

export default Logo;