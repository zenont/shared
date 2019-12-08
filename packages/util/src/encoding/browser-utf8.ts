/* Array of bytes to base64 string decoding */

function b64ToUint6(nChr: number) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
    ? nChr - 71
    : nChr > 47 && nChr < 58
    ? nChr + 4
    : nChr === 43
    ? 62
    : nChr === 47
    ? 63
    : 0
}

export function base64DecToArr(sBase64: string, nBlockSize?: number) {
  let sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ''),
    nInLen = sB64Enc.length,
    nOutLen = nBlockSize
      ? Math.ceil(((nInLen * 3 + 1) >>> 2) / nBlockSize) * nBlockSize
      : (nInLen * 3 + 1) >>> 2,
    aBytes = new Uint8Array(nOutLen)

  for (
    let nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
    nInIdx < nInLen;
    nInIdx++
  ) {
    nMod4 = nInIdx & 3
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (18 - 6 * nMod4)
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        aBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255
      }
      nUint24 = 0
    }
  }

  return aBytes
}

/* UTF-8 array to DOMString and vice versa */

export function UTF8ArrToStr(aBytes: Uint8Array) {
  let sView = ''

  for (let nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
    nPart = aBytes[nIdx]
    sView += String.fromCharCode(
      nPart > 251 && nPart < 254 && nIdx + 5 < nLen /* six bytes */
        ? /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
          (nPart - 252) * 1073741824 +
            ((aBytes[++nIdx] - 128) << 24) +
            ((aBytes[++nIdx] - 128) << 18) +
            ((aBytes[++nIdx] - 128) << 12) +
            ((aBytes[++nIdx] - 128) << 6) +
            aBytes[++nIdx] -
            128
        : nPart > 247 && nPart < 252 && nIdx + 4 < nLen /* five bytes */
        ? ((nPart - 248) << 24) +
          ((aBytes[++nIdx] - 128) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 239 && nPart < 248 && nIdx + 3 < nLen /* four bytes */
        ? ((nPart - 240) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 223 && nPart < 240 && nIdx + 2 < nLen /* three bytes */
        ? ((nPart - 224) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 191 && nPart < 224 && nIdx + 1 < nLen /* two bytes */
        ? ((nPart - 192) << 6) + aBytes[++nIdx] - 128 /* nPart < 127 ? */
        : /* one byte */
          nPart
    )
  }

  return sView
}

export function strToUTF8Arr(sDOMStr: string) {
  let aBytes,
    nChr,
    nStrLen = sDOMStr.length,
    nArrLen = 0

  /* mapping... */

  for (let nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
    nChr = sDOMStr.charCodeAt(nMapIdx)
    nArrLen +=
      nChr < 0x80
        ? 1
        : nChr < 0x800
        ? 2
        : nChr < 0x10000
        ? 3
        : nChr < 0x200000
        ? 4
        : nChr < 0x4000000
        ? 5
        : 6
  }

  aBytes = new Uint8Array(nArrLen)

  /* transcription... */

  for (let nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
    nChr = sDOMStr.charCodeAt(nChrIdx)
    if (nChr < 128) {
      /* one byte */
      aBytes[nIdx++] = nChr
    } else if (nChr < 0x800) {
      /* two bytes */
      aBytes[nIdx++] = 192 + (nChr >>> 6)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } else if (nChr < 0x10000) {
      /* three bytes */
      aBytes[nIdx++] = 224 + (nChr >>> 12)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } else if (nChr < 0x200000) {
      /* four bytes */
      aBytes[nIdx++] = 240 + (nChr >>> 18)
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } else if (nChr < 0x4000000) {
      /* five bytes */
      aBytes[nIdx++] = 248 + (nChr >>> 24)
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    } /* if (nChr <= 0x7fffffff) */ else {
      /* six bytes */
      aBytes[nIdx++] = 252 + (nChr >>> 30)
      aBytes[nIdx++] = 128 + ((nChr >>> 24) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63)
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63)
      aBytes[nIdx++] = 128 + (nChr & 63)
    }
  }

  return aBytes
}
