This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies with `yarn`:

```
yarn
```

And run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.mdx`. The page auto-updates as you edit the file.

## Styles

This project uses [TailwindCSS](https://tailwindcss.com/) with [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) and [Tailwind UI](http://tailwindui.com/) plugins for styling, and [Framer Motion](https://www.framer.com/api/motion/) for animations.

## View Content in Dev without logging in

You can set the `NEXT_PUBLIC_DISABLE_LOGIN_FOR_DEV=true` env variable to view the content without logging in when the `NODE_ENV === 'development`.

You may also get a production access key from the egghead team and paste it into `NEXT_PUBLIC_DEV_USER_TOKEN`. This will log you into the use associated with this access token.

## Logging In

To log in, you need to have a purchase associated with the log in email.

Once you have a purchase, head over to the `/login` page and enter your email.

If you are in production, you should receive an email with a log in link.

If you are running local development, the log in link will be copied to your clipboard and printed to the console of the `egghead-rails` server.

## Purchasing

To purchase a package, head over to the `/buy` page. Click buy and you will be navigated to a Stripe Checkout Session. Fill out your information and click purchase (in dev you can use `4242 4242 4242 4242` as a fake card). You'll then be navigated back to the `/thanks` page with a message about your purchase.

If you testing locally, you will need these values filled out in your `.env.development`:

```
NEXT_PUBLIC_STRIPE_TOKEN=stripe-public-key
STRIPE_SECRET_TOKEN=stripe-secret-key
NEXT_PUBLIC_SUPPORT_EMAIL=team@justjavascript.com
NEXT_PUBLIC_STRIPE_CHECKOUT_SESSIONS_URL=http://egghead.af:5000/api/v1/stripe/session
NEXT_PUBLIC_STRIPE_CHECKOUT_SESSIONS_SUCCESS_URL=http://localhost:3000/thanks?session_id={CHECKOUT_SESSION_ID}
NEXT_PUBLIC_STRIPE_CHECKOUT_SESSIONS_CANCEL_URL=http://localhost:3000
BUNDLE_BUDDY_TOKEN=bundle-buddy-egghead-user-access-token
```

You'll most likely want to run `yarn build:data:dev` in the root of this directory to get the bundle data the `/buy` page needs. Check the **database** section for more information.

### Local Rails database

`rails staging:update_local_dev_database` in your `egghead-rails` directory to get the latest DB. Then you will need to run the migration task: `rails db:migrate:with_data`.

The DB updater needs github creds that go in `~/.netrc`:

```
machine api.github.com
  login USERNAME
  password SECRET
```

**Setup bundle buddy bot**

Get your `BUNDLE_BUDDY_TOKEN` in your `.env.development`. This can be generated by logging into your rails console with `rails c` and:

```
user = User.find_by_email('bundle.buddy+bot@egghead.io')
user.access_tokens.create
```

Make sure bundle buddy has the `:bundler` role.

```ruby
user = User.find_by_email('bundle.buddy+bot@egghead.io')
user.roles.map(&:name)
# => ["user", "bundler"]
# if bundler isnt in that array:
user.add_role :bundler
```

## Set up Firebase

### Set up Firebase Application

This section will describe how to get the correct values for these variables:

```
FIREBASE_PUBLIC_API_KEY
FIREBASE_PROJECT_ID
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
```

**You likely won't need to create a project**. Contact the egghead team if you need access to the firebase datastore.

Create a Firebase project: click `add project` on [this page](https://console.firebase.google.com/u/0/).

Now you need to add an `App` to your project. You can choose from `iOs`, `Android`, `Web`, or `Unity`.

We want the web option. There will be a `</>` icon, click this and you will start the app creation flow.

1. Name the app whatever you want
   1. you dont need firebase hosting
2. Click register app

Now youll be presented with code that looks like this:

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: 'AIzaSyB6tKhpnB9baUxR8FVC90-gLbERVu_q-uo',
    authDomain: 'test-5398a.firebaseapp.com',
    projectId: 'test-5398a',
    storageBucket: 'test-5398a.appspot.com',
    messagingSenderId: '653030811583',
    appId: '1:653030811583:web:5931db3465d6125688e30a',
    measurementId: 'G-JJXDVMKM9W',
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
</script>
```

Heres how the values map to one another:

```
FIREBASE_PUBLIC_API_KEY=apiKey
FIREBASE_PROJECT_ID=projectId
FIREBASE_MESSAGING_SENDER_ID=messagingSenderId
FIREBASE_APP_ID=appId
```

Resulting in something that looks like this:

```
FIREBASE_PUBLIC_API_KEY=AIzaSyB6tKhpnB9baUxR8FVC90-gLbERVu_q-uo
FIREBASE_PROJECT_ID=test-5398a
FIREBASE_MESSAGING_SENDER_ID=653030811583
FIREBASE_APP_ID=1:653030811583:web:5931db3465d6125688e30a
```

Paste this into your `.env.development` and restart the next server if it's running. You won't need the other values.

### Firebase Admin SDK keys

In this section, we will be grabbing the correct keys for the Firebase Admin SDK. These keys are private so you will need to ask for the keys or generate them yourself.

These are the env variables we will fill:

```
FIREBASE_ADMIN_PRIVATE_KEY=firebase-admin-private-key
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-admin-client-email
```

First click the cog then "Project Settings" in the sidebar. Next navigate to the "Service Accounts" section.

Now, press "generate new private key" and a json file will be downloaded.

You will need the `private_key` and `client_email` fields in this json file.

Now you can fill out the values in `.env.development`:

```
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...some really long key...-----END PRIVATE KEY-----\n",
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-16nfh@test-5398a.iam.gserviceaccount.com
```

Restart the next server if it's running!

Now you're app can authenticate logged in egghead users and post their quiz answers to firestore.

### Firebase Authentication

1. Navigate to the "Authentication" tab
2. Click "Get Started"

Thats it 👀

### Firestore Rules

1. Navigate to "Firestore" tab in the side bar
2. Click the "rules" tab

Past this code in:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{contact_id} {
      allow read, write: if contact_id == request.auth.uid
    }
  }
}
```

We are setting the `auth.uid` to be the `eggheadUser.contact_id`. We are also setting the document id as the `eggheadUser.contact_id` in the Firestore collection. So if the auth object coming in contains the `contact_id` then we know this user matches up with the document and they can read/write to it.

### Firestore Data

1. Navigate to the "Firestore" tab in the side bar
2. Click "Start Collection"
3. name the collection `users`
4. add the "Document ID" of `test_id` to add the first document in the collection
