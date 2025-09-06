import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signup");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          {/* GDGC Logo */}
          <div className="relative">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-white text-2xl font-bold">G</div>
              </div>
              <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center shadow-lg -ml-2">
                <div className="text-white text-2xl font-bold">D</div>
              </div>
              <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center shadow-lg -ml-2">
                <div className="text-white text-2xl font-bold">G</div>
              </div>
              <div className="w-16 h-16 bg-purple rounded-2xl flex items-center justify-center shadow-lg -ml-2">
                <div className="text-white text-2xl font-bold">C</div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">GDGC NITJ</h1>
      </div>
    </div>
  );
};

export default SplashScreen;