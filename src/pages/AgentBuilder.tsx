
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';

const AgentBuilder = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-archivo-black font-bold mb-6">Agent Builder</h1>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create Your AI Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The agent builder interface is coming soon. This page will allow you to create,
              configure, test, and publish your own AI agents.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentBuilder;
