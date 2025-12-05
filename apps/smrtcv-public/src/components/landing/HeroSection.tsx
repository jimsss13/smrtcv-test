import { Button } from '@/components/ui/Button';

export const HeroSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* --- Mobile Layout --- */}
        <div className="md:hidden">
          <div className="w-full aspect-[3/4] max-w-md mx-auto rounded-lg bg-background-light border border-border flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Smart CV. Your smart resume builder.
            </h1>
            <p className="mt-6 text-lg text-foreground-secondary">
              Start fresh or bring in your existing resume.
            </p>
            <div className="mt-10 flex flex-col gap-4 w-full max-w-xs">
              <Button size="lg" className="w-full">Create New Resume</Button>
              <Button size="lg" variant="secondary" className="w-full">Import Resume</Button>
            </div>
          </div>
        </div>

        {/* --- Desktop Layout --- */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Smart CV. Your smart resume builder.
            </h1>
            <p className="mt-6 text-lg text-foreground-secondary">
              Start fresh or bring in your existing resume.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-start">
              <Button size="lg">Create New Resume</Button>
              <Button size="lg" variant="secondary">Import Resume</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-[3/4] rounded-lg bg-background-light border border-border flex items-center justify-center">
              <p className="text-foreground-muted">*Sample CV Display</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};