export type NarrativeState = {
  progress: number;
  beatIndex: number;
  beatLocal: number;
};

export function getNarrativeState(progress: number, beatCount: number): NarrativeState {
  const clamped = Math.max(0, Math.min(1, progress));
  const scaled = clamped * beatCount;
  const beatIndex = Math.min(beatCount - 1, Math.floor(scaled));
  const beatLocal = scaled - beatIndex;
  return { progress: clamped, beatIndex, beatLocal };
}

/** Fade in/out within each chapter for scroll-scrubbed copy. */
export function getChapterOpacity(beatLocal: number): number {
  if (beatLocal < 0.1) return beatLocal / 0.1;
  if (beatLocal > 0.9) return (1 - beatLocal) / 0.1;
  return 1;
}

export function getCrossfade(
  beatIndex: number,
  beatLocal: number,
  beatCount: number,
): { current: number; next: number } {
  const current = getChapterOpacity(beatLocal);
  if (beatIndex >= beatCount - 1 || beatLocal < 0.72) {
    return { current, next: 0 };
  }
  const next = (beatLocal - 0.72) / 0.28;
  return { current: current * (1 - next), next: next * getChapterOpacity(beatLocal - 0.72) };
}

function smooth(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/**
 * Opacity for a beat's text as a single continuous function of the global
 * scaled progress `s` (= progress * beatCount). Each beat fades in during the
 * tail of the previous beat and fades out into the next, so adjacent beats
 * cross-fade seamlessly with no double flash at the boundary.
 */
export function beatTextOpacity(i: number, s: number, beatCount: number): number {
  const x = s - i;
  const inStart = i === 0 ? 0 : -0.2;
  const inEnd = i === 0 ? 0.16 : 0;
  const outStart = 0.8;
  const outEnd = 1;
  if (x <= inStart || x >= outEnd) return 0;
  if (x < inEnd) return smooth((x - inStart) / (inEnd - inStart));
  if (x > outStart) return 1 - smooth((x - outStart) / (outEnd - outStart));
  return 1;
}
