import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PWABadge from "./components/PWABadge";
import Todos from "./components/Todos";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
      <PWABadge />
    </QueryClientProvider>
  );
}

export default App;
