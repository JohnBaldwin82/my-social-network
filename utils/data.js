const names = ['Connor', 'Harper', 'Ariana', 'Chris', 'Cayden', 'Christine', 'Carl']

const thoughtText = [
    'How is everyone doing today?',
    'What time are you home?',
    'When is your next class?',
    'Im so excited for my next trip!',
]

const getSomeArrText = (arr) =>[Math.floor(Math.random() * arr.length)]

const getSomeName = () => `${getSomeArrText(names)}`

const getSomeEmail = () => {
    const someNum = Math.floor(Math.random() * 1200)
    return `${getSomeName().split(" ").join(".")}${someNum}@email.com`
}

const getSomeThoughtText = () => getSomeArrText(thoughtText)

const getSomeUser = (int) => {
    const results = []
    for (let i = 0; i < int; i++) {
        results.push({
            username: `${getSomeArrText(names)}`,
            email: getSomeEmail
        })
    }
    return results
}

const getSomeThought = (user, int) => {
    const results = []
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getSomeThoughtText(),
            username: getSomeArrText
        })
    }
    return results
}

module.exports = {getSomeUser, getSomeThought}