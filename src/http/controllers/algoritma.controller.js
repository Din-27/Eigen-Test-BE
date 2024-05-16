exports.ReverseAlphabet = (req, res) => {
    try {
        const { chars } = req.body
        const Cleansing = (char) => char.join().replace(/\,/gm, '')
        const result = Cleansing(chars.match(/[a-z]|[A-Z]/gm).reverse()) + Cleansing(chars.match(/[0-9]/gm))
        return res.status(200).send({ result })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error Server' })
    }
}

exports.LongestSentence = (req, res) => {
    try {
        const { chars } = req.body
        let result = ''
        chars.forEach(char => {
            if (char.length > result.length) {
                result = char;
            }
        });
        return res.status(200).send({ result })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error Server' })
    }
}

exports.FamousShowing = (req, res) => {
    try {
        const { input, query } = req.body
        const container = {};
        input.forEach(x => {
            if (container[x]) {
                container[x]++;
            } else {
                container[x] = 1;
            }
        });
        const result = query.map(x => container[x] || 0);
        return res.status(200).send({ result })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error Server' })
    }
}

exports.MatrixNxN = (req, res) => {
    try {
        const { matrix } = req.body
        const n = matrix.length;
        let diagonal1 = 0;
        let diagonal2 = 0;

        for (let i = 0; i < n; i++) {
            diagonal1 += matrix[i][i];
            diagonal2 += matrix[i][n - 1 - i];
        }
        const result = Math.abs(diagonal1 - diagonal2);
        return res.status(200).send({ result })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error Server' })
    }
}