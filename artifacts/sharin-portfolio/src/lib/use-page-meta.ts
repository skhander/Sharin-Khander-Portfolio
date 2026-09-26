import { useEffect } from 'react';

const defaultTitle = 'Sharin Khander — Product archive';

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    const tags = [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
    ] as const;
    const previous = tags.map((selector) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      const content = element?.content;
      if (element) element.content = selector.includes('title') ? title : description;
      return { element, content };
    });

    return () => {
      document.title = defaultTitle;
      previous.forEach(({ element, content }) => {
        if (element && content !== undefined) element.content = content;
      });
    };
  }, [title, description]);
}