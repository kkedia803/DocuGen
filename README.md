# 📚 DocuGen

> Connect your GitHub repositories and generate rich, structured documentation — API Docs, READMEs, technical reports, or even thesis-level documents — all in one place.

---

## 🚀 Features

- 🔗 **GitHub Integration**: Connect with your GitHub account to fetch repositories.
- 🧠 **AI-powered Documentation**: Generate high-quality:
  - API Documentation
  - README files
  - Technical Reports
  - Thesis-style Documentation
- ✍️ **Custom Prompt Support**: Tailor the documentation with your own instructions.
- 💾 **Save & Manage Docs**: Store generated docs in your database for future access.
- ⚡ **Fast & Serverless**: Built on **Next.js App Router** and deployed via **Vercel**.
- 🗃️ **Relational Database**: Uses **Prisma ORM** for clean and scalable data management.

---

## 🛠️ Tech Stack

| Tech            | Usage                              |
|-----------------|-------------------------------------|
| **Next.js**     | Frontend + Backend (App Router)     |
| **Prisma**      | ORM for PostgreSQL / MySQL          |
| **NextAuth**    | GitHub OAuth integration            |
| **Tailwind CSS**| UI styling                          |
| **Vercel**      | Hosting & CI/CD                     |
| **OpenAI API**  | (Optional) Used for content generation |

---

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/kkedia803/DocuGen.git
cd Docugen
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Setup .env file


```bash
# Database connection
DATABASE_URL="your_database_connection_string"

# GitHub OAuth (for NextAuth)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# NextAuth
NEXTAUTH_SECRET="a_random_secret"
NEXTAUTH_URL="http://localhost:3000" # or your live URL

# Optional: OpenAI (if using AI-generated text)
OPENAI_API_KEY="your_openai_api_key"
```

### 4. Setup Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the App

```bash
npm run dev
```

## 🧠 How It Works

#### 1. User logs in with GitHub.

#### 2. App fetches repo metadata using the GitHub API.

#### 3. User selects a repo and type of document (API Docs, README, etc.).

#### 4. Optionally enters custom prompt.

#### 5. App generates and saves docs via AI or templates.

#### 6. User can view/download/save documentation.


## ✍️ Future Improvements

#### 1. Export to PDF / Markdown

#### 2. Multi-user collaboration

#### 3. Custom templates for companies

#### 4. Versioned document history

#### 5. Integration with Confluence or Notion
