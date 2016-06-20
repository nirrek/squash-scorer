const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// prettyPrint :: Date -> string
// Given a date produces a pretty printed strign of the form `20 Mar 2016`
export default function prettyPrint(date) {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
