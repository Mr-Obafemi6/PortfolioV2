// Mini générateur de PDF : 1 page contenant 1 image JPEG (aucune librairie nécessaire).
export function jpegToPdf(jpegBytes, imgW, imgH, pageW, pageH) {
  const enc = new TextEncoder()
  const parts = []
  const offsets = []
  let len = 0
  const push = (x) => {
    const b = typeof x === 'string' ? enc.encode(x) : x
    parts.push(b)
    len += b.length
  }
  const obj = (n, body) => {
    offsets[n] = len
    push(`${n} 0 obj\n`)
    body()
    push('\nendobj\n')
  }

  const content = `q ${pageW} 0 0 ${pageH} 0 0 cm /Im0 Do Q`

  push('%PDF-1.4\n')
  obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'))
  obj(2, () => push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'))
  obj(3, () =>
    push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] ` +
        `/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`
    )
  )
  obj(4, () => {
    push(
      `<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
    )
    push(jpegBytes)
    push('\nendstream')
  })
  obj(5, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`))

  const xref = len
  push('xref\n0 6\n0000000000 65535 f \n')
  for (let i = 1; i <= 5; i++) push(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`)
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`)

  return new Blob(parts, { type: 'application/pdf' })
}
