# What is this?

This is my solution to the the [Product List With Cart Challenge](https://www.frontendmentor.io/challenges/product-list-with-cart) On [Frontend Mentor](https://www.frontendmentor.io)! <br/>
I do not own any of the design of the website

# Features
- Web Frontend with NextJS. (WIP: Responsiveness on mobile currently not supported)
- Prisma + Postgresql to hold list of products and submitted carts.
- (WIP) Docker Image for deployment

# TODO
- Add Mobile Responsiveness
- Finished Docker Image for deployment

# How to run
Since the web is not deployed currently, here is how you may want to check out the project <br/>
I apologize that the step to run is currently quite long. I'm working on deploying it to a working site with docker atm. <br/>

1. The solution requires Docker to setup postgres, make sure it is installed

2. Clone the Repo 
```
git clone git@github.com:SupakornSJB/frmt-product-list-with-cart.git
```

3. Start docker container for postgres in the ./docker/database
```
cd frmt-product-list-with-cart/docker/database
docker compose up
```

4. Create the .env file at the root of the repo, see the example of the file below

```
DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:5432/{POSTGRES_DB}?schema=public"

POSTGRES_USER=/*INSERT_SOMETHING_HERE*/
POSTGRES_PASSWORD=/*INSERT_SOMETHING_HERE*/
POSTGRES_DB=/*INSERT_SOMETHING_HERE*/

PGADMIN_DEFAULT_EMAIL=/*INSERT_SOMETHING_HERE*/
PGADMIN_DEFAULT_PASSWORD=/*INSERT_SOMETHING_HERE*/
```

5. Run `npx prisma db push`, to setup prisma

6. Run `npm run dev`, the web should be visible on `localhost:3000`, but now we have to setup the products list in the database

7. Run the following code in the `app/page.tsx` file to setup the product list in the database,
```
// Setup for Items in DB, Uncomment to use, Need to run only once
// import jsonItem from "@/public/data.json"
// import { addItemsToDB } from "@/utils/addToDb";
// addItemsToDB(jsonItem);
```

8. You can also check the state of the database with pgAdmin on `localhost:8080`
