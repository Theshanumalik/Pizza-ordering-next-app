import ActionNav from "./ActionNav";

export default function UserActionsLayout({ children }) {
  return (
    <div className="p-3 min-h-[calc(100vh-16vh)]">
      <div className="max-w-container mx-auto w-full h-full">
        <ActionNav />
        {children}
      </div>
    </div>
  );
}
