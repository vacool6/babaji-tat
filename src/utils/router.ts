/**
 * Simple client-side router for SPA navigation
 */

export type Route = {
  path: string;
  render: () => string | HTMLElement;
};

export class Router {
  private routes: Route[] = [];
  private currentPath: string = "";

  constructor(private container: HTMLElement) {
    this.init();
  }

  /**
   * Register a new route
   */
  addRoute(path: string, render: () => string | HTMLElement): void {
    this.routes.push({ path, render });
  }

  /**
   * Navigate to a specific path
   */
  navigate(path: string): void {
    this.currentPath = path;
    window.history.pushState({}, "", path);
    this.render();
  }

  /**
   * Initialize router with popstate listener
   */
  private init(): void {
    window.addEventListener("popstate", () => {
      this.currentPath = window.location.pathname;
      this.render();
    });

    // Handle initial load
    this.currentPath = window.location.pathname;
    this.render();
  }

  /**
   * Render the current route
   */
  private render(): void {
    const route = this.routes.find((r) => r.path === this.currentPath);

    if (route) {
      const content = route.render();
      if (typeof content === "string") {
        this.container.innerHTML = content;
      } else {
        this.container.innerHTML = "";
        this.container.appendChild(content);
      }
    } else {
      // 404 fallback
      this.container.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
  }

  /**
   * Get current path
   */
  getCurrentPath(): string {
    return this.currentPath;
  }
}
