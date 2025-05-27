declare module "expo-router" {
  export type AppRoutes =
    | "/(app)/itemForm"
    | "/(app)/home"
    | "/(auth)/login"
    | "/(auth)/register"
    | "/_sitemap"
    | "/(tabs)"
    | "/(tabs)/explore"
    | "/explore"
    | "/"
    | "/+not-found";

  export interface Router {
    push: (
      href: AppRoutes | { pathname: AppRoutes; params?: Record<string, string> }
    ) => void;
    back: () => void;
    canGoBack: () => boolean;
    replace: (
      href: AppRoutes | { pathname: AppRoutes; params?: Record<string, string> }
    ) => void;
  }

  export function useRouter(): Router;
  export function useLocalSearchParams<T extends Record<string, string>>(): T;
  export function useSegments(): string[];

  export const Slot: React.ComponentType;
  export const SplashScreen: {
    preventAutoHideAsync: () => Promise<void>;
    hideAsync: () => Promise<void>;
  };
}

declare module "expo-router/stack" {
  export const Stack: {
    Screen: React.ComponentType<any>;
    setOptions: (options: any) => void;
  };
}
