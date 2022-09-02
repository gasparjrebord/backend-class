function generateRandomNumbers(n) {
    const randomNumbers = [];
    for (let i = 0; i < n; i++) {
        randomNumbers.push(Math.floor(Math.random() * 1000))
    };
    return randomNumbers;
};
const calcularRepeticiones = (quantity) => {
    const arr = generateRandomNumbers(quantity)
    const res = {}
    for(let i of arr) {
        res[i]? res[i]++: res[i] = 1
    }
    return res;
};

process.on('message', (message) => {
    const res = calcularRepeticiones(message);
    process.send(res);
});