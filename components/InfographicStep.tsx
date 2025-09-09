import React from 'react';
import type { InfographicStepData } from '../types';
import { HelpCircle } from './Icons';

interface InfographicStepProps {
  stepData: InfographicStepData;
  isVisible: boolean;
  isRootCause: boolean;
}

export const InfographicStep: React.FC<InfographicStepProps> = ({ stepData, isVisible, isRootCause }) => {
  const { why, because } = stepData;

  const containerClasses = [
    'transition-all duration-500 ease-in-out transform',
    'flex items-start space-x-4 md:space-x-6 relative',
    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
  ].join(' ');

  const cardClasses = [
    'w-full bg-white rounded-lg shadow-md overflow-hidden border-l-4 transition-colors duration-300',
    isRootCause ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'
  ].join(' ');
  
  const iconWrapperClasses = [
    'absolute -left-8 md:-left-12 flex-shrink-0 h-full flex items-center justify-center',
  ].join(' ');

  const iconCircleClasses = [
    'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ring-4 transition-colors duration-500',
    isVisible ? 'bg-stone-600 ring-stone-100' : 'bg-slate-300 ring-stone-100'
  ].join(' ');

  return (
    <div className={containerClasses}>
       <div className={iconWrapperClasses}>
            <div className={iconCircleClasses}>
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
        </div>
      <div className={cardClasses}>
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg md:text-xl font-bold text-stone-700">{why}</span>
          </div>
          <p className="text-base md:text-lg text-slate-600">{because}</p>
        </div>
        {isRootCause && (
           <div className="bg-emerald-500 text-white px-4 py-1 text-sm font-bold">
             Causa Raíz Identificada
           </div>
        )}
      </div>
    </div>
  );
};