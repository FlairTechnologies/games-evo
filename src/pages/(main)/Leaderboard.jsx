import Leadership from "../../assets/images/leadership-bg.jpg";
import Navbar from "../../components/custom/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import React from "react";

const maskNumber = (number) => {
  const str = number.toString();
  return str.length > 7 ? str.slice(0, 3) + "***" + str.slice(-4) : str;
};

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
          {isHeader ? "Phone Number" : maskNumber(user)}
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
  const Leaders = [
    { id: 1, user: "07081732019", position: 1, points: 50000 },
    { id: 2, user: "07081732019", position: 2, points: 45000 },
    { id: 3, user: "07081732019", position: 3, points: 40000 },
    { id: 4, user: "07081732019", position: 4, points: 35000 },
    { id: 5, user: "07081732019", position: 5, points: 30000 },
    { id: 6, user: "07081732019", position: 6, points: 25000 },
  ];

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

          <CardContent className="p-6">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <ul className="divide-y divide-gray-100">
                <LeaderboardRow
                  user=""
                  position={0}
                  points=""
                  isHeader={true}
                />
                {Leaders.map((list) => (
                  <LeaderboardRow
                    key={list.id}
                    user={list.user}
                    position={list.position}
                    points={list.points}
                    isHeader={false}
                  />
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Leaderboard;
