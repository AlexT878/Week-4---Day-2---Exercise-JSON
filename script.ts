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

    const validRoles: Role[] = ["intern", "mentor", "admin"];

    try {
        const data = JSON.parse(input);
        console.log(`User data: ${JSON.stringify(data)}`);
        if(typeof data.id === "string" && data.id.startsWith('u') && typeof data.email === "string" && validRoles.includes(data.role)) {
            const user: User = {
                id: data.id,
                email: data.email,
                role: data.role
            };
            return {ok: true, value: user};
        } else {
            return {ok: false, error: "Invalid User shape"};
        }

    } catch(e) {
        return {ok : false, error: "Invalid JSON"};
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
    const validRoles: Role[] = ["intern", "mentor", "admin"];

    try {
        const data = JSON.parse(input);

        if(!Array.isArray(data)) {
            return {ok: false, error: "Data is not an array"}
        }

        const users: User[] = [];

        for (const user of data) {
            console.log(`User data: ${JSON.stringify(user)}`);
            if(user.id === undefined) {
                return {ok: false, error: "Missing field: id"};
            } else if(typeof user.id !== "string") { 
                return {ok: false, error: "Invalid type for id (expected string)"};
            } else if (!user.id.startsWith('u')) {
                return {ok: false, error: "Invalid id (must start with 'u')"};
            };

            if(user.email === undefined) {
                return {ok: false, error: "Missing field: email"};
            } else if (typeof user.email !== "string") { 
                return {ok: false, error: "Invalid type for email (expected string)"};
            } else if (!user.email.includes('@')) {
                return {ok: false, error: "Invalid email (doesn't contains @)"};
            }

            if(user.role === undefined) {
                return {ok: false, error: "Missing field: role"};
            } else if (!validRoles.includes(user.role)) {
                return {ok: false, error: "Invalid role (expected intern|mentor|admin)"};
            }

            const newUser: User = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            users.push(newUser);
        }

        return {ok: true, value: users};
    } catch(e) {
        return {ok: false, error: "Invalid JSON"}
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