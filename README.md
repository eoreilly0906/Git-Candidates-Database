# Git Candidates Database

A web application for searching and managing potential GitHub candidates.

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd Git-Candidates-Database
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Generate a GitHub Personal Access Token:
     1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens > Fine-grained tokens](https://github.com/settings/tokens)
     2. Click "Generate new token"
     3. Set the following:
        - Token name: "Git-Candidates-Database"
        - Expiration: Choose your preferred duration
        - Repository access: "All repositories" or select specific ones
        - Permissions:
          - Account permissions > User: Read-only
          - Account permissions > Email addresses: Read-only
     4. Click "Generate token"
     5. Copy the generated token
   - Edit `.env.local` and replace `your_github_token_here` with your actual token

4. Start the development server
```bash
npm run dev
```

## Features

- Search through GitHub users
- View detailed user information
- Save potential candidates
- View saved candidates list

## Environment Variables

- `VITE_GITHUB_TOKEN`: GitHub Personal Access Token (required)
  - Required permissions: `read:user`, `user:email`
  - Generate at: https://github.com/settings/tokens
