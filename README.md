# Enterprise HR Management Dashboard

A full-stack HR dashboard to manage employees, teams and departments, role-based access, and analytics charts.

I built it as a deep-dive to strengthen my skills with **AWS web services** (EC2, RDS, API Gateway, Amplify, S3, Cognito), **PostgreSQL + Prisma**, **Redux Toolkit**, and in designing a **scalable end-to-end** web application on AWS.

<a href="https://myvediosportfolio.s3.eu-north-1.amazonaws.com/DashboardScreen.png">
  <img src="https://myvediosportfolio.s3.eu-north-1.amazonaws.com/DashboardScreen.png" alt="Enterprise HR Management Dashboard" border="0">
</a>

**Live Demo:** <a href="https://master.dvqxjngzatj72.amplifyapp.com/" target="_blank">https://master.dvqxjngzatj72.amplifyapp.com/</a>  
**Video Demo:** <a href="https://myvediosportfolio.s3.eu-north-1.amazonaws.com/dashboard.mp4" target="_blank">https://myvediosportfolio.s3.eu-north-1.amazonaws.com/dashboard.mp4</a>

## Features

- Employee profiles & org hierarchy (manager → reports)
- Department & team management
- Employees: search, add, edit, remove
- Global search: employees, teams, departments
- Reports: API-driven charts for team & employee performance
- Authentication & account creation (AWS Cognito)
- Role-based UI and access
- Responsive layout with dark mode

## Technology Used:

- **Front-end**: Next.js, Redux Toolkit, Tailwind CSS, TypeScript
- **Back-end**: Node.js, Express, Prisma, PostgreSQL, TypeScript
- **Cloud (AWS)**: AWS EC2, AWS RDS, AWS API Gateway, AWS Amplify, AWS S3, AWS Cognito
- **DevOps**: Docker, Docker Compose, GitHub Actions (CI/CD)
- **Testing**: Vitest, Supertest

## Getting Started

**Prerequisites**

- Node.js (v12.x or later)
- npm or yarn

1. Clone the repository:

   ```bash
   git clone https://github.com/OuailTayarth/entreprise_management_system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd entreprise_management_system
   ```

3. Navigate to the client and server folder:

   ```bash
   cd client
   cd server
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Open http://localhost:3000

## License

MIT
