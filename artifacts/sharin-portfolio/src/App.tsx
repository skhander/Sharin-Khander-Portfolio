import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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
import '@/components/view-stage.css';

const queryClient = new QueryClient();
const VIEW_FADE_MS = 400;

function Routes({ location }: { location: string }) {
  return (
    <Switch location={location}>
      <Route path="/" component={Work} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={About} />
      <Route path="/work/virtual-try-on" component={VirtualTryOn} />
      <Route path="/work/:slug" component={ProjectDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function AnimatedRoutes() {
  const [location] = useLocation();
  const reduced = usePrefersReducedMotion();
  const currentRef = useRef(location);
  const pendingLeave = useRef<string | null>(null);
  const [current, setCurrent] = useState(location);
  const [leaving, setLeaving] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (reduced) {
      pendingLeave.current = null;
      currentRef.current = location;
      setLeaving(null);
      setCurrent(location);
      return;
    }

    if (location !== currentRef.current) {
      pendingLeave.current = currentRef.current;
      currentRef.current = location;
      setLeaving(pendingLeave.current);
      setCurrent(location);
    }

    if (!pendingLeave.current) return;

    const timer = window.setTimeout(() => {
      pendingLeave.current = null;
      setLeaving(null);
    }, VIEW_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [location, reduced]);

  return (
    <div className="view-stack">
      {leaving ? (
        <div className="view-leave" key={leaving}>
          <Routes location={leaving} />
        </div>
      ) : null}
      <div className={leaving ? 'view-enter' : undefined} key={current}>
        <Routes location={current} />
      </div>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <PortfolioShell>
        <AnimatedRoutes />
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
