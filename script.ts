// Task: parseUserConfig (TypeScript + runtime validation) 

// Goal: Implement a function that takes a JSON string and returns either a valid User object or a friendly error.

// Starter types (do not change)
type Role = "intern" | "mentor" | "admin";

export type User = {
  id: string;
  email: string;
  role: Role;
};

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function validateUser(data: unknown): Result<User> {
    if (typeof data !== "object" || data === null) {
        return { ok: false, error: "Invalid User shape (expected object)" };
    }
    const validRoles = ["intern", "mentor", "admin"];
    const obj = data as { id?: unknown; email?: unknown; role?: unknown };
    console.log(obj);

    if (obj.id === undefined) {
        return { ok: false, error: "Missing field: id" };
    }
    if (typeof obj.id !== "string") {
        return { ok: false, error: "Invalid type for id (expected string)" };
    }
    if (!obj.id.startsWith('u')) {
        return { ok: false, error: "Invalid id (must start with 'u')" };
    }

    if (obj.email === undefined) {
        return { ok: false, error: "Missing field: email" };
    }
    if (typeof obj.email !== "string") {
        return { ok: false, error: "Invalid type for email (expected string)" };
    }
    if (!obj.email.includes('@')) {
        return { ok: false, error: "Invalid email (doesn't contain @)" };
    }

    if (obj.role === undefined) {
        return { ok: false, error: "Missing field: role" };
    }
    if (typeof obj.role !== "string" || !validRoles.includes(obj.role)) {
        return { ok: false, error: "Invalid role (expected intern|mentor|admin)" };
    }

    return {
        ok: true,
        value: {
            id: obj.id,
            email: obj.email,
            role: obj.role as Role,
        },
    };
    
}

// [1] Implement
export function parseUserConfig(input: string): Result<User>  {
    // It must:
    // 1. Return { ok:false, error: "Invalid JSON" } if the string is not valid JSON
    // 2. Return { ok:false, error: "Invalid User shape" } if if JSON is valid but not a valid User
    // 3. Return { ok:true, value: user } if everything is valid

    // Rules:
    // Don’t use any
    // Don’t use as User / as any to force the type
    // The result must be correct based on runtime checks

    try {
        const data: unknown = JSON.parse(input);
        
        const validation = validateUser(data);

        if (!validation.ok) {
             return { ok: false, error: "Invalid User shape" };
        }

        return validation;

    } catch (e) {
        return { ok: false, error: "Invalid JSON" };
    }
}

// Sample input (for testing)
const inputs = [
  `{"id":"u1","email":"a@b.com","role":"intern"}`, // ok
  `{"id":"u2","email":"a@b.com","role":"boss"}`,   // shape error
  `{"id":123,"email":"a@b.com","role":"intern"}`,  // shape error
];

// [2] Parse list of users
// Implement
export function parseUsersConfig(input: string): Result<User[]> {
// Rules:
// JSON must be an array
// Every element must be a valid User
// If JSON is invalid -> "Invalid JSON"
// If JSON is valid but not an array or any element is invalid -> "Invalid Users shape"

// [3] Better error messages (advanced)
// Improve errors so they are more specific than "Invalid User shape".
// Examples:
// "Missing field: id"
// "Invalid type for id (expected string)"
// "Invalid role (expected intern|mentor|admin)"

// What to submit:
// * exercise.ts with your implementations
// * A short console.log demo that shows outputs for the sample inputs
    try {
        const data: unknown = JSON.parse(input);

        if (!Array.isArray(data)) {
            return { ok: false, error: "Invalid Users shape (expected array)" };
        }

        const users: User[] = [];

        for (const item of data) {
            const validation = validateUser(item);

            if (!validation.ok) {
                return { ok: false, error: validation.error };
            }

            users.push(validation.value);
        }

        return { ok: true, value: users };
    } catch (e) {
        return { ok: false, error: "Invalid JSON" };
    }
}

// TESTING
// [1]
console.log([1]);
inputs.forEach((jsonString) => {
    console.log(parseUserConfig(jsonString));
});

// [2] and [3]
console.log("\n[2] and [3]");
const bigJsonInput = `[${inputs.join(",")}]`;  
console.log(parseUsersConfig(bigJsonInput));