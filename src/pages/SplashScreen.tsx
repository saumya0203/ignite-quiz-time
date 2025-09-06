import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signup");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {/* GDGC Logo */}
          <div className="flex">
            <div className="w-8 h-8 bg-blue rounded-l-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <div className="w-8 h-8 bg-orange rounded-r-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform -rotate-45"></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">GDGC NITJ</h1>
      </div>
    </div>
  );
};

export default SplashScreen;