export const formatNationalId = (val: string) => {
  const v = val.replace(/\D/g, "").slice(0, 14)
  const parts = []
  if (v.length > 0) parts.push(v.slice(0, 1))
  if (v.length > 1) parts.push(v.slice(1, 3))
  if (v.length > 3) parts.push(v.slice(3, 5))
  if (v.length > 5) parts.push(v.slice(5, 7))
  if (v.length > 7) parts.push(v.slice(7, 9))
  if (v.length > 9) parts.push(v.slice(9, 12))
  if (v.length > 12) parts.push(v.slice(12, 14))
  return parts.join(" ")
}

export const formatMobile = (val: string) => {
  const v = val.replace(/\D/g, "").slice(0, 11)
  const parts = []
  if (v.length > 0) parts.push(v.slice(0, 3))
  if (v.length > 3) parts.push(v.slice(3, 7))
  if (v.length > 7) parts.push(v.slice(7, 11))
  return parts.join(" ")
}

export const formatCardNumber = (val: string) => {
  const v = val.replace(/\D/g, "").slice(0, 16);
  const parts = []
  for (let i= 0; i < v.length; i+=4) {
    parts.push(v.slice(i, i + 4));
  }
  return parts.join(" ");
}

export const parseRawValue = (val: string) => val.replace(/\D/g, "")
