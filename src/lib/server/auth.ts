import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db/db';
import { usersTable } from './db/schemas/users';
import { sessionsTable } from './db/schemas/sessions'; 
import { GitHub } from "arctic";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";

export const adapter = new DrizzleSQLiteAdapter(db, sessionsTable, usersTable);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      // githubId: attributes.github_id,
      username: attributes.username
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  // github_id: number;
  username: string;
}