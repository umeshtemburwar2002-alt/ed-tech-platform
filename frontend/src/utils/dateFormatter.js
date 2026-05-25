export const formattedDate = (date) => {
  if (!date) return null
  const d = new Date(date)
  if (isNaN(d.getTime())) return null
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}