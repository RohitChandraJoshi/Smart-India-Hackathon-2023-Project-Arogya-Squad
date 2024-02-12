// const WordLimitInput = ({ maxWords }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     // Split the input value into an array of words
//     const words = value.split(/\s+/);

//     let truncatedValue = value;

//     // If the number of words exceeds the limit, truncate and add "..."
//     if (words.length > maxWords) {
//       truncatedValue = words.slice(0, maxWords).join(" ") + "...";
//     }

//     setInputValue(truncatedValue);
//   };
// };
