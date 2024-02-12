import { DateTime } from 'luxon'

export function excludeById(array, id) {
  return array.filter((item) => item.id !== id)
}

export function getTodayStr() {
  let today = new Date().toISOString().replace(/T.*$/, '')
  console.log('today:', today)
  return today
}

export const getDateTime = (data) => {
  return DateTime.fromObject(
    {
      day: data.day,
      month: data.month,
      year: data.year,
      hour: data.hour ?? 12,
      minute: data.minutes ?? 0,
    },
    { zone: data.zone }
  ).toISO({ includeOffset: false })
}
