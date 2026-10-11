import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { PortfolioShell } from '@/components/portfolio-shell';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import About from '@/pages/about';
import NotFound from '@/pages/not-found';
import ProjectDetail from '@/pages/project-detail';
import VirtualTryOn from '@/pages/virtual-try-on';
import Work from '@/pages/work';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Work} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={About} />
      <Route path="/work/virtual-try-on" component={VirtualTryOn} />
      <Route path="/work/:slug" component={ProjectDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <PortfolioShell>
        <Routes />
      </PortfolioShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
