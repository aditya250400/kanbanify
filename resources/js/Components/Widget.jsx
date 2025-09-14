import { cn } from '@/lib/utils';

export default function Widget({ className, ...props }) {
    const { bgColor, count, icon, title } = props;

    return (
        <div className={cn(className, 'sm:[t-6 relative overflow-hidden rounded-lg border bg-white px-4 pb-6 pt-5')}>
            <div>
                <div className={cn(bgColor, 'absolute rounded-2xl p-3')}>{icon}</div>
                <p className="ml-16 truncate text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <div className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-foreground">{count}</p>
            </div>
        </div>
    );
}
