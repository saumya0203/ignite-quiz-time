import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const navigate = useNavigate();

  // Placeholder avatars - will be updated when user shares avatar screenshots
  const avatars = [
    { id: 0, color: "bg-purple", emoji: "👤" },
    { id: 1, color: "bg-blue", emoji: "🧑‍💻" },
    { id: 2, color: "bg-green", emoji: "👩‍🎓" },
    { id: 3, color: "bg-orange", emoji: "🧑‍🚀" },
    { id: 4, color: "bg-pink", emoji: "👩‍🎨" },
    { id: 5, color: "bg-yellow", emoji: "🧑‍🏫" },
  ];

  const handleContinue = () => {
    localStorage.setItem("selectedAvatar", selectedAvatar.toString());
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Choose Avatar</h1>
          <p className="text-muted-foreground">Select your profile picture</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`w-20 h-20 rounded-full ${avatar.color} flex items-center justify-center text-2xl border-4 transition-all ${
                selectedAvatar === avatar.id 
                  ? "border-orange scale-110" 
                  : "border-transparent"
              }`}
            >
              {avatar.emoji}
            </button>
          ))}
        </div>

        <Button 
          onClick={handleContinue}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-orange hover:bg-orange/90 text-orange-foreground"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AvatarSelection;