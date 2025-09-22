# Event Registration System

This project is an event registration system built with Next.js and PostgreSQL. It allows users to register for events and view a list of events and users.

## Features

- User registration and management
- Event creation and listing
- Registration for events
- Many-to-many relationship between users and events

## Technologies Used

- Next.js
- PostgreSQL
- Prisma
- TypeScript

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd event-registration-system
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Set up the PostgreSQL database:

   - Create a new database for the project.
   - Update the database connection string in the `prisma/schema.prisma` file.

4. Run the Prisma migrations to set up the database schema:

   ```
   npx prisma migrate dev --name init
   ```

5. Start the development server:

   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## License

This project is licensed under the MIT License.
