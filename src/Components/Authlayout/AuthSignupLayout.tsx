import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "@/Components/Signupflow/styles.css";

interface AuthSignupLayoutProps {
  children: ReactNode;
  backgroundImage: string;
  progressDots?: number;
  title?: string;
  subtitle?: string;
}

const AuthSignupLayout = ({
  children,
  backgroundImage,
  progressDots = 0,
  title,
}: AuthSignupLayoutProps) => {
  return (
    <section className="step-content w-full">
      {/* Left side with background image */}
      <div
        className={cn(
          "items-center justify-center sm:col-span-7 left-side hidden sm:flex"
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {title && (
          <>
            <h2 className="max-w-90">{title}</h2>
            <div className="progress-indicator">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn("progress-dot", {
                    active: i < progressDots,
                  })}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right side content */}
      <div className="right-side w-full sm:col-span-5">{children}</div>
    </section>
  );
};

export default AuthSignupLayout;
