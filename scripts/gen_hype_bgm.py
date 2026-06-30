#!/usr/bin/env python3
"""Generate hype NBA-style BGM: 140BPM trap, 808 bass, brass stabs, risers."""
import numpy as np
import struct, subprocess, os

SR = 44100
DURATION = 75

def to_wav(samples, filepath):
    samples = np.clip(samples, -1.0, 1.0)
    pcm = (samples * 32767).astype(np.int16)
    with open(filepath, 'wb') as f:
        f.write(b'RIFF')
        dl = len(pcm) * 2
        f.write(struct.pack('<I', 36 + dl))
        f.write(b'WAVEfmt ')
        f.write(struct.pack('<IHHIIHH', 16, 1, 1, SR, SR * 2, 2, 16))
        f.write(b'data')
        f.write(struct.pack('<I', dl))
        f.write(pcm.tobytes())

def env(n, a=0.01, d=0.05, s=0.7, r=0.1):
    e = np.ones(n) * s
    ia = int(n*a); id_ = int(n*d); ir = int(n*r)
    if ia > 0: e[:ia] = np.linspace(0, 1, ia)
    if id_ > 0 and ia+id_ < n: e[ia:ia+id_] = np.linspace(1, s, id_)
    if ir > 0: e[-ir:] = np.linspace(s, 0, ir)
    return e

def kick(dur=0.35):
    n = int(dur*SR); t = np.linspace(0, dur, n)
    fs = 55*np.exp(-t*12)+35
    body = np.sin(np.cumsum(fs)/SR*2*np.pi)*np.exp(-t*6)
    sub = np.sin(2*np.pi*40*t)*np.exp(-t*2.5)*0.8
    click = np.zeros(n)
    cl = min(int(0.005*SR), n)
    click[:cl] = np.random.randn(cl)*0.3
    return (body*0.7+sub+click)*env(n, 0.001, 0.05, 0.6, 0.15)

def snare(dur=0.2):
    n = int(dur*SR); t = np.linspace(0, dur, n)
    tone = np.sin(2*np.pi*200*t)*np.exp(-t*25)*0.4
    noise = np.convolve(np.random.randn(n)*np.exp(-t*15)*0.6, np.ones(20)/20, mode='same')
    return (tone+noise)*env(n, 0.001, 0.02, 0.3, 0.05)

def hihat(dur=0.06):
    n = int(dur*SR); t = np.linspace(0, dur, n)
    return np.random.randn(n)*np.exp(-t*60)*0.2

def bass(freq, dur=0.4, vol=0.5):
    n = int(dur*SR); t = np.linspace(0, dur, n)
    f = freq*(1-0.02*t/dur)
    sig = np.sin(2*np.pi*np.cumsum(f)/SR)*vol + np.sin(2*np.pi*freq*2*t)*vol*0.12
    return sig*env(n, 0.005, 0.1, 0.8, 0.1)

def brass(freq, dur=0.3, vol=0.25):
    n = int(dur*SR); t = np.linspace(0, dur, n)
    sig = sum(np.sin(2*np.pi*freq*h*t)/h*0.5 for h in range(1,8))
    sig = np.tanh(sig*3)*0.5
    return sig*np.exp(-t*5)*vol*env(n, 0.005, 0.08, 0.5, 0.1)

def pad(freq, dur, vol=0.1):
    n = int(dur*SR); t = np.linspace(0, dur, n)
    sig = np.sin(2*np.pi*freq*t)*0.5 + np.sin(2*np.pi*freq*1.005*t)*0.3
    return sig*env(n, 0.3, 0.2, 0.6, 0.5)*vol

N = int(DURATION*SR)
mix = np.zeros(N)
BPM = 140; beat = 60.0/BPM; bar = beat*4

# KICKS
for bn in range(int(DURATION/bar)+1):
    for k in [0, 0.5, 1, 2, 3, 3.5]:
        t0 = bn*bar + k*beat; idx = int(t0*SR)
        if idx < N:
            h = kick(); end = min(idx+len(h), N); mix[idx:end] += h[:end-idx]

# SNARES
for s in [2, 6, 10, 14]:
    idx = int(s*beat*SR)
    if idx < N:
        h = snare(); end = min(idx+len(h), N); mix[idx:end] += h[:end-idx]

# HIHATS 8th notes
for i in range(int(DURATION/beat*2)):
    idx = int(i*beat*0.5*SR)
    if idx < N:
        h = hihat(); vol = 0.7 if i%2==0 else 0.35
        end = min(idx+len(h), N); mix[idx:end] += h[:end-idx]*vol

# 808 BASS
bass_notes = [65.41, 77.78, 87.31, 98.0, 116.54, 87.31, 77.78, 65.41]
bass_pat = [0, 1, 2, 2.5, 3, 4.5, 5, 6, 6.5, 7]
for bn in range(int(DURATION/bar)+1):
    for i, bp in enumerate(bass_pat):
        t0 = bn*bar + bp*beat; idx = int(t0*SR)
        if idx < N:
            n_ = bass(bass_notes[(i+bn)%len(bass_notes)], beat*1.5, 0.45)
            end = min(idx+len(n_), N); mix[idx:end] += n_[:end-idx]

# BRASS STABS
brass_f = [233.08, 311.13, 349.23, 392.0, 466.16, 523.25, 392.0, 349.23]
for bn in range(int(DURATION/bar)+1):
    for off in [0, 2]:
        t0 = bn*bar+off*beat; idx = int(t0*SR)
        if idx < N:
            h = brass(brass_f[(bn*2+off)%len(brass_f)], 0.4, 0.22)
            end = min(idx+len(h), N); mix[idx:end] += h[:end-idx]

# PAD (Cm - Bb - Cm - Gm)
for ci, chord in enumerate([[130.81,155.56,196.0],[116.54,146.83,174.61],[130.81,155.56,196.0],[98.0,123.47,146.83]]):
    for f in chord:
        idx = int(ci*bar*2*SR)
        if idx < N:
            p = pad(f, bar*2, 0.08); end = min(idx+len(p), N); mix[idx:end] += p[:end-idx]

# RISER every 8 bars
for bs in np.arange(0, DURATION, bar*8):
    bd = bar*4
    if bs+bd > DURATION: break
    n = int(bd*SR); t = np.linspace(0, bd, n)
    noise = np.random.randn(n)*0.06*(t/bd)
    # Simple sweep: running average gets wider
    for i in range(1, n):
        w = max(1, int((0.1+0.9*(t[i]/bd)**2)*200))
        if i > w: noise[i] = np.mean(noise[max(0,i-w):i])
    rf = 200+2000*(t/bd)**2
    rt = np.sin(2*np.pi*np.cumsum(rf)/SR)*0.1*(t/bd)
    riser = noise + rt
    idx = int(bs*SR); end = min(idx+len(riser), N); mix[idx:end] += riser[:end-idx]
    # Drop kick
    for j in range(4):
        t0 = bs+bd+j*beat*0.5; idx = int(t0*SR)
        if idx < N:
            h = kick(0.4); end = min(idx+len(h), N); mix[idx:end] += h[:end-idx]*1.2

# MASTER
mix = np.tanh(mix*1.2)*0.85
mix = mix / np.max(np.abs(mix)) * 0.92

wav_path = '/home/z/my-project/public/arena-bgm.wav'
to_wav(mix, wav_path)
print(f'WAV: {wav_path} ({len(mix)/SR:.1f}s)')

mp3_path = '/home/z/my-project/public/bgm-nba.mp3'
subprocess.run(['ffmpeg', '-y', '-i', wav_path, '-b:a', '192k', '-ar', '44100', mp3_path], capture_output=True)
print(f'MP3: {mp3_path}')
