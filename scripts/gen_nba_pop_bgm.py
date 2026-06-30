"""
Generate NBA pop-style arena BGM — upbeat, energetic, pop-influenced.
Uses layered synthesis: bass, chords, melody, drums, crowd noise.
Output: /home/z/my-project/public/bgm-nba-pop.wav
"""
import numpy as np
import struct, wave, os

SAMPLE_RATE = 44100
DURATION = 50  # seconds, will loop
BPM = 128
BEAT = 60.0 / BPM

def to16bit(samples):
    s = np.clip(samples, -1, 1)
    return (s * 32767).astype(np.int16)

def note_freq(note):
    """MIDI note to frequency."""
    return 440.0 * (2.0 ** ((note - 69) / 12.0))

def generate_kick(t, beat_times):
    out = np.zeros_like(t)
    for bt in beat_times:
        mask = (t >= bt) & (t < bt + 0.15)
        local = (t[mask] - bt) / 0.15
        env = np.exp(-local * 12)
        freq = 55 * np.exp(-local * 8) + 40
        out[mask] += np.sin(2 * np.pi * freq * local * 0.15) * env * 0.7
    return out

def generate_snare(t, beat_times):
    out = np.zeros_like(t)
    for bt in beat_times:
        mask = (t >= bt) & (t < bt + 0.1)
        local = (t[mask] - bt) / 0.1
        env = np.exp(-local * 18)
        noise = np.random.randn(mask.sum()) * 0.4 * env
        tone = np.sin(2 * np.pi * 200 * local * 0.1) * env * 0.3
        out[mask] += noise + tone
    return out

def generate_hihat(t, beat_times, open_hat=False):
    out = np.zeros_like(t)
    length = 0.08 if not open_hat else 0.15
    for bt in beat_times:
        mask = (t >= bt) & (t < bt + length)
        local = (t[mask] - bt) / length
        env = np.exp(-local * 30) if not open_hat else np.exp(-local * 15)
        noise = np.random.randn(mask.sum()) * 0.15 * env
        out[mask] += noise
    return out

def generate_bass(t, beat_times, notes):
    out = np.zeros_like(t)
    for i, bt in enumerate(beat_times):
        if i >= len(notes):
            break
        freq = note_freq(notes[i])
        mask = (t >= bt) & (t < bt + BEAT * 0.9)
        local = t[mask] - bt
        env = np.minimum(local * 20, 1.0) * np.exp(-local * 3)
        out[mask] += (np.sin(2 * np.pi * freq * local) * 0.5 +
                       np.sin(2 * np.pi * freq * 2 * local) * 0.15) * env * 0.5
    return out

def generate_chord_pad(t, beat_times, chord_notes, duration_beats=4):
    out = np.zeros_like(t)
    for i, bt in enumerate(beat_times):
        if i >= len(chord_notes):
            break
        chord = chord_notes[i]
        mask = (t >= bt) & (t < bt + BEAT * duration_beats)
        local = t[mask] - bt
        env = np.minimum(local * 4, 1.0) * np.exp(-local * 0.8)
        for note in chord:
            freq = note_freq(note)
            out[mask] += np.sin(2 * np.pi * freq * local) * env * 0.08
    return out

def generate_melody(t, note_starts, note_durs, note_pitches):
    out = np.zeros_like(t)
    for i, (ns, nd, np_) in enumerate(zip(note_starts, note_durs, note_pitches)):
        freq = note_freq(np_)
        mask = (t >= ns) & (t < ns + nd)
        local = t[mask] - ns
        env = np.minimum(local * 30, 1.0) * np.exp(-local * 3)
        # Slightly detuned for richness
        out[mask] += (np.sin(2 * np.pi * freq * local) * 0.3 +
                       np.sin(2 * np.pi * freq * 1.002 * local) * 0.15 +
                       np.sin(2 * np.pi * freq * 2 * local) * 0.08) * env * 0.35
    return out

def generate_arena_ambience(t):
    """Subtle low crowd rumble."""
    noise = np.random.randn(len(t))
    # Low-pass via simple moving average
    kernel_size = 200
    kernel = np.ones(kernel_size) / kernel_size
    filtered = np.convolve(noise, kernel, mode='same')
    return filtered * 0.03

def main():
    total_samples = int(SAMPLE_RATE * DURATION)
    t = np.linspace(0, DURATION, total_samples, endpoint=False)

    total_beats = int(DURATION / BEAT)
    beat_times = np.array([i * BEAT for i in range(total_beats)])

    # Kick on beats 1, 3 (every other beat)
    kick_times = beat_times[::2]
    # Snare on beats 2, 4
    snare_times = beat_times[1::2]
    # Hi-hat on every 8th note
    hihat_times = np.array([i * BEAT / 2 for i in range(total_beats * 2)])
    # Open hi-hat on off-beats
    open_hh_times = hihat_times[1::2]

    # Bass line - funky pop bass (repeating 4-bar pattern)
    bass_pattern = [
        36, 36, 41, 41, 43, 43, 41, 41,  # Bar 1-2: C2 C2 F2 F2 G2 G2 F2 F2
        36, 36, 41, 41, 43, 43, 48, 48,  # Bar 3-4: C2 C2 F2 F2 G2 G2 C3 C3
        36, 36, 41, 41, 43, 43, 41, 41,
        36, 36, 39, 39, 43, 43, 41, 36,  # Variation
    ]
    # Extend pattern to fill duration
    bass_notes = []
    for i in range(total_beats):
        bass_notes.append(bass_pattern[i % len(bass_pattern)])

    # Chord progression (pop: C - F - G - Am, each 4 beats)
    chord_progression = [
        [60, 64, 67],  # C major
        [65, 69, 72],  # F major
        [67, 71, 74],  # G major
        [57, 60, 64],  # A minor
        [60, 64, 67],  # C major
        [65, 69, 72],  # F major
        [67, 71, 74],  # G major
        [55, 59, 62],  # G major (variation)
    ]
    chord_times = beat_times[::4]
    # Extend chords
    chords = []
    for i in range(len(chord_times)):
        chords.append(chord_progression[i % len(chord_progression)])

    # Melody - catchy pop motif (repeating 8-bar phrase)
    melody_pattern = [
        # Bar 1
        (0, 0.5, 72), (0.5, 0.5, 74), (1.0, 0.5, 76), (1.5, 0.5, 74),
        # Bar 2
        (2.0, 1.0, 71), (3.0, 1.0, 67),
        # Bar 3
        (4.0, 0.5, 72), (4.5, 0.5, 76), (5.0, 0.5, 79), (5.5, 0.5, 76),
        # Bar 4
        (6.0, 1.0, 74), (7.0, 1.0, 72),
        # Bar 5
        (8.0, 0.25, 76), (8.25, 0.25, 79), (8.5, 0.5, 81), (9.0, 1.0, 79),
        # Bar 6
        (10.0, 0.5, 76), (10.5, 0.5, 74), (11.0, 1.0, 72),
        # Bar 7
        (12.0, 0.5, 71), (12.5, 0.5, 72), (13.0, 0.5, 74), (13.5, 0.5, 76),
        # Bar 8
        (14.0, 1.5, 72), (15.5, 0.5, 71),
    ]
    # Extend melody across duration
    melody_starts = []
    melody_durs = []
    melody_pitches = []
    pattern_len = 16.0  # 16 beats
    for cycle in range(int(np.ceil(DURATION / pattern_len)) + 1):
        offset = cycle * pattern_len
        for (start, dur, pitch) in melody_pattern:
            abs_start = offset + start
            if abs_start < DURATION:
                actual_dur = min(dur, DURATION - abs_start)
                if actual_dur > 0:
                    melody_starts.append(abs_start)
                    melody_durs.append(actual_dur)
                    melody_pitches.append(pitch)

    print("Generating drums...")
    kick = generate_kick(t, kick_times)
    snare = generate_snare(t, snare_times)
    hihat = generate_hihat(t, hihat_times)
    open_hh = generate_hihat(t, open_hh_times, open_hat=True)

    print("Generating bass...")
    bass = generate_bass(t, beat_times, bass_notes)

    print("Generating chords...")
    pads = generate_chord_pad(t, chord_times, chords, duration_beats=4)

    print("Generating melody...")
    melody = generate_melody(t, melody_starts, melody_durs, melody_pitches)

    print("Generating arena ambience...")
    ambience = generate_arena_ambience(t)

    # Mix
    print("Mixing...")
    mix = kick + snare + hihat + open_hh + bass + pads + melody + ambience

    # Normalize
    peak = np.max(np.abs(mix))
    if peak > 0:
        mix = mix / peak * 0.85

    # Apply slight fade in/out
    fade_samples = int(SAMPLE_RATE * 1.0)
    mix[:fade_samples] *= np.linspace(0, 1, fade_samples)
    mix[-fade_samples:] *= np.linspace(1, 0, fade_samples)

    data = to16bit(mix)

    # Write WAV
    out_path = '/home/z/my-project/public/bgm-nba-pop.wav'
    with wave.open(out_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(data.tobytes())

    print(f"BGM written to {out_path}")
    print(f"Duration: {DURATION}s, Size: {os.path.getsize(out_path) / 1024 / 1024:.1f}MB")

if __name__ == '__main__':
    main()