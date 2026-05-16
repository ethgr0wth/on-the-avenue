import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";

// Pages placeholder imports
import { Home } from "@/pages/home";
import { Businesses } from "@/pages/businesses";
import { BusinessDetail } from "@/pages/business-detail";
import { Categories } from "@/pages/categories";
import { CategoryDetail } from "@/pages/category-detail";
import { Offers } from "@/pages/offers";
import { Events } from "@/pages/events";
import { Submit } from "@/pages/submit";
import { Owner } from "@/pages/owner";
import { OwnerVerify } from "@/pages/owner-verify";
import { AdminLogin } from "@/pages/admin-login";
import { AdminDashboard } from "@/pages/admin-dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/businesses" component={Businesses} />
      <Route path="/businesses/:slug" component={BusinessDetail} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:slug" component={CategoryDetail} />
      <Route path="/offers" component={Offers} />
      <Route path="/events" component={Events} />
      <Route path="/submit" component={Submit} />
      <Route path="/owner" component={Owner} />
      <Route path="/owner/verify" component={OwnerVerify} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
