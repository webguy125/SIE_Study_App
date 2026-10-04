/** Atari Asteroids (1979) flying saucer — vector line segments from the arcade ROM shape */

export type SaucerSize = 'large' | 'small';

/** Line segments for the large saucer (small saucer uses half scale). */
const LARGE_SAUCER_SEGMENTS: ReadonlyArray<readonly [readonly [number, number], readonly [number, number]]> = [
  [[-16, 4], [-8, 7]],
  [[-8, 7], [8, 7]],
  [[8, 7], [16, 4]],
  [[16, 4], [16, 0]],
  [[16, 0], [-16, 0]],
  [[-16, 0], [-16, 4]],
  [[-6, 0], [-4, -5]],
  [[-4, -5], [4, -5]],
  [[4, -5], [6, 0]],
];

const LARGE_DRAW_SCALE = 1.05;
const SMALL_DRAW_SCALE = LARGE_DRAW_SCALE * 0.52;

export function saucerDrawScale(size: SaucerSize): number {
  return size === 'large' ? LARGE_DRAW_SCALE : SMALL_DRAW_SCALE;
}

export function saucerCollisionRadius(size: SaucerSize): number {
  return size === 'large' ? 18 : 10;
}

export function saucerDestroyPoints(size: SaucerSize): number {
  return size === 'large' ? 200 : 1000;
}

/** Draw the classic horizontal UFO; mirrors when moving left like the arcade game. */
export function drawClassicSaucer(
  ctx: CanvasRenderingContext2D,
  size: SaucerSize,
  facingRight: boolean,
): void {
  const scale = saucerDrawScale(size);
  const mirror = facingRight ? 1 : -1;

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = size === 'large' ? 2.1 : 1.6;
  ctx.lineJoin = 'round';

  for (const [[x1, y1], [x2, y2]] of LARGE_SAUCER_SEGMENTS) {
    ctx.beginPath();
    ctx.moveTo(x1 * scale * mirror, y1 * scale);
    ctx.lineTo(x2 * scale * mirror, y2 * scale);
    ctx.stroke();
  }
}

/** Draw the correct answer word carried by the vocab saucer. */
export function drawSaucerAnswerLabel(
  ctx: CanvasRenderingContext2D,
  answerWord: string,
  size: SaucerSize,
): void {
  const scale = saucerDrawScale(size);
  const label = answerWord.length > 14 ? `${answerWord.slice(0, 12)}…` : answerWord;
  const fontSize = size === 'large'
    ? Math.max(9, Math.min(12, 11 - label.length * 0.15))
    : Math.max(7, Math.min(9, 8 - label.length * 0.12));

  ctx.fillStyle = '#7dd3fc';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
  ctx.fillText(label, 0, scale * 11);
}