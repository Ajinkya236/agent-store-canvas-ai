
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface GPTApp {
  id: number;
  name: string;
  description: string;
  creator: string;
  category: string;
  image: string;
  isFavorite: boolean;
  rating?: number;
  conversations?: number;
  starters?: string[];
  capabilities?: string[];
}

interface AppDetailsDialogProps {
  app: GPTApp | undefined;
  isOpen: boolean;
  onClose: () => void;
  onTry: (appId: number) => void;
  onToggleFavorite: (appId: number) => void;
}

const AppDetailsDialog: React.FC<AppDetailsDialogProps> = ({
  app,
  isOpen,
  onClose,
  onTry,
  onToggleFavorite
}) => {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={app.image} alt={app.name} />
                <AvatarFallback className="rounded-md">{app.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{app.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-1">
                  By {app.creator}
                  <Badge variant="outline" className="ml-2">{app.category}</Badge>
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(app.id)}
              className={app.isFavorite ? 'text-yellow-500' : ''}
            >
              <Star className="w-5 h-5" fill={app.isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating and usage */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4"
                    fill={star <= (app.rating || 0) ? "#FFD700" : "none"}
                    stroke={star <= (app.rating || 0) ? "#FFD700" : "currentColor"}
                  />
                ))}
                <span className="ml-1 text-sm font-medium">{app.rating?.toFixed(1)}</span>
              </div>
              {app.conversations && (
                <span className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat().format(app.conversations)} conversations
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium mb-2">About</h3>
            <p className="text-muted-foreground">{app.description}</p>
          </div>

          {/* Capabilities */}
          {app.capabilities && app.capabilities.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Capabilities</h3>
              <div className="flex flex-wrap gap-2">
                {app.capabilities.map((capability, index) => (
                  <Badge key={index} variant="secondary">{capability}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Conversation starters */}
          {app.starters && app.starters.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Conversation starters</h3>
              <div className="space-y-2">
                {app.starters.map((starter, index) => (
                  <div key={index} className="bg-muted p-3 rounded-md text-sm">
                    "{starter}"
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onTry(app.id)}>
            Try it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailsDialog;
