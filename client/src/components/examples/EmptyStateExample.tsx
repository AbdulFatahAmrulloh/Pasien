import EmptyState from "../EmptyState";

export default function EmptyStateExample() {
  return (
    <div className="space-y-8 p-6">
      <EmptyState 
        type="no-patients" 
        onAction={() => console.log("Add new patient clicked")}
      />
      <EmptyState 
        type="no-results" 
        onAction={() => console.log("Clear search clicked")}
      />
      <EmptyState 
        type="error" 
        onAction={() => console.log("Try again clicked")}
      />
    </div>
  );
}