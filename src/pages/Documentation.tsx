
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-archivo-black font-bold mb-6">Documentation</h1>
      
      <Card className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Documentation is coming soon. This section will cover all you need to know about
            using and integrating with our AI agents.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentation;
