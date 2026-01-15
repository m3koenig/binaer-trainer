import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Lightbulb, LightbulbOff,Calculator, Trophy, RefreshCcw, Info, ArrowRight, Star, Smile, Gamepad2, Settings, Brain, CheckCircle, PenTool, AlertCircle, Menu } from 'lucide-react';

export default function App() {
  // Reducer for batching related state updates
  const gameReducer = (state, action) => {
    switch (action.type) {
      case 'RESET_ROUND':
        return { ...state, bits: new Array(action.payload).fill(false), score: 0, feedback: null };
      case 'RESET_BITS':
        return { ...state, bits: new Array(action.payload).fill(false) };
      case 'RESET_FEEDBACK':
        return { ...state, feedback: null };
      case 'SET_TARGET':
        return { ...state, targetNumber: action.payload };
      case 'SET_BITS':
        return { ...state, bits: action.payload };
      case 'SET_FEEDBACK':
        return { ...state, feedback: action.payload };
      case 'SET_SCORE':
        return { ...state, score: action.payload };
      default:
        return state;
    }
  };

  const initialGameState = {
    bits: new Array(4).fill(false),
    targetNumber: 0,
    score: 0,
    feedback: null,
  };

  // Anzahl der Lichter (Bits) - Standardmäßig 4
  const [numBits, setNumBits] = useState(4);
  const [difficulty, setDifficulty] = useState('normal'); // 'normal' (Lichter) oder 'hard' (Binärcode schreiben)
  const [mode, setMode] = useState('explore'); // 'explore' oder 'quiz'
  const [showExplanation, setShowExplanation] = useState(true);
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const startNewRound = useCallback((bitsCount) => {
    const maxVal = Math.pow(2, bitsCount) - 1;
    const randomNum = Math.floor(Math.random() * maxVal) + 1;
    dispatch({ type: 'SET_TARGET', payload: randomNum });
    dispatch({ type: 'RESET_BITS', payload: bitsCount });
    dispatch({ type: 'RESET_FEEDBACK' });
  }, []);

  // Wenn sich numBits ändert, Reset
  useEffect(() => {
    dispatch({ type: 'SET_SCORE', payload: 0 });
    dispatch({ type: 'RESET_FEEDBACK' });
    dispatch({ type: 'RESET_BITS', payload: numBits });
  }, [numBits]);

  useEffect(() => {
    if (mode === 'quiz') {
      startNewRound(numBits);
    }
  }, [numBits, mode, startNewRound]);

  // Wenn Schwierigkeit geändert wird, Reset im Quiz
  useEffect(() => {
    if (mode === 'quiz') {
      dispatch({ type: 'RESET_FEEDBACK' });
    }
  }, [difficulty, mode]);

  useEffect(() => {
    if (mode === 'quiz') {
      dispatch({ type: 'RESET_BITS', payload: numBits });
    }
  }, [difficulty, numBits, mode]);

  // Berechnet den aktuellen Wert
  const currentDecimal = gameState.bits.reduce((acc, isActive, index) => {
    const power = (numBits - 1) - index;
    const value = Math.pow(2, power);
    return isActive ? acc + value : acc;
  }, 0);

  // Bit umschalten
  const toggleBit = (index) => {
    const newBits = [...gameState.bits];
    newBits[index] = !newBits[index];
    dispatch({ type: 'SET_BITS', payload: newBits });
    
    // Feedback zurücksetzen bei Interaktion
    if (gameState.feedback === 'error' || gameState.feedback === 'success') {
      dispatch({ type: 'RESET_FEEDBACK' });
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    dispatch({ type: 'RESET_BITS', payload: numBits });
    dispatch({ type: 'RESET_FEEDBACK' });
    if (newMode === 'quiz') {
      startNewRound(numBits);
      dispatch({ type: 'SET_SCORE', payload: 0 });
    }
  };

  // Antwort prüfen (Automatisch im Normal-Modus, Manuell im Hard-Modus)
  useEffect(() => {
    if (mode === 'quiz' && difficulty === 'normal' && currentDecimal === gameState.targetNumber && gameState.feedback === null) {
      dispatch({ type: 'SET_FEEDBACK', payload: 'success' });
    }
  }, [currentDecimal, gameState.targetNumber, mode, difficulty, gameState.feedback]);

  // Manuelle Prüfung für den Profi-Modus
  const checkAnswer = () => {
    if (currentDecimal === gameState.targetNumber) {
      dispatch({ type: 'SET_FEEDBACK', payload: 'success' });
    } else {
      dispatch({ type: 'SET_FEEDBACK', payload: 'error' });
    }
  };

  const handleNextLevel = () => {
    dispatch({ type: 'SET_SCORE', payload: gameState.score + 1 });
    startNewRound(numBits);
  };

  // Dynamische Hintergrundfarbe
  const bgClass = difficulty === 'hard' && mode === 'quiz' 
    ? 'bg-slate-900 text-slate-100' 
    : 'bg-gradient-to-b from-sky-300 to-indigo-200 text-slate-800';

  return (
    <div className={`min-h-screen p-3 md:p-8 font-sans transition-colors duration-500 ${bgClass}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header Karte */}
        <header className={`${difficulty === 'hard' && mode === 'quiz' ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-white'} backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 mb-4 md:mb-8 border-2 md:border-4 transition-all duration-500`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="text-center md:text-left w-full md:w-auto">
              <h1 className={`text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm transition-colors ${difficulty === 'hard' && mode === 'quiz' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400' : 'text-indigo-600'}`}>
                {difficulty === 'hard' && mode === 'quiz' ? 'Binär-Profi 🧠' : 'Lichter-Zauber ✨'}
              </h1>
              <p className={`text-sm md:text-base font-medium mt-1 ${difficulty === 'hard' && mode === 'quiz' ? 'text-slate-400' : 'text-indigo-400'}`}>
                {difficulty === 'hard' && mode === 'quiz' ? 'Knacke den Code!' : 'Schalte die Lampen an!'}
              </p>
            </div>

            <div className={`flex w-full md:w-auto p-1.5 rounded-xl gap-2 justify-center ${difficulty === 'hard' && mode === 'quiz' ? 'bg-slate-900' : 'bg-indigo-100'}`}>
              <button
                onClick={() => switchMode('explore')}
                className={`flex-1 md:flex-none px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'explore' 
                    ? 'bg-white text-indigo-600 shadow-md' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Lightbulb size={16} /> Labor
              </button>
              <button
                onClick={() => switchMode('quiz')}
                className={`flex-1 md:flex-none px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'quiz' 
                    ? (difficulty === 'hard' ? 'bg-emerald-600 text-white shadow-md' : 'bg-indigo-600 text-white shadow-md')
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Gamepad2 size={16} /> Spiel
              </button>
            </div>
          </div>

          {/* Einstellungen: Bits & Schwierigkeit (Responsive Layout) */}
          <div className={`border-t pt-4 flex flex-col md:flex-row items-center justify-between gap-4 ${difficulty === 'hard' && mode === 'quiz' ? 'border-slate-700' : 'border-indigo-50'}`}>
            
            {/* Bit Wähler */}
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto justify-center">
              <span className={`font-bold text-xs uppercase flex items-center gap-2 ${difficulty === 'hard' && mode === 'quiz' ? 'text-slate-400' : 'text-indigo-400'}`}>
                <Settings size={14} /> Bits:
              </span>
              <div className="flex gap-1 justify-center">
                {[4, 5, 6, 7, 8].map(n => (
                  <button
                    key={n}
                    onClick={() => setNumBits(n)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-bold text-sm md:text-lg transition-all ${
                      numBits === n 
                        ? (difficulty === 'hard' && mode === 'quiz' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white')
                        : (difficulty === 'hard' && mode === 'quiz' ? 'bg-slate-700 text-slate-400' : 'bg-white text-indigo-300')
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Schwierigkeitsgrad Switch */}
            <div className={`flex w-full md:w-auto justify-center p-1 rounded-xl border ${difficulty === 'hard' && mode === 'quiz' ? 'bg-slate-900 border-slate-700' : 'bg-indigo-50 border-indigo-100'}`}>
               <button
                onClick={() => setDifficulty('normal')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${
                  difficulty === 'normal'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-500'
                }`}
              >
                <Lightbulb size={14} /> Einfach
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${
                  difficulty === 'hard'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-500'
                }`}
              >
                <Brain size={14} /> Profi
              </button>
            </div>
          </div>
        </header>

        {/* Quiz Bereich */}
        {mode === 'quiz' && (
          <div className={`mb-6 md:mb-8 rounded-2xl md:rounded-3xl shadow-xl border-2 md:border-4 overflow-hidden relative transition-all ${difficulty === 'hard' ? 'bg-slate-800 border-slate-700' : 'bg-white/90 backdrop-blur border-indigo-100'}`}>
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${difficulty === 'hard' ? 'from-emerald-600 to-cyan-600' : 'from-pink-400 via-purple-400 to-indigo-400'}`}></div>
            
            <div className="p-4 md:p-8 flex flex-col items-center gap-6">
              
              <div className="flex justify-between w-full items-center">
                 {/* Zielzahl */}
                <div className={`text-center px-4 py-2 md:px-8 md:py-4 rounded-xl border-2 ${difficulty === 'hard' ? 'bg-slate-900 border-slate-700' : 'bg-indigo-50 border-indigo-100'}`}>
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${difficulty === 'hard' ? 'text-slate-400' : 'text-indigo-400'}`}>Ziel</span>
                  <div className={`text-3xl md:text-5xl font-black mt-1 ${difficulty === 'hard' ? 'text-emerald-400' : 'text-indigo-600'}`}>{gameState.targetNumber}</div>
                </div>

                {/* Punkte */}
                <div className={`text-center px-4 py-2 md:px-6 md:py-4 rounded-xl border-2 ${difficulty === 'hard' ? 'bg-slate-900 border-slate-700' : 'bg-yellow-50 border-yellow-100'}`}>
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1 justify-center ${difficulty === 'hard' ? 'text-yellow-600' : 'text-yellow-600'}`}>
                    <Star size={10} fill="currentColor" /> Punkte
                  </span>
                  <div className="text-2xl md:text-3xl font-black text-yellow-500 mt-1">{gameState.score}</div>
                </div>
              </div>
              
              {/* Feedback Area */}
              <div className="w-full flex justify-center min-h-[60px]">
                {gameState.feedback === 'success' ? (
                  <div className="flex flex-col items-center animate-bounce">
                    <span className="text-green-500 font-black text-lg md:text-2xl flex items-center gap-2 text-center">
                      <Smile size={24} /> {difficulty === 'hard' ? 'Geknackt!' : 'Richtig!'}
                    </span>
                    <button 
                      onClick={handleNextLevel}
                      className="mt-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2 text-sm md:text-base"
                    >
                      Weiter <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center w-full">
                    {difficulty === 'hard' ? (
                      <div className="flex flex-col items-center gap-2">
                         <div className="text-2xl md:text-4xl font-mono text-slate-600 font-bold tracking-widest">? ? ?</div>
                         {gameState.feedback === 'error' && (
                           <span className="text-red-400 font-bold text-sm flex items-center gap-2 animate-pulse">
                             <AlertCircle size={14} /> Falsch!
                           </span>
                         )}
                         <button 
                          onClick={checkAnswer}
                          className="mt-1 bg-slate-700 active:bg-slate-600 text-slate-200 border-2 border-slate-600 px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 text-sm"
                        >
                          <CheckCircle size={16} /> Prüfen
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Aktuell</span>
                        <div className={`text-3xl md:text-4xl font-black transition-colors ${
                          currentDecimal > gameState.targetNumber ? 'text-red-400' : 'text-orange-400'
                        }`}>
                          {currentDecimal}
                        </div>
                        {currentDecimal > gameState.targetNumber && (
                          <span className="text-red-400 text-xs font-bold block mt-1">Zu viel!</span>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Die Boxen Grid - Mobile Optimized */}
        <div className={`grid ${numBits > 4 ? 'grid-cols-4 sm:grid-cols-4 md:grid-cols-8' : 'grid-cols-4'} gap-2 md:gap-4 mb-6 md:mb-8`}>
          {gameState.bits.map((isActive, index) => {
            const power = (numBits - 1) - index;
            const value = Math.pow(2, power);
            const isHard = difficulty === 'hard' && mode === 'quiz';
            
            return (
              <div key={index} className="flex flex-col items-center gap-1 md:gap-2">
                
                {/* 0/1 Indikator oben */}
                {!isHard && (
                   <div className={`text-2xl md:text-4xl font-black font-mono mb-1 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-300'}`}>
                    {isActive ? '1' : '0'}
                  </div>
                )}

                {/* Die Box Button */}
                <button
                  onClick={() => toggleBit(index)}
                  className={`
                    w-full aspect-[3/4] md:aspect-[4/5] relative rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-all duration-100 touch-manipulation
                    ${isHard 
                      ? `border-2 md:border-4 ${isActive ? 'bg-slate-800 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-slate-800 border-slate-600 text-slate-500 active:bg-slate-700'}`
                      : `border-b-4 md:border-b-8 justify-end pb-2 md:pb-4 active:border-b-0 active:translate-y-1 ${isActive ? 'bg-yellow-300 border-yellow-500 shadow-lg' : 'bg-white border-slate-200 active:bg-slate-50'}`
                    }
                  `}
                >
                  {isHard ? (
                    // Hard Mode Input
                    <>
                      <div className="text-3xl md:text-6xl font-mono font-bold tracking-tighter">
                        {isActive ? '1' : '0'}
                      </div>
                      <span className="absolute bottom-1.5 md:bottom-3 text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-40">
                         BIT {power}
                      </span>
                    </>
                  ) : (
                    // Normal Mode Bulb
                    <>
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center ${isActive ? 'scale-110' : 'scale-90 opacity-40'}`}>
                        {/* Responsive SVG Size via CSS classes inside wrapper not perfectly easy, simpler to conditional render or just use standard small size that fits mobile */}
                        <div className="w-8 h-8 md:w-16 md:h-16 flex items-center justify-center relative">
                            {isActive ? <Lightbulb className={`w-full h-full transition-colors duration-300 ${isActive ? 'text-orange-600 fill-yellow-400' : 'text-slate-400'}`} strokeWidth={1.5} /> : <LightbulbOff className={`w-full h-full transition-colors duration-300 ${isActive ? 'text-orange-600 fill-yellow-400' : 'text-slate-400'}`} strokeWidth={1.5} />}
                            {/* Light Bulb Value */}
                            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-90%] font-black tracking-tighter select-none ${isActive ? 'text-orange-900' : 'text-slate-500'} text-xs md:text-xl`}>
                            {value}
                            </span>
                        </div>
                      </div>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Erklärungs-Bereich (Responsive) */}
        {mode === 'explore' && (
          <div className="bg-white/90 backdrop-blur rounded-2xl md:rounded-3xl p-4 md:p-8 border-2 md:border-4 border-indigo-50 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex-1 w-full bg-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-indigo-100 border-dashed">
                <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold">
                  <Calculator size={18} />
                  <span className="text-xs md:text-sm uppercase tracking-wide">Rechnung:</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-lg md:text-xl font-mono font-bold">
                  {gameState.bits.map((isActive, index) => {
                    const value = Math.pow(2, (numBits - 1) - index);
                    if (!isActive && !showExplanation) return null;
                    
                    return (
                      <div key={index} className="flex items-center">
                        <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-md ${isActive ? 'bg-yellow-300 text-yellow-900' : 'text-slate-400 text-sm'}`}>
                          {isActive ? value : '0'}
                        </span>
                        {index < numBits - 1 && <span className="text-indigo-300 ml-2 font-sans">+</span>}
                      </div>
                    );
                  })}
                  <span className="text-indigo-400 mx-1">=</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-indigo-600 text-white rounded-2xl md:rounded-3xl p-4 md:p-8 w-full md:w-auto min-w-[150px] shadow-lg">
                <span className="text-indigo-200 text-[10px] md:text-xs font-bold uppercase mb-1 tracking-widest">Ergebnis</span>
                <span className="text-4xl md:text-6xl font-black drop-shadow-md">{currentDecimal}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center gap-2 md:gap-4">
               <button onClick={() => dispatch({ type: 'RESET_BITS', payload: numBits })} className="text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-3 py-2 md:px-4 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-colors flex items-center gap-2">
                <RefreshCcw size={14} /> Reset
              </button>
              <button onClick={() => setShowExplanation(!showExplanation)} className="text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-3 py-2 md:px-4 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-colors flex items-center gap-2">
                <Info size={14} /> {showExplanation ? 'Nullen weg' : 'Nullen zeigen'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}