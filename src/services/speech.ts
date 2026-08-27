export interface SpeechRecognitionResultPayload {
  transcript: string;
  confidence: number;
  duration_ms: number;
}

export interface SpeechSessionCallbacks {
  onInterim?: (transcript: string) => void;
  onFinal?: (payload: SpeechRecognitionResultPayload) => void;
  onError?: (error: Error) => void;
  onEnd?: () => void;
}

export class SpeechService {
  private static audioCtx: AudioContext | null = null;
  private static activeRecognition: any = null;
  private static silenceTimer: ReturnType<typeof setTimeout> | null = null;
  private static maxDurationTimer: ReturnType<typeof setTimeout> | null = null;

  private static getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Synthesize audio for Santhali/Hindi phrases.
   * Uses browser SpeechSynthesis with calibrated cadence and pitch,
   * with fallback to an acoustic Web Audio tone generator for 100% offline devices.
   */
  public static async speakText(text: string, lang: 'sat' | 'hi' | 'en' | string = 'sat'): Promise<number> {
    const startTime = performance.now();

    return new Promise<number>((resolve) => {
      if ('speechSynthesis' in window) {
        // Cancel any pending speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.rate = 0.88; // slightly slower for young tribal students
        utterance.pitch = 1.05;

        if (lang === 'hi' || lang === 'sat') {
          utterance.lang = 'hi-IN';
        } else {
          utterance.lang = 'en-IN';
        }

        // Try to pick an Indian voice if available
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang === 'hi-IN' || v.name.toLowerCase().includes('india') || v.lang === 'en-IN');
        if (indianVoice) {
          utterance.voice = indianVoice;
        }

        utterance.onend = () => {
          const elapsed = Math.round(performance.now() - startTime);
          resolve(elapsed);
        };

        utterance.onerror = () => {
          // Fallback to acoustic tone pulse
          this.playAcousticChime();
          const elapsed = Math.round(performance.now() - startTime);
          resolve(elapsed);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback for browsers without speech synthesis
        this.playAcousticChime();
        const elapsed = Math.round(performance.now() - startTime);
        resolve(elapsed);
      }
    });
  }

  /**
   * Plays a distinct educational affirmation or tone pulse using pure Web Audio API
   * completely offline without any external assets.
   */
  public static playAcousticChime(type: 'success' | 'note' | 'click' = 'note'): void {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now); // A4
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  /**
   * Check if speech recognition is supported in this browser environment.
   */
  public static isSpeechRecognitionSupported(): boolean {
    return !!(
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition
    );
  }

  /**
   * Stop active speech recognition manually.
   */
  public static stopActiveRecognition(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.maxDurationTimer) {
      clearTimeout(this.maxDurationTimer);
      this.maxDurationTimer = null;
    }
    if (this.activeRecognition) {
      try {
        this.activeRecognition.stop();
      } catch (e) {
        console.warn('Recognition stop error:', e);
      }
    }
  }

  /**
   * Abort active speech recognition without processing.
   */
  public static abortActiveRecognition(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.maxDurationTimer) {
      clearTimeout(this.maxDurationTimer);
      this.maxDurationTimer = null;
    }
    if (this.activeRecognition) {
      try {
        this.activeRecognition.abort();
      } catch (e) {
        console.warn('Recognition abort error:', e);
      }
      this.activeRecognition = null;
    }
  }

  /**
   * Start listening for teacher Hindi speech with live callbacks and automatic/manual stop.
   */
  public static startSpeechSession(callbacks: SpeechSessionCallbacks): () => void {
    this.stopActiveRecognition();

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      if (callbacks.onError) {
        callbacks.onError(new Error('Speech recognition is not supported in this browser. Please use text input or classroom prompts.'));
      }
      return () => {};
    }

    const startTime = performance.now();
    let accumulatedFinalTranscript = '';
    let latestInterimTranscript = '';
    let hasResolved = false;

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'hi-IN';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      this.activeRecognition = recognition;

      const resetSilenceTimer = () => {
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
        }
        // Auto stop after 2.8 seconds of silence once speech has been heard
        this.silenceTimer = setTimeout(() => {
          if (this.activeRecognition === recognition) {
            this.stopActiveRecognition();
          }
        }, 2800);
      };

      // Max recording safeguard: 12 seconds
      this.maxDurationTimer = setTimeout(() => {
        if (this.activeRecognition === recognition) {
          this.stopActiveRecognition();
        }
      }, 12000);

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          const text = res[0].transcript;
          if (res.isFinal) {
            accumulatedFinalTranscript += (accumulatedFinalTranscript ? ' ' : '') + text.trim();
          } else {
            interim += text;
          }
        }
        latestInterimTranscript = interim;

        const currentCombined = (accumulatedFinalTranscript + (interim ? ' ' + interim : '')).trim();
        if (callbacks.onInterim) {
          callbacks.onInterim(currentCombined);
        }

        if (currentCombined) {
          resetSilenceTimer();
        }
      };

      recognition.onerror = (event: any) => {
        // 'no-speech' or 'aborted' can be handled cleanly
        if (event.error === 'no-speech') {
          // If silence, we'll let onend handle what was captured
          return;
        }
        if (event.error === 'aborted') {
          return;
        }
        console.warn('Speech recognition event error:', event.error);
        if (callbacks.onError) {
          callbacks.onError(new Error(event.error || 'Microphone error'));
        }
      };

      recognition.onend = () => {
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
          this.silenceTimer = null;
        }
        if (this.maxDurationTimer) {
          clearTimeout(this.maxDurationTimer);
          this.maxDurationTimer = null;
        }

        if (this.activeRecognition === recognition) {
          this.activeRecognition = null;
        }

        if (!hasResolved) {
          hasResolved = true;
          const finalTrimmed = (accumulatedFinalTranscript || latestInterimTranscript).trim();
          const elapsed = Math.round(performance.now() - startTime);

          if (callbacks.onFinal && finalTrimmed) {
            callbacks.onFinal({
              transcript: finalTrimmed,
              confidence: 0.95,
              duration_ms: elapsed
            });
          }
          if (callbacks.onEnd) {
            callbacks.onEnd();
          }
        }
      };

      recognition.start();
      this.playAcousticChime('click');
    } catch (err: any) {
      if (callbacks.onError) {
        callbacks.onError(err);
      }
    }

    return () => {
      this.stopActiveRecognition();
    };
  }

  /**
   * Listen for teacher Hindi speech input via SpeechRecognition (Promise wrapper).
   */
  public static listenForHindiSpeech(): Promise<SpeechRecognitionResultPayload> {
    return new Promise((resolve, reject) => {
      let resolved = false;

      this.startSpeechSession({
        onFinal: (payload) => {
          resolved = true;
          resolve(payload);
        },
        onError: (err) => {
          if (!resolved) {
            resolved = true;
            reject(err);
          }
        },
        onEnd: () => {
          if (!resolved) {
            resolved = true;
            reject(new Error('No speech detected'));
          }
        }
      });
    });
  }
}

