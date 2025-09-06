import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Trophy } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
}

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizCode = location.state?.quizCode || "";
  
  const [step, setStep] = useState("name"); // name, quiz, question-leaderboard, final-leaderboard
  const [displayName, setDisplayName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [fastestAnswerer, setFastestAnswerer] = useState<{name: string, time: number} | null>(null);

  // Mock quiz data
  const questions: Question[] = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
      correctAnswer: 0,
      timeLimit: 15
    },
    {
      id: 2,
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correctAnswer: 2,
      timeLimit: 15
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 2,
      timeLimit: 15
    }
  ];

  // Mock leaderboard data
  const mockLeaderboard = [
    { name: "Davis Curtis", score: 2569, avatar: "👨‍💻", country: "🇺🇸", position: 1 },
    { name: "Alena Donin", score: 1469, avatar: "👩‍🎓", country: "🇫🇷", position: 2 },
    { name: "Craig Gouse", score: 1053, avatar: "👨‍🚀", country: "🇨🇦", position: 3 },
    { name: displayName || "You", score: scores.reduce((a, b) => a + b, 0), avatar: "👤", country: "🇮🇳", position: 4 },
  ];

  useEffect(() => {
    if (step === "quiz" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer && step === "quiz") {
      // Time up, show question leaderboard
      setScores([...scores, 0]); // No points for time up
      setFastestAnswerer({ name: "Sarah M.", time: 2 }); // Mock fastest answerer
      setStep("question-leaderboard");
    }
  }, [timeLeft, showAnswer, step]);

  const handleStartQuiz = () => {
    if (!displayName.trim()) return;
    setStep("quiz");
    setTimeLeft(questions[0].timeLimit);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
    
    // Calculate score based on time and correctness
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    const timeBonus = timeLeft * 10;
    const score = isCorrect ? 100 + timeBonus : 0;
    setScores([...scores, score]);
    
    // Set fastest answerer (mock data for demo)
    const responseTime = questions[currentQuestion].timeLimit - timeLeft;
    setFastestAnswerer({ name: displayName, time: responseTime });
    
    // Show question leaderboard
    setStep("question-leaderboard");
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(questions[currentQuestion + 1].timeLimit);
      setStep("quiz");
    } else {
      setStep("final-leaderboard");
    }
  };

  if (step === "name") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold">Quiz: {quizCode}</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Enter Display Name</h2>
            <p className="text-muted-foreground">This will be shown on the leaderboard</p>
          </div>

          <div className="space-y-6">
            <Input
              placeholder="Your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-14 text-lg rounded-xl border-2"
              maxLength={20}
            />

            <Button 
              onClick={handleStartQuiz}
              disabled={!displayName.trim()}
              className="w-full h-14 text-lg font-semibold rounded-xl bg-orange hover:bg-orange/90 text-orange-foreground"
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "question-leaderboard") {
    const currentQuestionData = questions[currentQuestion];
    const currentLeaderboard = [
      { name: "Davis Curtis", score: 1800 + (currentQuestion * 200), avatar: "👨‍💻", position: 1 },
      { name: "Alena Donin", score: 1200 + (currentQuestion * 180), avatar: "👩‍🎓", position: 2 },
      { name: displayName, score: scores.reduce((a, b) => a + b, 0), avatar: "👤", position: 3 },
      { name: "Craig Gouse", score: 800 + (currentQuestion * 150), avatar: "👨‍🚀", position: 4 },
    ].sort((a, b) => b.score - a.score).map((player, index) => ({ ...player, position: index + 1 }));

    return (
      <div className="min-h-screen bg-green flex flex-col p-6">
        <div className="text-center mb-6 text-white">
          <h1 className="text-xl font-bold mb-2">Question {currentQuestion + 1} Results</h1>
          <div className="bg-orange text-orange-foreground px-4 py-2 rounded-full inline-block mb-4">
            Correct Answer: {String.fromCharCode(65 + currentQuestionData.correctAnswer)}. {currentQuestionData.options[currentQuestionData.correctAnswer]}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="text-center mb-4">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-orange" />
            <h2 className="font-bold text-lg">Fastest Answer</h2>
            <div className="text-sm text-muted-foreground">
              {fastestAnswerer?.name} - {fastestAnswerer?.time}s
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-white font-bold text-lg text-center">Current Leaderboard</h3>
          {currentLeaderboard.map((player) => (
            <Card key={player.name} className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold w-8">{player.position}</span>
                  <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center text-xl">
                    {player.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{player.name}</div>
                    <div className="text-muted-foreground text-sm">{player.score} points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          onClick={handleNextQuestion}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-orange hover:bg-orange/90 text-orange-foreground"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "View Final Results"}
        </Button>
      </div>
    );
  }

  if (step === "final-leaderboard") {
    return (
      <div className="min-h-screen bg-green flex flex-col p-6">
        <div className="flex items-center justify-between mb-6 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Leaderboard</h1>
          <div></div>
        </div>

        <div className="text-center mb-6">
          <div className="bg-orange text-orange-foreground px-4 py-2 rounded-full inline-block mb-4">
            #4 You are doing better than 60% of other players!
          </div>
          <div className="text-white text-sm">06d 23h 00m</div>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center mb-6 relative">
          {/* 2nd place */}
          <div className="text-center mr-4">
            <div className="w-16 h-16 bg-pink rounded-full mb-2 flex items-center justify-center text-2xl">
              👩‍🎓
            </div>
            <div className="text-white font-bold">Alena Donin</div>
            <div className="text-white text-sm">1,469 GP</div>
            <div className="w-16 h-20 bg-green-600 rounded-t-lg flex items-center justify-center text-white text-2xl font-bold">
              2
            </div>
          </div>

          {/* 1st place */}
          <div className="text-center mx-4">
            <div className="w-20 h-20 bg-blue rounded-full mb-2 flex items-center justify-center text-2xl border-4 border-yellow">
              👨‍💻
            </div>
            <div className="text-white font-bold">Davis Curtis</div>
            <div className="text-white text-sm">2,569 GP</div>
            <div className="w-20 h-24 bg-green-600 rounded-t-lg flex items-center justify-center text-white text-3xl font-bold">
              1
            </div>
          </div>

          {/* 3rd place */}
          <div className="text-center ml-4">
            <div className="w-16 h-16 bg-orange rounded-full mb-2 flex items-center justify-center text-2xl">
              👨‍🚀
            </div>
            <div className="text-white font-bold">Craig Gouse</div>
            <div className="text-white text-sm">1,053 GP</div>
            <div className="w-16 h-16 bg-green-600 rounded-t-lg flex items-center justify-center text-white text-2xl font-bold">
              3
            </div>
          </div>
        </div>

        {/* Your position */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">4</span>
              <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div className="flex-1">
                <div className="font-bold">{displayName}</div>
                <div className="text-muted-foreground text-sm">{scores.reduce((a, b) => a + b, 0)} points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={() => navigate("/home")}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-orange hover:bg-orange/90 text-orange-foreground"
        >
          Continue
        </Button>
      </div>
    );
  }

  // Quiz question view
  const question = questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span className="font-bold text-lg">{timeLeft}s</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          <div className="text-center mt-2 text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showAnswer}
                  variant="outline"
                  className={`w-full h-14 text-left p-4 justify-start text-wrap ${
                    showAnswer
                      ? index === question.correctAnswer
                        ? "bg-green text-green-foreground border-green"
                        : selectedAnswer === index
                        ? "bg-destructive text-destructive-foreground border-destructive"
                        : ""
                      : selectedAnswer === index
                      ? "bg-orange text-orange-foreground border-orange"
                      : ""
                  }`}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Quiz;