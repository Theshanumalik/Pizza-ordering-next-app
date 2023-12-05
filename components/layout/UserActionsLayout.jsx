import ActionNav from "./ActionNav";

export default async function UserActionsLayout({ children }) {
  console.log("Hello");
  return (
    <div className="p-3 h-[calc(100vh-16vh)]">
      <div className="max-w-container mx-auto w-full h-full">
        <ActionNav />
        {children}
      </div>
    </div>
  );
}
