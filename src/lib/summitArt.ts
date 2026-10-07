import dadUrl from '../../Images/DadGorilla.png';
import babyUrl from '../../Images/BabyGorilla.png';
import birdUrl from '../../Images/Bird.jpg';
import mountainUrl from '../../Images/Mountain.jpg';

export interface CutSprite {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export interface SummitArt {
  mountain: HTMLImageElement;
  dad: [CutSprite, CutSprite, CutSprite, CutSprite];
  baby: [CutSprite, CutSprite, CutSprite, CutSprite];
  bird: CutSprite;
}

interface Box {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  n: number;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${url}`));
    image.src = url;
  });
}

function drawSource(image: CanvasImageSource, width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas is not available');
  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
}

/** Clear the backdrop by flooding from the edges. The dark outline stops the fill. */
function floodClear(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;
  const width = canvas.width;
  const height = canvas.height;
  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  const count = width * height;
  const seen = new Uint8Array(count);
  const queue = new Int32Array(count);
  let tail = 0;
  const push = (index: number) => {
    if (index < 0 || index >= count || seen[index]) return;
    seen[index] = 1;
    queue[tail] = index;
    tail += 1;
  };
  for (let x = 0; x < width; x += 4) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 4) {
    push(y * width);
    push(y * width + width - 1);
  }

  const corner = (index: number) => {
    const p = index * 4;
    return [data[p], data[p + 1], data[p + 2]] as const;
  };
  const corners = [corner(0), corner(width - 1), corner((height - 1) * width), corner(count - 1)];
  const isBackdrop = (index: number) => {
    const p = index * 4;
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    if (r > 242 && g > 242 && b > 242) return true;
    return corners.some(([cr, cg, cb]) => Math.abs(r - cr) + Math.abs(g - cg) + Math.abs(b - cb) < 72);
  };

  let head = 0;
  while (head < tail) {
    const index = queue[head];
    head += 1;
    if (!isBackdrop(index)) continue;
    data[index * 4 + 3] = 0;
    const x = index % width;
    const y = (index / width) | 0;
    if (x > 0) push(index - 1);
    if (x + 1 < width) push(index + 1);
    if (y > 0) push(index - width);
    if (y + 1 < height) push(index + width);
  }
  ctx.putImageData(image, 0, 0);
}

function crop(sheet: HTMLCanvasElement, box: Box): CutSprite {
  const ctx = sheet.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas is not available');
  const sw = box.maxX - box.minX + 1;
  const sh = box.maxY - box.minY + 1;
  const data = ctx.getImageData(box.minX, box.minY, sw, sh).data;
  let minX = sw;
  let minY = sh;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      if (data[(y * sw + x) * 4 + 3] < 20) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < minX) {
    minX = 0;
    minY = 0;
    maxX = sw - 1;
    maxY = sh - 1;
  }
  const pad = 2;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(sw - 1, maxX + pad);
  maxY = Math.min(sh - 1, maxY + pad);
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const out = canvas.getContext('2d');
  if (!out) throw new Error('Canvas is not available');
  out.drawImage(sheet, box.minX + minX, box.minY + minY, width, height, 0, 0, width, height);
  return { canvas, width, height };
}

function components(sheet: HTMLCanvasElement): Box[] {
  const ctx = sheet.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  const width = sheet.width;
  const height = sheet.height;
  const data = ctx.getImageData(0, 0, width, height).data;
  const count = width * height;
  const seen = new Uint8Array(count);
  const queue = new Int32Array(count);
  const boxes: Box[] = [];
  for (let start = 0; start < count; start++) {
    if (seen[start] || data[start * 4 + 3] < 24) continue;
    let head = 0;
    let tail = 0;
    queue[tail] = start;
    tail += 1;
    seen[start] = 1;
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let n = 0;
    while (head < tail) {
      const index = queue[head];
      head += 1;
      n += 1;
      const x = index % width;
      const y = (index / width) | 0;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const next = ny * width + nx;
          if (seen[next]) continue;
          seen[next] = 1;
          if (data[next * 4 + 3] < 24) continue;
          queue[tail] = next;
          tail += 1;
        }
      }
    }
    if (n > 2500) boxes.push({ minX, minY, maxX, maxY, n });
  }
  return boxes;
}

function quietCut(sheet: HTMLCanvasElement, box: Box, vertical: boolean): number {
  const ctx = sheet.getContext('2d', { willReadFrequently: true });
  const origin = vertical ? box.minY : box.minX;
  const sheetSpan = vertical ? sheet.height : sheet.width;
  const fallback = Math.round(sheetSpan / 2);
  if (!ctx) return fallback;
  const sw = box.maxX - box.minX + 1;
  const sh = box.maxY - box.minY + 1;
  const data = ctx.getImageData(box.minX, box.minY, sw, sh).data;
  const band0 = Math.floor(sheetSpan * 0.35);
  const band1 = Math.ceil(sheetSpan * 0.65);
  const start = Math.max(vertical ? box.minY : box.minX, band0);
  const end = Math.min(vertical ? box.maxY : box.maxX, band1);
  let bestAt = fallback;
  let best = Number.POSITIVE_INFINITY;
  for (let at = start; at <= end; at++) {
    const i = at - origin;
    let n = 0;
    if (vertical) {
      for (let x = 0; x < sw; x++) if (data[(i * sw + x) * 4 + 3] > 20) n += 1;
    } else {
      for (let y = 0; y < sh; y++) if (data[(y * sw + i) * 4 + 3] > 20) n += 1;
    }
    if (n < best) {
      best = n;
      bestAt = at;
    }
  }
  return bestAt;
}

/**
 * The sheet is a 2 by 2 pose grid, but the gutters are not at the exact halfway
 * line. Cut only a blob that actually crosses the middle, and cut near that
 * middle so a neck is not treated as the gap.
 */
function poseBoxes(sheet: HTMLCanvasElement): Box[] {
  const midX = sheet.width / 2;
  const midY = sheet.height / 2;
  const split = components(sheet).flatMap((box) => {
    let parts = [box];
    parts = parts.flatMap((part) => (
      part.minX < midX - 12 && part.maxX > midX + 12
        ? (() => {
          const cut = quietCut(sheet, part, false);
          return [{ ...part, maxX: cut }, { ...part, minX: cut + 1 }];
        })()
        : [part]
    ));
    return parts.flatMap((part) => (
      part.minY < midY - 12 && part.maxY > midY + 12
        ? (() => {
          const cut = quietCut(sheet, part, true);
          return [{ ...part, maxY: cut }, { ...part, minY: cut + 1 }];
        })()
        : [part]
    ));
  });
  return split
    .map((box) => ({ ...box, n: Math.max(1, (box.maxX - box.minX) * (box.maxY - box.minY)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 4);
}

function gridPoses(sheet: HTMLCanvasElement): [CutSprite, CutSprite, CutSprite, CutSprite] {
  const boxes = poseBoxes(sheet);
  const midY = sheet.height / 2;
  const top = boxes.filter((box) => (box.minY + box.maxY) / 2 < midY).sort((a, b) => a.minX - b.minX);
  const bottom = boxes.filter((box) => (box.minY + box.maxY) / 2 >= midY).sort((a, b) => a.minX - b.minX);
  const ordered = top.length === 2 && bottom.length === 2
    ? [...top, ...bottom]
    : [...boxes].sort((a, b) => a.minY - b.minY || a.minX - b.minX);
  if (ordered.length < 4) throw new Error('The gorilla sheet did not separate into four poses');
  const sprites = ordered.slice(0, 4).map((box) => crop(sheet, box));
  return [sprites[0], sprites[1], sprites[2], sprites[3]];
}

export async function loadSummitArt(): Promise<SummitArt> {
  const [dad, baby, bird, mountain] = await Promise.all([
    loadImage(dadUrl),
    loadImage(babyUrl),
    loadImage(birdUrl),
    loadImage(mountainUrl),
  ]);
  const dadSheet = drawSource(dad, dad.width, dad.height);
  const babySheet = drawSource(baby, baby.width, baby.height);
  const birdSheet = drawSource(bird, bird.width, bird.height);
  floodClear(dadSheet);
  floodClear(babySheet);
  floodClear(birdSheet);
  const birdBox = components(birdSheet).sort((a, b) => b.n - a.n)[0];
  if (!birdBox) throw new Error('The bird picture had no subject');
  return {
    mountain,
    dad: gridPoses(dadSheet),
    baby: gridPoses(babySheet),
    bird: crop(birdSheet, birdBox),
  };
}
