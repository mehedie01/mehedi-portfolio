import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-mono">
      <div className="w-full max-w-md mx-4 terminal-panel border-primary/30 rounded-md p-6">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <h1 className="text-2xl font-bold text-foreground">404</h1>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          <p className="mb-2 text-primary">$ status</p>
          <p>Error: The requested page was not found on this server.</p>
          <p className="mt-2 opacity-50">It might have been removed, or you might have typed the URL incorrectly.</p>
        </div>

        <a href="/" className="inline-flex mt-4 text-primary hover:underline hover:text-primary/80">
          cd /home
        </a>
      </div>
    </div>
  );
}
