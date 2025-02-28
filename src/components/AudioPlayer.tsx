
import { useState, useEffect } from "react";
import { Mic, Pause } from "lucide-react";
import { audioPlayerService, playAudio } from "@/utils/audioUtils";

interface AudioPlayerProps {
  audioKey: string;
  label?: string;
  className?: string;
  buttonClassName?: string;
  icon?: boolean;
  small?: boolean;
}

const AudioPlayer = ({
  audioKey,
  label = "Escuchar",
  className = "",
  buttonClassName = "",
  icon = true,
  small = false,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      // Stop audio
      audioPlayerService.stopAllAudio();
      setIsPlaying(false);
    } else {
      // Play audio - in a real implementation, this would use the actual audio file
      const message = playAudio(audioKey);
      setIsPlaying(true);
      
      // Simulate audio playing for 3 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  useEffect(() => {
    // Cleanup
    return () => {
      audioPlayerService.stopAllAudio();
    };
  }, []);

  const baseClasses = small
    ? "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
    : "inline-flex items-center gap-2 px-4 py-2 rounded-full";
    
  const buttonClasses = `${baseClasses} ${
    isPlaying 
      ? "bg-dulce-green text-white hover:bg-dulce-green-dark" 
      : "bg-white/80 text-dulce-green hover:bg-white"
  } font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dulce-green focus:ring-opacity-50 shadow-sm hover:shadow-md ${buttonClassName}`;

  return (
    <div className={`${className}`}>
      <button
        onClick={togglePlay}
        className={buttonClasses}
        aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
      >
        {icon && (isPlaying ? <Pause className="w-4 h-4" /> : <Mic className="w-4 h-4" />)}
        <span>{isPlaying ? "Pausar" : label}</span>
      </button>
    </div>
  );
};

export default AudioPlayer;
