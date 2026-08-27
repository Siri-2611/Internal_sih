import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { SpeechService } from '../services/speech';

interface AudioPlayerButtonProps {
  textToSpeak: string;
  phoneticText?: string;
  lang?: 'sat' | 'hi' | 'en';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
  id?: string;
  onPlayed?: (durationMs: number) => void;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  textToSpeak,
  phoneticText,
  lang = 'sat',
  size = 'md',
  showLabel = true,
  label = 'Play Audio',
  className = '',
  id,
  onPlayed
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);

    try {
      // Speak using phonetic pronunciation text if available for clearer articulation
      const targetSpeech = phoneticText || textToSpeak;
      const duration = await SpeechService.speakText(targetSpeech, lang);
      if (onPlayed) {
        onPlayed(duration);
      }
    } catch (err) {
      console.warn('Audio playback error:', err);
    } finally {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5 font-semibold'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      id={id || `audio-btn-${Math.random().toString(36).slice(2, 7)}`}
      type="button"
      onClick={handlePlay}
      disabled={isPlaying || !textToSpeak}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer select-none ${
        isPlaying
          ? 'bg-[#F27D26] text-white animate-pulse ring-2 ring-[#F27D26]/40'
          : 'bg-[#F27D26]/10 hover:bg-[#F27D26]/20 text-[#2D3436] border border-[#F27D26]/30 hover:border-[#F27D26]/50'
      } ${sizeClasses[size]} ${className}`}
      title={`Listen in Santhali (${phoneticText || textToSpeak})`}
      aria-label="Play spoken audio"
    >
      {isPlaying ? (
        <Loader2 className={`${iconSizes[size]} animate-spin text-white`} />
      ) : (
        <Volume2 className={`${iconSizes[size]} text-[#F27D26]`} />
      )}
      {showLabel && (
        <span className="truncate">
          {isPlaying ? 'Speaking...' : label}
        </span>
      )}
    </button>
  );
};
