export function isAlphaOnly(str) {
    // Regular expression to match only alphabetic characters
    
    const alphaRegex = /^[a-zA-Z]+$/;
    
    // Test if the string matches the pattern
    return alphaRegex.test(str);
  }