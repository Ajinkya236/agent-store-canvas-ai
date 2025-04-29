
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Community = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-archivo-black font-bold mb-6">Community Hub</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Join Our AI Agent Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The community hub is coming soon. Connect with other users, share your creations,
            and learn from the experiences of others.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Community;
