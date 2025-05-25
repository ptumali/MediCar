# Getting Started

# Step 1: Set up a Virtual Environment

```
python -m venv venv
./venv/Scripts/activate
```

Install the library dependencies by running `pip install -r requirements.txt`

# Step 2: Run the Retrieval Model

```
python -m retrieval_system.retrieval
```

# Step 3: Set up the backend API server

First go to the root directory
```bash
cd MediCar/
```
Second run the flask server
```bash
python -m backend.run
```

# Step 4: Set up libraries for Frontend

First, go into the frontend directory

```bash
cd frontend
```

Second, install the dependencies

```bash
npm install
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

