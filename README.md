## Express App with Typescript

This Express App API uses MongoDb user authentication and accessing sample data.

To use this repository:

```
git clone https://github.com/raishudesu/express-app-ts
```

## Move to its directory:

```
cd express-app-ts
```

## Install dependencies:

```
npm install
```

**Note:**
Create your own .env file and add `PORT` and `MONGO_URI`

Example:

```
PORT=400
MONGO_URI=mongodb+srv://<yourMongoDbUsername>:<yourMongoDbPassword>@expressapp.plphetj.mongodb.net/
```

Use your own MongoDb Atlas link.

## Run the server:

```
npm run dev
```

## Host the Express App with Vercel

Vercel Hosting configuration is already set in this app. You can directly host this in Vercel.
