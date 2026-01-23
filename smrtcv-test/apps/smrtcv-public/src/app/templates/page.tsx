'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { getCdnUrl, getTemplateDataUrl, getTemplateImageUrl } from '@/lib/cdn';

type Template = {
  id: string;
  name: string;
  thumbnail: string;
  path?: string;
};

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:4001';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    fetch(getTemplateDataUrl())
      .then(r => r.json())
      .then((data: Template[]) => {
        if (active) setTemplates(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setTemplates([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter(t => t.name.toLowerCase().includes(q));
  }, [templates, query]);

  return (
    <section className="bg-background-light py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Templates</h1>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search templates"
            className="w-full sm:w-80 rounded-md border border-border bg-background-card px-3 py-2 text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
        </div>

        {templates.length === 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-lg border border-border bg-background-card" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(t => (
              <div key={t.id} className="group relative overflow-hidden rounded-lg border border-border bg-background-card">
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={getTemplateImageUrl(t.thumbnail)}
                    alt={t.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="text-lg font-semibold text-foreground">{t.name}</div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={(t.path && (t.path.startsWith('http') ? t.path : getCdnUrl(`templates/${t.path}`))) || '#'} target="_blank" rel="noreferrer">Preview</a>
                    </Button>
                    <Button asChild size="sm">
                      <a href={`${AUTH_URL}/signin?next=${encodeURIComponent(`/builder?template=${t.id}`)}`}>Use template</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

