import type { ElementType } from 'react';

type RevealHeadingProps = {
  as?: ElementType;
  text: string;
  className?: string;
  id?: string;
  depth?: boolean;
};

export default function RevealHeading({ as: Tag = 'h2', text, className, id, depth = false }: RevealHeadingProps) {
  const lines = text.split('\n');

  return (
    <Tag className={className} id={id} data-reveal-heading data-dimensional={depth ? '' : undefined} aria-label={text.replaceAll('\n', ' ')}>
      {lines.map((line, lineIndex) => (
        <span className="revealHeading__line" aria-hidden="true" key={`${line}-${lineIndex}`}>
          {line.split(' ').map((word, wordIndex) => (
            <span className="revealHeading__word" key={`${word}-${wordIndex}`}>{word}</span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
