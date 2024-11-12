import Leadership from "../../assets/images/leadership-bg.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import React from "react";

// Masking function
const maskNumber = (number) => {
  const str = number.toString();
  // Mask everything except the first 3 digits and last 4 digits
  return str.length > 7
    ? str.slice(0, 3) + "***" + str.slice(-4)
    : str;
};

const Leaderboard = () => {
  const Leaders = [
    { id: 1, user: "07081732019", position: 1, points: "50,000" },
    { id: 2, user: "07081732019", position: 2, points: "50,000" },
    { id: 3, user: "07081732019", position: 3, points: "50,000" },
    { id: 4, user: "07081732019", position: 4, points: "50,000" },
    { id: 5, user: "07081732019", position: 5, points: "50,000" },
    { id: 6, user: "07081732019", position: 6, points: "50,000" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <img
        src={Leadership}
        className="absolute bottom-0 left-0 right-0 h-full w-full"
      />

      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm relative">
        <CardHeader className="card-header rounded-tr-xl rounded-tl-xl p-0">
          <div className="bg-black/50 w-full h-full rounded-tr-xl rounded-tl-xl grid place-content-center">
            <h1 className="text-[64px] font-bold text-white">Leaderboard</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 mt-7 max-h-[300px] overflow-hidden w-full">
          <ul className="w-full">
            <li className="flex w-full justify-between items-center text-[21px] text-black rounded bg-gray-300 p-2 mb-2">
              <p>Phone number</p>
              <p>Rank</p>
              <p>Points</p>
            </li>
            {Leaders.map((list, i) => (
              <li
                key={i}
                id={list.id}
                className="flex w-full justify-between items-center text-[21px] text-black p-2 px-3"
              >
                <p>{maskNumber(list.user)}</p>
                <p className="ml-3">{list.position}</p>
                <p>{list.points}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;