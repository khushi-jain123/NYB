import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTextScrambleOptions {
  characters?: string;
  revealSpeed?: number;
}

export const useTextScramble = (
  text: string,
  options: UseTextScrambleOptions = {}
) => {
  const {
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
    revealSpeed = 30,
  } = options;

  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const originalTextRef = useRef(text);
  const isActiveRef = useRef(false);

  const getRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const scramble = useCallback(() => {
    if (isActiveRef.current) return;
    
    // Clear any existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    isActiveRef.current = true;
    const targetText = originalTextRef.current;
    const textLength = targetText.length;
    let currentIndex = 0;

    intervalRef.current = window.setInterval(() => {
      let scrambled = '';
      
      for (let i = 0; i < textLength; i++) {
        if (i < currentIndex) {
          // Characters that have been revealed stay revealed
          scrambled += targetText[i];
        } else {
          // Characters being scrambled show random chars
          scrambled += getRandomChar();
        }
      }
      
      setDisplayText(scrambled);
      currentIndex++;

      // When all characters are revealed, stop scrambling
      if (currentIndex > textLength) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(targetText);
        isActiveRef.current = false;
      }
    }, revealSpeed);
  }, [characters, revealSpeed]);

  const reset = useCallback(() => {
    isActiveRef.current = false;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayText(originalTextRef.current);
  }, []);

  useEffect(() => {
    originalTextRef.current = text;
    if (!isActiveRef.current) {
      setDisplayText(text);
    }
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    displayText,
    scramble,
    reset,
  };
};

