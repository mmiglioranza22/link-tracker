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

## Example

### POST - /create

![Link creation](/public/POST.png)

### GET - /

![Fetching all links](/public/GET-all-links.png)

### GET - /l/:id/stats

![Fetching a specific link stats](/public/GET-link-stats.png)

### PUT - /l/:id

![Modifying a links validation](/public/PUT.png)
