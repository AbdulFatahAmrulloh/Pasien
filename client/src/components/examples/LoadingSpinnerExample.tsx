import LoadingSpinner from "../LoadingSpinner";

export default function LoadingSpinnerExample() {
  return (
    <div className="space-y-8 p-6">
      <LoadingSpinner size="sm" text="Loading small..." />
      <LoadingSpinner size="md" text="Loading medium..." />
      <LoadingSpinner size="lg" text="Loading large..." />
      <LoadingSpinner />
    </div>
  );
}