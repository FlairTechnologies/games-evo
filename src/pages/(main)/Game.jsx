import QuizNavigation from "../../components/custom/Quiz/QuizNavigation";
import QuizOptions from "../../components/custom/Quiz/QuizOptions";
import QuizProgress from "../../components/custom/Quiz/QuizProgress";
import QuizResults from "../../components/custom/Quiz/QuizResults";
import QuizTimer from "../../components/custom/Quiz/QuizTimer";
import Loader from "../../components/custom/loader";
import Navbar from "../../components/custom/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import useCustomToast from "../../hooks/use-custom-toast";
import { api } from "../../lib/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SKIP_OPTION_ID = "skip";
const TICK_MS = 250;

const QuizLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-red-100/40 blur-2xl" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-96 bg-gradient-to-t from-pink-200/50 via-pink-100/30 to-transparent" />
          <div className="h-32 bg-gradient-to-t from-red-900/10 to-transparent" />
        </div>
      </div>
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl transform transition-all duration-300 hover:shadow-lg bg-white/95 backdrop-blur-md relative border-0 shadow-xl">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-50/50 via-white/80 to-pink-50/50" />
          <div className="relative">{children}</div>
        </Card>
      </div>
    </div>
  );
};

/** Seconds left on the server's deadline, corrected for the gap between our clock and the server's. */
function secondsRemaining(deadlineAt, clockOffsetMs) {
  const msLeft = new Date(deadlineAt).getTime() - (Date.now() + clockOffsetMs);
  return Math.max(0, Math.ceil(msLeft / 1000));
}

const offsetFrom = (game) => new Date(game.serverTime).getTime() - Date.now();

/**
 * The server owns the game: it chooses questions, holds the answers, enforces
 * deadlines and scores. This screen only renders the current question, counts
 * down to the server deadline and submits the player's choice.
 */
const QuizGame = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useCustomToast();

  const initial = location.state?.game?.id === gameId ? location.state.game : null;
  const [game, setGame] = useState(initial);
  const [clockOffsetMs, setClockOffsetMs] = useState(() => (initial ? offsetFrom(initial) : 0));
  const [selected, setSelected] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  // Positions already auto-submitted on timeout, so the timer can't double-fire.
  const timedOutPositions = useRef(new Set());

  const applyGame = useCallback((next) => {
    setGame(next);
    setClockOffsetMs(offsetFrom(next));
    setSelected(null);
  }, []);

  const reload = useCallback(async () => {
    try {
      applyGame(await api.getGame(gameId));
    } catch (err) {
      toast({ variant: "error", title: "Game unavailable", description: err.message });
      navigate("/start-quiz", { replace: true });
    }
    // toast is recreated each render; excluding it avoids refetch loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, applyGame, navigate]);

  useEffect(() => {
    if (!initial) void reload();
    // Only on mount / when the game id changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  const question = game?.status === "ACTIVE" ? game.currentQuestion : null;

  const submit = useCallback(
    async (optionId) => {
      if (!question || isSubmitting) return;
      setIsSubmitting(true);
      try {
        const { answer, game: next } = await api.submitAnswer(gameId, question.position, optionId);
        if (answer.timedOut && optionId) {
          toast({ variant: "warning", title: "Time's up!", description: "That answer arrived after the timer ran out." });
        }
        applyGame(next);
      } catch (err) {
        if (err.code === "GAME_BUSY") return; // the earlier submission is still being handled
        if (["ANSWER_OUT_OF_ORDER", "GAME_NOT_ACTIVE"].includes(err.code)) {
          await reload();
          return;
        }
        toast({ variant: "error", title: "Couldn't submit answer", description: err.message });
      } finally {
        setIsSubmitting(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameId, question, isSubmitting, applyGame, reload],
  );

  // Countdown derived from the server deadline. When it hits zero we submit a
  // skip; the server would record the question as timed out regardless.
  useEffect(() => {
    if (!question) return undefined;
    const tick = () => {
      const left = secondsRemaining(question.deadlineAt, clockOffsetMs);
      setTimeLeft(left);
      if (left === 0 && !timedOutPositions.current.has(question.position)) {
        timedOutPositions.current.add(question.position);
        void submit(null);
      }
    };
    tick();
    const timer = setInterval(tick, TICK_MS);
    return () => clearInterval(timer);
  }, [question, clockOffsetMs, submit]);

  if (!game) return <Loader />;

  if (game.status !== "ACTIVE" && game.result) {
    return (
      <>
        <Navbar theme="dark" />
        <QuizResults
          score={game.result.score}
          maxScore={game.result.maxScore}
          correctCount={game.result.correctCount}
          questionCount={game.result.questionCount}
          expired={game.status === "EXPIRED"}
          onPlayAgain={() => navigate("/start-quiz")}
          onViewLeaderboard={() => navigate("/leaderboard")}
        />
      </>
    );
  }

  if (!question) return <Loader />;

  const options = [
    ...question.options,
    ...(game.rules.allowSkip ? [{ id: SKIP_OPTION_ID, label: "Skip" }] : []),
  ];
  const isLast = question.position === game.rules.questionCount - 1;

  return (
    <QuizLayout>
      <CardHeader className="relative z-10">
        <div className="w-full flex items-center justify-between mb-4">
          <QuizProgress total={game.rules.questionCount} current={question.position} />
          <QuizTimer timeLeft={timeLeft} duration={game.rules.secondsPerQuestion} />
        </div>

        <CardTitle className="text-2xl font-bold text-center">{question.prompt}</CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6 mt-7">
        <QuizOptions
          options={options}
          selectedAnswer={selected}
          onAnswerSelect={(id) => !isSubmitting && setSelected(id)}
        />

        <QuizNavigation
          onNext={() => submit(selected === SKIP_OPTION_ID ? null : selected)}
          disabled={!selected || isSubmitting || timeLeft === 0}
          isLast={isLast}
          isSubmitting={isSubmitting}
        />
      </CardContent>
    </QuizLayout>
  );
};

export default QuizGame;
