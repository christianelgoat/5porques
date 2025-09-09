import React, { useState, useEffect } from 'react';
import type { InfographicStepData } from './types';
import { InfographicStep } from './components/InfographicStep';
import { ChevronRight, RotateCcw } from './components/Icons';

const stepsData: InfographicStepData[] = [
  {
    id: 1,
    why: "¿Por qué?",
    because: "Porque no usan la tecnología para apoyarse al momento de gestionar su inventario.",
  },
  {
    id: 2,
    why: "¿Por qué?",
    because: "Porque supone un gran cambio comparado a la manera en la que se acostumbraron de gestionar su inventario.",
  },
  {
    id: 3,
    why: "¿Por qué?",
    because: "Porque es costoso en cuanto a tiempo y dinero, el capacitar al personal.",
  },
  {
    id: 4,
    why: "¿Por qué?",
    because: "Porque es una tecnología compleja para aprender a usarse.",
  },
  {
    id: 5,
    why: "¿Por qué?",
    because: "Porque es una tecnología moderna (nueva).",
  },
];

const App: React.FC = () => {
  const [revealedStep, setRevealedStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleRevealNext = () => {
    if (revealedStep < stepsData.length && !isAnimating) {
      setIsAnimating(true);
      setRevealedStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    if (!isAnimating) {
        setIsAnimating(true);
        setRevealedStep(0);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const isComplete = revealedStep >= stepsData.length;

  return (
    <div className="min-h-screen bg-stone-100 text-slate-800 font-sans flex flex-col items-center p-4 sm:p-8">
      <main className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-700 mb-2">
            Gestión Ineficiente del Inventario
          </h1>
          <p className="text-lg sm:text-xl text-slate-500">
            Un análisis de causa raíz utilizando la dinámica 5W (5 Porqués)
          </p>
        </header>

        <div className="relative pl-8 md:pl-12">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-300 rounded-full" aria-hidden="true"></div>
            <div 
                className="absolute left-0 top-0 w-1 bg-stone-600 rounded-full transition-all duration-500 ease-in-out" 
                style={{ height: `${(revealedStep / stepsData.length) * 100}%` }}
                aria-hidden="true"
            ></div>

            <div className="space-y-8">
            {stepsData.map((step, index) => (
                <InfographicStep
                key={step.id}
                stepData={step}
                isVisible={index < revealedStep}
                isRootCause={index === stepsData.length - 1 && index < revealedStep}
                />
            ))}
            </div>
        </div>

        <footer className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isComplete ? (
                 <button
                    onClick={handleRevealNext}
                    disabled={isAnimating}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto bg-stone-600 hover:bg-stone-700 disabled:bg-stone-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-stone-600/30 transform hover:scale-105"
                >
                    <ChevronRight />
                    <span>{revealedStep === 0 ? 'Iniciar Análisis' : 'Siguiente Causa'}</span>
                </button>
            ) : (
                <p className="text-xl font-semibold text-emerald-700 bg-emerald-100 py-2 px-4 rounded-md">
                    ¡Análisis de Causa Raíz Completado!
                </p>
            )}
           
            <button
                onClick={handleReset}
                disabled={isAnimating || revealedStep === 0}
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-600 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
                <RotateCcw />
                <span>Reiniciar</span>
            </button>
        </footer>
      </main>
    </div>
  );
};

export default App;