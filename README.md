## Description

Link tracker created with [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Postman API ([access the shared workspace](https://www.postman.com/orbital-module-astronomer-66959558/workspace/link-tracker/overview))

Once you've installed and spinned up the application, you can use the Postman API to create links, fetch them all, fetch them individually (if you copy and paste them in the browser directly or click on the `target` link, you will be redirected), check their stats (times they've been clicked) and modify their validation (if a link is invalidated, its stats will not change unless it is validated again).

All data is persisted in memory, so killing the application will make it start with no existing links.

Links can be created with a `password` in the request body that will be attached as a query param for the redirected target url.

Links can be created with a Date for them to expire in the `expires` request body prop. Expired links will not redirect to their target url, nor modify their stats, regardless or not them being valid. For `expires` use a propper JSON format (`2012-04-23T18:25:43.511Z`) and mind UTC difference.(-3)

## Example

### POST - /create

![Link creation](/public/POST.png)
![Link creation with expire](/public/POST-expires.png)

### GET - /

![Fetching all links](/public/GET-all-links.png)

### GET - /l/:id/stats

![Fetching a specific link stats](/public/GET-link-stats.png)

### PUT - /l/:id

![Modifying a links validation](/public/PUT.png)

### Errors

![Invalid link](/public/ERROR.png)
