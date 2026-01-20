import { registerApplication, start, navigateToUrl } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

function checkAuth() {
  const user = localStorage.getItem("valoro_user");
  const path = window.location.pathname;
  const isPublicPage = path.startsWith("/login") || path.startsWith("/account");

  if (!user && !isPublicPage) {
    if (path !== "/login") {
      navigateToUrl("/login");
    }
  } else if (
    user &&
    (path === "/login" || path === "/" || path.startsWith("/account"))
  ) {
    navigateToUrl("/dashboard");
  }
}

window.addEventListener("single-spa:before-routing-event", checkAuth);
checkAuth();

layoutEngine.activate();
start();
