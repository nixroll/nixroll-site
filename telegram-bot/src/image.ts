/**
 * Минимальный разбор заголовков изображений — без библиотек (в Workers их
 * ставить неоткуда). Нужно только чтобы узнать формат/размеры файла,
 * присланного через "Отправить как файл" (Telegram не даёт width/height
 * для document, в отличие от photo).
 */
export type ImageInfo = { width: number; height: number; ext: "jpg" | "png" | "webp" };

export function detectImage(bytes: Uint8Array): ImageInfo | null {
  return (
    tryPng(bytes) ?? tryJpeg(bytes) ?? tryWebp(bytes)
  );
}

function readU32BE(b: Uint8Array, o: number): number {
  return (b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3];
}
function readU16BE(b: Uint8Array, o: number): number {
  return (b[o] << 8) | b[o + 1];
}
function readU16LE(b: Uint8Array, o: number): number {
  return b[o] | (b[o + 1] << 8);
}

function tryPng(b: Uint8Array): ImageInfo | null {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (b.length < 24 || !sig.every((v, i) => b[i] === v)) return null;
  return { width: readU32BE(b, 16) >>> 0, height: readU32BE(b, 20) >>> 0, ext: "png" };
}

function tryJpeg(b: Uint8Array): ImageInfo | null {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < b.length) {
    if (b[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = b[offset + 1];
    // SOF0..SOF15, кроме DHT(C4)/JPG(C8)/DAC(CC) — это как раз кадры с размерами.
    const isSof =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    const segmentLength = readU16BE(b, offset + 2);
    if (isSof) {
      const height = readU16BE(b, offset + 5);
      const width = readU16BE(b, offset + 7);
      return { width, height, ext: "jpg" };
    }
    if (marker === 0xd8 || marker === 0xd9) {
      offset += 2;
      continue;
    }
    offset += 2 + segmentLength;
  }
  return null;
}

function tryWebp(b: Uint8Array): ImageInfo | null {
  if (b.length < 30) return null;
  const isRiff = b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46;
  const isWebp = b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50;
  if (!isRiff || !isWebp) return null;
  const chunk = String.fromCharCode(b[12], b[13], b[14], b[15]);
  if (chunk === "VP8 ") {
    const width = readU16LE(b, 26) & 0x3fff;
    const height = readU16LE(b, 28) & 0x3fff;
    return { width, height, ext: "webp" };
  }
  if (chunk === "VP8L") {
    // VP8L хранит 14-битные width-1/height-1 в little-endian порядке байт.
    const val = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24);
    const width = (val & 0x3fff) + 1;
    const height = ((val >> 14) & 0x3fff) + 1;
    return { width, height, ext: "webp" };
  }
  if (chunk === "VP8X") {
    const width = ((b[24] | (b[25] << 8) | (b[26] << 16)) & 0xffffff) + 1;
    const height = ((b[27] | (b[28] << 8) | (b[29] << 16)) & 0xffffff) + 1;
    return { width, height, ext: "webp" };
  }
  return null;
}
