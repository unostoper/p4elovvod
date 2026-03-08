import { Navigate } from "react-router-dom";
import { useBlockVisibility } from "@/hooks/useBlockVisibility";

interface PageGuardProps {
  pageKey: string;
  children: React.ReactNode;
}

const PageGuard = ({ pageKey, children }: PageGuardProps) => {
  const { visibility, isLoading } = useBlockVisibility();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка…</p>
      </div>
    );
  }

  if (visibility[pageKey] === false) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PageGuard;
