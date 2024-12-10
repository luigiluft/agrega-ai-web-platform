import NavigationMenuDemo from "../NavigationMenu";
import { cn } from "@/lib/utils";

interface SolutionLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

const SolutionLayout = ({ title, subtitle, children, className }: SolutionLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationMenuDemo />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
              {title}
            </h1>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>
          <div className={cn("max-w-7xl mx-auto", className)}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolutionLayout;