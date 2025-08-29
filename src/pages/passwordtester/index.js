import React, { useState } from "react";
import NavCard from "../../components/NavComponent";
import { Box, Card } from "@mui/material";

export default function PasswordEstimator() {
  const [years, setYears] = useState(33);
  const [guessesPerSec, setGuessesPerSec] = useState(1e7);
  const [charset, setCharset] = useState("alphanumeric");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState(null);

  const charsets = {
    alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", // 62 chars
    ascii: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:'\"|,<.>/?`~" // ~94 chars
  };

  const secPerYear = 365.25 * 24 * 3600;
  const entropyTarget = 128; // reference scale

  function classifyStrength(bits) {
    if (bits < 40) return { label: "Weak", color: "bg-red-500" };
    if (bits < 60) return { label: "Moderate", color: "bg-yellow-500" };
    if (bits < 80) return { label: "Strong", color: "bg-green-500" };
    return { label: "Very Strong", color: "bg-blue-600" };
  }

  function generatePassword() {
    const chars = charsets[charset];
    const C = chars.length;
    const requiredSpace = guessesPerSec * secPerYear * years;
    const L = Math.ceil(Math.log(requiredSpace) / Math.log(C));

    let pw = "";
    for (let i = 0; i < L; i++) {
      const randIndex = Math.floor(Math.random() * C);
      pw += chars[randIndex];
    }

    const entropyBits = L * Math.log2(C);
    const estYears = Math.pow(C, L) / guessesPerSec / secPerYear;

    setPassword(pw);
    setInfo({ length: L, entropyBits, estYears });
  }

  return (
    <>
    <Box
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          width: '100%',
          margin: 0,
          padding: 2.5,
          boxSizing: 'border-box',
        }}
      >
        <NavCard />
      </Box>
      <Card style={{margin:'10px'}}>
        <div style={{padding:'10px'}}>
             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
            <h1 className="text-xl font-bold mb-4">🔐 Password Strength Estimator</h1>

            {/* Inputs */}
            <div className="mb-4 text-left">
            <label className="block mb-2 font-medium">Years to withstand:</label>
            <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="border rounded-lg p-2 w-full mb-4"
            />

            <label className="block mb-2 font-medium">Guesses per second:</label>
            <input
                type="number"
                value={guessesPerSec}
                onChange={(e) => setGuessesPerSec(Number(e.target.value))}
                className="border rounded-lg p-2 w-full mb-4"
            />

            <label className="block mb-2 font-medium">Character set:</label>
            <select
                value={charset}
                onChange={(e) => setCharset(e.target.value)}
                className="border rounded-lg p-2 w-full"
            >
                <option value="alphanumeric">Alphanumeric (62)</option>
                <option value="ascii">Full ASCII (~94)</option>
            </select>
            </div>

            <button
            onClick={generatePassword}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            >
            Generate Password
            </button>

            {/* Output */}
            {password && info && (
            <div className="mt-6">
                <p className="font-mono text-lg break-all bg-gray-100 p-2 rounded-md">
                {password}
                </p>
                <p className="mt-3 text-sm text-gray-700">
                Length: <b>{info.length}</b> | Entropy: <b>{info.entropyBits.toFixed(2)} bits</b>
                </p>
                <p className="text-sm text-gray-700">
                Estimated crack time: <b>{info.estYears.toFixed(1)} years</b>
                </p>

                {/* Strength bar */}
                <div className="mt-3">
                {(() => {
                    const strength = classifyStrength(info.entropyBits);
                    return (
                    <div>
                        <div className="h-3 w-full bg-gray-300 rounded-lg">
                        <div className={`h-3 rounded-lg ${strength.color}`} style={{ width: "100%" }}></div>
                        </div>
                        <p className="mt-2 font-medium">Strength: {strength.label}</p>
                    </div>
                    );
                })()}
                </div>

                {/* Entropy scale toward 128 bits */}
                <div className="mt-4 text-left">
                <p className="text-sm font-medium">Entropy Progress (toward 128-bit security):</p>
                <div className="h-4 w-full bg-gray-200 rounded-lg mt-2">
                    <div
                    className="h-4 bg-purple-600 rounded-lg"
                    style={{ width: `${Math.min((info.entropyBits / entropyTarget) * 100, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                    {info.entropyBits.toFixed(2)} / {entropyTarget} bits
                </p>
                </div>
            </div>
            )}
        </div>
        </div>

        </div>
       
    </Card>
    </>
    
   
  );
}
