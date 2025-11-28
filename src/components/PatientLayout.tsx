import { Navigation } from "./Navigation";

interface PatientLayoutProps {
  children: React.ReactNode;
}

export const PatientLayout = ({ children }: PatientLayoutProps) => {
  return (
    <div className="font-ayur">
      {children}
      <Navigation />
    </div>
  );
};