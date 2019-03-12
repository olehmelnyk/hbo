- landing page
- registration/auth pages
- nav bar
- move all styles to separate files
- code cleanup and refactroing 😅

Public Rotes:
/ - landing page with featured only shows
/show - list of all shows
/show/:showExcerpt - details about single show

/login - login page
/register - registration page

Private routes: (auth & admin privileges required - you can login as "john.doe@gmail.com" and pass "qwerty" to get admin access):
/admin/user - list for registered users
/admin/user/:userId - page with info about specific user
/admin/user/:userId/edit - edit user form
/admin/user/add - form for creating a new user

/admin/show - list of all tv-shows
/admin/show/add - form for adding new tv show
/admin/show/:showExcerpt - page with info about single show
/admin/show/:showExcerpt/edit - form for eding tv show
/admin/show/:showExcerpt/season - list of all tv seasons
/admin/show/:showExcerpt/season/add - form for adding a new season
/admin/show/:showExcerpt/season/:seasonId - page with info about specific season
/admin/show/:showExcerpt/season/:seasonId/edit - form for editing a season
/admin/show/:showExcerpt/season/:seasonId/episode - list of all season episodes
/admin/show/:showExcerpt/season/:seasonId/episode/:episodeExcerpt - page with info about specific episode
/admin/show/:showExcerpt/season/:seasonId/episode/:episodeExcerpt/edit - form for editing episode
/admin/show/:showExcerpt/season/:seasonId/episode/:episodeExcerpt/add - form for adding a new episode
