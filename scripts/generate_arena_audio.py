#!/usr/bin/env python3
"""
Generate a synthetic NBA-style arena ambient audio track.

Layers:
  1. Brown noise crowd rumble (bandpass 80-300 Hz)
  2. Occasional shoe squeaks (short sine bursts ~3500 Hz)
  3. Subtle bass pulse at 80 BPM (~60 Hz kick feel)

Output: /home/z/my-project/public/arena-bgm.wav  (60 s, 44100 Hz, stereo)
"""

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
import os

# ── Config ──────────────────────────────────────────────────────────────────
SAMPLE_RATE = 44100
DURATION = 60  # seconds
NUM_SAMPLES = SAMPLE_RATE * DURATION
OUTPUT_PATH = "/home/z/my-project/public/arena-bgm.wav"

np.random.seed(42)

# ── Helper: stereo from mono ────────────────────────────────────────────────
def to_stereo(mono):
    """Convert mono float64 array to stereo int16 for WAV output."""
    stereo = np.column_stack((mono, mono))
    # Clip just in case
    stereo = np.clip(stereo, -1.0, 1.0)
    return (stereo * 32767).astype(np.int16)


# ── 1. Crowd rumble (brown noise, bandpass filtered) ───────────────────────
def make_crowd_rumble(num_samples, sr, volume=0.15):
    """Generate brownian noise and bandpass filter 80-300 Hz."""
    # Brown noise: cumulative sum of white noise
    white = np.random.randn(num_samples)
    brown = np.cumsum(white)
    # Normalize
    brown = brown / np.max(np.abs(brown))

    # Bandpass filter 80-300 Hz (4th order Butterworth)
    sos = butter(4, [80, 300], btype='bandpass', fs=sr, output='sos')
    filtered = sosfilt(sos, brown)

    # Normalize after filtering
    filtered = filtered / np.max(np.abs(filtered)) * volume
    return filtered


# ── 2. Shoe squeaks ─────────────────────────────────────────────────────────
def make_shoe_squeaks(num_samples, sr, volume=0.08):
    """Random short sine bursts at ~3500 Hz to simulate shoe squeaks."""
    output = np.zeros(num_samples)

    # Place squeaks at random intervals
    # Average ~1 squeak every 1.5-3 seconds → roughly 25-40 squeaks in 60s
    num_squeaks = np.random.randint(25, 45)
    positions = np.sort(np.random.randint(0, num_samples, size=num_squeaks))

    for pos in positions:
        freq = np.random.uniform(3000, 5000)
        dur = np.random.uniform(0.05, 0.15)
        length = int(dur * sr)
        end = min(pos + length, num_samples)
        actual_len = end - pos

        t = np.linspace(0, dur, actual_len, endpoint=False)
        # Sine with a fast attack and exponential decay envelope
        envelope = np.exp(-t * 30)  # quick decay
        # Slight frequency sweep for realism
        sweep = np.sin(2 * np.pi * freq * t + 2 * np.pi * np.random.uniform(0, 500) * t**2)
        squeak = sweep * envelope * volume

        # Slight random volume variation
        squeak *= np.random.uniform(0.5, 1.0)
        output[pos:end] += squeak

    return output


# ── 3. Bass pulse (80 BPM kick feel) ───────────────────────────────────────
def make_bass_pulse(num_samples, sr, bpm=80, volume=0.12):
    """Low-frequency sine pulse at given BPM to simulate subtle kick drum."""
    output = np.zeros(num_samples)

    beat_interval = 60.0 / bpm  # seconds between beats
    beat_samples = int(beat_interval * sr)
    pulse_duration = 0.1  # seconds
    pulse_samples = int(pulse_duration * sr)
    freq = 60  # Hz

    beat_pos = 0
    while beat_pos < num_samples:
        end = min(beat_pos + pulse_samples, num_samples)
        actual_len = end - beat_pos
        t = np.linspace(0, pulse_duration, actual_len, endpoint=False)

        # Sine with exponential decay envelope (kick drum shape)
        envelope = np.exp(-t * 25)
        pulse = np.sin(2 * np.pi * freq * t) * envelope * volume
        output[beat_pos:end] += pulse

        beat_pos += beat_samples

    return output


# ── 4. Mix and normalize ────────────────────────────────────────────────────
def main():
    print("Generating arena audio...")
    print(f"  Duration: {DURATION}s, Sample rate: {SAMPLE_RATE} Hz, Samples: {NUM_SAMPLES}")

    # Generate layers
    print("  Generating crowd rumble...")
    crowd = make_crowd_rumble(NUM_SAMPLES, SAMPLE_RATE, volume=0.15)

    print("  Generating shoe squeaks...")
    squeaks = make_shoe_squeaks(NUM_SAMPLES, SAMPLE_RATE, volume=0.08)

    print("  Generating bass pulse...")
    bass = make_bass_pulse(NUM_SAMPLES, SAMPLE_RATE, bpm=80, volume=0.12)

    # Mix
    print("  Mixing layers...")
    mixed = crowd + squeaks + bass

    # Normalize to peak at 0.8
    peak = np.max(np.abs(mixed))
    if peak > 0:
        mixed = mixed / peak * 0.8

    # Convert to stereo int16
    stereo_data = to_stereo(mixed)

    # Ensure output directory exists
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    # Save
    print(f"  Saving to {OUTPUT_PATH}...")
    wavfile.write(OUTPUT_PATH, SAMPLE_RATE, stereo_data)

    # Verify
    file_size = os.path.getsize(OUTPUT_PATH)
    print(f"  Done! File size: {file_size / 1024 / 1024:.1f} MB")
    print(f"  Output: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
