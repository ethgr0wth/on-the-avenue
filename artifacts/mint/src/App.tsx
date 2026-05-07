import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import NewGuests from "@/pages/NewGuests";
import Artists from "@/pages/Artists";
import Lookbook from "@/pages/Lookbook";
import Philosophy from "@/pages/Philosophy";
import Reviews from "@/pages/Reviews";
import Visit from "@/pages/Visit";
import Book from "@/pages/Book";
import GiftCards from "@/pages/GiftCards";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/new-guests" component={NewGuests} />
      <Route path="/artists" component={Artists} />
      <Route path="/lookbook" component={Lookbook} />
      <Route path="/philosophy" component={Philosophy} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/visit" component={Visit} />
      <Route path="/book" component={Book} />
      <Route path="/gift-cards" component={GiftCards} />
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
