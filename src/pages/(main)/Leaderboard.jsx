import Leadership from "../../assets/images/leadership-bg.jpg";
import Navbar from "../../components/custom/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { Trophy, Medal, Award, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const PERIODS = [
  { id: "daily", label: "Today" },
  { id: "weekly", label: "This Week" },
  { id: "monthly", label: "This Month" },
  { id: "all-time", label: "All Time" },
];

const LeaderboardRow = ({ user, position, points, isHeader }) => {
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-6 h-6 text-blue-500" />;
    }
  };

  const baseClasses =
    "flex w-full justify-between items-center text-lg p-3 transition-all duration-200";
  const headerClasses = "bg-gray-800 text-white font-semibold rounded-lg";
  const rowClasses = "hover:bg-gray-100 border-b border-gray-100 last:border-0";

  return (
    <li className={`${baseClasses} ${isHeader ? headerClasses : rowClasses}`}>
      <div className="flex items-center gap-3 w-1/3">
        {!isHeader && getRankIcon(position)}
        <span className={`${isHeader ? "font-bold" : "font-medium"}`}>
          {/* Already masked by the server; full numbers never reach the browser. */}
          {isHeader ? "Phone Number" : user}
        </span>
      </div>
      <div className="w-1/3 text-center">
        {isHeader ? (
          "Rank"
        ) : (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
            {position}
          </span>
        )}
      </div>
      <div className="w-1/3 text-right">
        <span className={`${isHeader ? "font-bold" : "font-medium"}`}>
          {isHeader ? "Points" : points.toLocaleString()}
        </span>
      </div>
    </li>
  );
};

const Leaderboard = () => {
  const { status } = useAuth();
  const [period, setPeriod] = useState("weekly");
  const [board, setBoard] = useState({ loading: true, entries: [], error: null });
  const [standing, setStanding] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setBoard((b) => ({ ...b, loading: true, error: null }));
    api
      .leaderboard(period)
      .then((res) => !cancelled && setBoard({ loading: false, entries: res.entries, error: null }))
      .catch((err) => !cancelled && setBoard({ loading: false, entries: [], error: err.message }));
    return () => {
      cancelled = true;
    };
  }, [period]);

  useEffect(() => {
    if (status !== "authenticated") {
      setStanding(null);
      return undefined;
    }
    let cancelled = false;
    api
      .myStanding(period)
      .then((res) => !cancelled && setStanding(res))
      // Personal rank is a nice-to-have; the board itself still renders.
      .catch(() => !cancelled && setStanding(null));
    return () => {
      cancelled = true;
    };
  }, [period, status]);

  return (
    <>
      <Navbar theme={"light"} />
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <img
          src={Leadership}
          alt="Leadership background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        <Card className="w-full max-w-3xl relative bg-white/95 backdrop-blur-md shadow-2xl">
          <CardHeader className="card-header p-0 text-center rounded-t-xl ">
            <div className="space-y-2 bg-gradient-to-r from-blue-600/80 to-blue-800/80 w-full h-full rounded-tr-xl rounded-tl-xl grid place-content-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Leaderboard
              </h1>
              <p className="text-blue-100 text-lg">Top Performers</p>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Leaderboard period">
              {PERIODS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={period === p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    period === p.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {standing ? (
              <p className="text-center text-sm text-gray-600">
                {standing.rank
                  ? `You're ranked #${standing.rank} with ${standing.points.toLocaleString()} points`
                  : "You haven't scored any points in this period yet — play a quiz to get on the board!"}
              </p>
            ) : null}

            <div className="rounded-xl overflow-hidden shadow-sm">
              <ul className="divide-y divide-gray-100">
                <LeaderboardRow
                  user=""
                  position={0}
                  points=""
                  isHeader={true}
                />
                {board.loading ? (
                  <li className="flex justify-center p-6 text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin" aria-label="Loading leaderboard" />
                  </li>
                ) : board.error ? (
                  <li className="p-6 text-center text-red-600">{board.error}</li>
                ) : board.entries.length === 0 ? (
                  <li className="p-6 text-center text-gray-500">No scores yet for this period. Be the first!</li>
                ) : (
                  board.entries.map((entry) => (
                    <LeaderboardRow
                      key={entry.rank}
                      user={entry.displayMsisdn}
                      position={entry.rank}
                      points={entry.points}
                      isHeader={false}
                    />
                  ))
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Leaderboard;
