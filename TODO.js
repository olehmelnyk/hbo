1) jwt auth
2) xml responses
3) voting
-----------
/*

all api requests should go to:
localhost:3000/api/v1/...

                    .../auth/login  POST (not implemented)
                    .../auth/signup POST (not implemented)

                    .../user       GET - list of all users
                    .../user/:id   GET - returns user by id
                    .../user       POST - creates new user
                    .../user/id    PUT - updates user by id
                    .../user/id    DELETE - deletes user by id

                    .../show       GET - list of all shows
                    .../show/:id   GET - returns show by id
                    .../show       POST - creates new show
                    .../show/id    PUT - updates show by id
                    .../show/id    DELETE - deletes show by id

                    .../season       GET - list of all seasons
                    .../season/:id   GET - returns season by id
                    .../season       POST - creates new season
                    .../season/id    PUT - updates season by id
                    .../season/id    DELETE - deletes season by id

                    .../episode       GET - list of all episodes
                    .../episode/:id   GET - returns episode by id
                    .../episode       POST - creates new episode
                    .../episode/id    PUT - updates episode by id
                    .../episode/id    DELETE - deletes episode by id

*/

---------------------
// examples:

// create a new show
fetch('http://localhost:3000/api/v1/show', {
    method: "POST",
    body: {
        title: "Game of Thrones",
        subtitle: "The winter is coming",
        startDate: new Date(),
        image: {
            square: "https://google.com.ua",
            wide: "https://google.com.ua",
            extraWide: "https://google.com.ua",
        },
        trailer: "https://youtube.com/got",
        description: {
            short: "this is short description",
            long: "and this is long description"
        },
        priority: true
    },
    headers: new Headers({
        "Content-type": "application/json"
    })
}).then(response => {
        if (response.status !== 201) {
            console.error(response.statusText);
            return;
        }

        return response.json();
    })
    .then(show => {
        console.log(show)
    })
    .catch(error => console.error(error))



// get list of all shows
fetch('http://localhost:3000/api/v1/show')
    .then(response => {
        if (response.status !== 200) {
            console.error(response.statusText);
            return;
        }

        return response.json();
    })
    .then(shows => {
        console.log(shows);
    })
    .catch(error => console.error(error))



// update show by id
fetch('http://localhost:3000/api/v1/show/394w3222if023f', {
    method: "PUT",
    body: {
        title: "Game of Thrones",
        subtitle: "The winter is coming!",
        startDate: new Date(),
        image: {
            square: "https://google.com.ua/got",
            wide: "https://google.com.ua/got",
            extraWide: "https://google.com.ua/got",
        },
        trailer: "https://youtube.com/got",
        description: {
            short: "this is updated short description",
            long: "and this is updated long description"
        },
        priority: false
    }
}).then(response => {
        if (response.status !== 200) {
            console.error(response.statusText);
            return;
        }

        return response.json();
    })
    .then(show => {
        console.log(show)
    })
    .catch(error => console.error(error))

// delete show by id
fetch('http://localhost:3000/api/v1/show/394w3222if023f', {
    method: "DELETE"
}).then(response => {
        if (response.status !== 200) {
            console.error(response.statusText);
            return;
        }

        console.log(show);
    })
    .catch(error => console.error(error))
