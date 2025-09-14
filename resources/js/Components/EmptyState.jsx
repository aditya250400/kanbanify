import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { PiDatabase } from 'react-icons/pi';

export default function EmptyState({ title, url, className }) {
    return (
        <Link
            className={cn(
                'relative block w-full rounded-lg border-2 border-dashed border-muted-foreground p-12 text-center hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                className,
            )}
            href={url}
        >
            <PiDatabase className="mx-auto h-12 w-12 text-muted-foreground" />
            <span className="bloxk mt-2 text-sm font-medium leading-relaxed tracking-tighter">
                Create a new {title}
            </span>
        </Link>
    );
}
