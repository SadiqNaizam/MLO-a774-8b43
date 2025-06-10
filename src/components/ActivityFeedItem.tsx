import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // For user/action avatar
import { LucideIcon } from 'lucide-react'; // For event type icon
import { formatDistanceToNow } from 'date-fns'; // For relative time

interface ActivityFeedItemProps {
  actorName?: string; // e.g., "John Doe"
  actorAvatarUrl?: string;
  actionDescription: string; // e.g., "updated product X" or "placed an order #123"
  timestamp: Date | string; // Date object or ISO string
  icon?: LucideIcon; // Icon representing the type of activity
  details?: React.ReactNode; // Additional details or links
  className?: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
  actorName,
  actorAvatarUrl,
  actionDescription,
  timestamp,
  icon: Icon,
  details,
  className,
}) => {
  console.log("Rendering ActivityFeedItem:", actionDescription);

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  const actorInitial = actorName ? actorName.substring(0, 2).toUpperCase() : '??';

  return (
    <div className={`flex items-start space-x-3 py-3 ${className}`}>
      {actorName && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={actorAvatarUrl} alt={actorName} />
          <AvatarFallback>{actorInitial}</AvatarFallback>
        </Avatar>
      )}
      {!actorName && Icon && (
         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
         </div>
      )}

      <div className="flex-1 space-y-1">
        <div className="text-sm">
          {actorName && <span className="font-medium">{actorName}</span>}{' '}
          <span className="text-muted-foreground">{actionDescription}</span>
        </div>
        {details && <div className="text-sm text-muted-foreground">{details}</div>}
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
    </div>
  );
}

export default ActivityFeedItem;