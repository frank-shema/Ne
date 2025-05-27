// api/fakeAuthApi.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { Credentials, User } from "../types"; // We'll define types later

const FAKE_USERS_STORAGE_KEY = "@fake_users_v2";
const FAKE_LOGGED_IN_USER_KEY = "@fake_logged_in_user_v2";

let users: User[] = [];

const loadUsers = async () => {
  try {
    // Skip AsyncStorage in web environment
    if (Platform.OS === "web") {
      users = [
        {
          id: "user1",
          username: "test",
          password: "password",
          email: "test@example.com",
        },
      ];
      return;
    }

    const storedUsers = await AsyncStorage.getItem(FAKE_USERS_STORAGE_KEY);
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    } else {
      users = [
        {
          id: "user1",
          username: "test",
          password: "password",
          email: "test@example.com",
        },
      ];
      await AsyncStorage.setItem(FAKE_USERS_STORAGE_KEY, JSON.stringify(users));
    }
  } catch (e) {
    console.error("Failed to load users from storage", e);
  }
};
loadUsers();

export const fakeLogin = ({
  identifier,
  password,
}: Pick<Credentials, "identifier" | "password">): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const user = users.find(
        (u) =>
          (u.username === identifier || u.email === identifier) &&
          u.password === password
      );
      if (user) {
        const { password: _p, ...userDataWithoutPassword } = user;
        const sessionUser: User = {
          ...userDataWithoutPassword,
          token: `fake-token-${user.id}`,
        };
        await AsyncStorage.setItem(
          FAKE_LOGGED_IN_USER_KEY,
          JSON.stringify(sessionUser)
        );
        resolve(sessionUser);
      } else {
        reject(new Error("Invalid credentials or user not found."));
      }
    }, 1000);
  });
};

export const fakeRegister = ({
  username,
  email,
  password,
}: Credentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (users.find((u) => u.username === username)) {
        reject(new Error("Username already exists"));
        return;
      }
      if (users.find((u) => u.email === email)) {
        reject(new Error("Email already registered"));
        return;
      }
      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
      };
      users.push(newUser);
      await AsyncStorage.setItem(FAKE_USERS_STORAGE_KEY, JSON.stringify(users));

      const { password: _p, ...userDataWithoutPassword } = newUser;
      const sessionUser: User = {
        ...userDataWithoutPassword,
        token: `fake-token-${newUser.id}`,
      };
      await AsyncStorage.setItem(
        FAKE_LOGGED_IN_USER_KEY,
        JSON.stringify(sessionUser)
      );
      resolve(sessionUser);
    }, 1000);
  });
};

export const fakeLogout = async (): Promise<void> => {
  await AsyncStorage.removeItem(FAKE_LOGGED_IN_USER_KEY);
  return Promise.resolve();
};

export const getLoggedInUser = async (): Promise<User | null> => {
  try {
    const userDataString = await AsyncStorage.getItem(FAKE_LOGGED_IN_USER_KEY);
    return userDataString ? (JSON.parse(userDataString) as User) : null;
  } catch (e) {
    console.error("Failed to get logged in user", e);
    return null;
  }
};
