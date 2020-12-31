This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Image Search Prototype

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Create a README that documents the assumptions and decisions that you have
made in designing the architecture of your site.

## Prototype site architecture

- This is a basic Next.js / React app, so the architecture is fairly out of the box
- React components are under /components
- Server helper code is under /lib
- CSS is stored in one global file, because of the small scale of this prototype
- The API code is found under /pages/api
- Sensitive data is stored as environment variables
- axios is used to simplify making requests on both the client and server

## autocorrect code
The autocorrect code is based on these basic requirements:
Your spell checker should perform these specific kinds of typo corrections (and
only these):
- Remove non-letter characters. 'nyl;on' should auto-correct to ‘nylon'
- Mistyped vowels. 'ceku' should auto-correct to ‘cake'

If I had a little more time, I would make sure that the server is caching in memory the result of categorizing the dictionary that I used. 













## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
