

const expr = /^[9]\d{12}$/

const validateRegex = (val) => expr.exec(val)

const toIsbnDigits =(isbn)=> {
    return [...isbn].map(char => Number.parseInt(char));
}

const validateChecksum = (isbn) => {
    console.log('isbn',isbn)
    const numArr = toIsbnDigits(isbn)
    const lastDigit = numArr.pop();
    const  factor =(x)=> {
        return (x % 2 === 0) ? 1 : 3;
    } 
    console.log('lst digig',lastDigit)
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        console.log(numArr[i])
        sum += factor(i)*numArr[i]
    }
    console.log(sum)
    console.log(sum%10)
    let computedLast = (10 - (sum % 10))%10
   
    console.log('computed',computedLast)

    // return lastDigit === computedLast;
    return computedLast===lastDigit;

}

const validateIsbn = (isbn) => {
    return validateRegex(isbn) && validateChecksum(isbn)
}

export default validateIsbn
