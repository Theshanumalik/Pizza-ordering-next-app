import ActionNav from "@/components/layout/ActionNav";

export default function layout({ children }) {
  return (
    <div className="p-3 min-h-[calc(100vh-16vh)]">
      <div className="max-w-3xl mx-auto w-full h-full">
        <ActionNav />
        {children}
      </div>
    </div>
  );
}
