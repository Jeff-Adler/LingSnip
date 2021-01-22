const test = require('jest');
const User = require('../src/models/user')

describe("User creation", async () => {
    test('Should create user with valid credentials', () => {
        const userObj = {
            name: "Jeff",
            email: "Jeff.Test@gmail.com",
            password: "Blx4352!aDG",
            age: 43,
            nativeLanguages: 'Spanish',
            otherLanguages: 'Japanese'
        }
        const user = new User(userObj)
        expect(await user.save()).toBe(truthy)
    })

    test('Should not create user with invalid credentials', () =>{
        
    })
});