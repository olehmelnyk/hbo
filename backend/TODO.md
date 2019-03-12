- implement rating (only authrized users can vote)
- return data as xml
- optimize DB queries
- move all configurations to config file
- massive code cleanup and refactoring 😅

Rotes:
/api/v1/auth/login POST
/api/v1/auth/register POST
/api/v1/auth/me GET - returns some info from the jwt-token

/api/v1/user/ GET - returns list of all users (probably should be protected, for admins only)

/api/v1/user/:userId GET - specific user
/api/v1/user/ POST - creates a new user (deprecated, use /api/v1/auth/register instead)
/api/v1/user/:userId PUT - update specific user
/api/v1/user/:userId DELETE - delete specific user

/api/v1/show/ GET - returns list of all tv shows
/api/v1/show/ POST - create a new show
/api/v1/show/featured GET - returns a list of featured tv shows
/api/v1/show/:showExcerpt GET - return specific show
/api/v1/show/:showExcerpt PUT - update specific show
/api/v1/show/:showExcerpt DELETE - delete specific show

/api/v1/season/ GET - returns list of all seasons
/api/v1/season/ POST - create a new season
/api/v1/season/:seasonExcerpt GET - return specific season
/api/v1/season/:seasonExcerpt PUT - update specific season
/api/v1/season/:seasonExcerpt DELETE - delete specific season

/api/v1/episode/ GET - returns list of all episodes
/api/v1/episode/ POST - create a new episode
/api/v1/episode/:episodeExcerpt GET - return specific episode
/api/v1/episode/:episodeExcerpt PUT - update specific season
/api/v1/episode/:episodeExcerpt DELETE - delete specific episode
