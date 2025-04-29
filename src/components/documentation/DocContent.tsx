
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Content for each documentation section
const contentMap: Record<string, { title: string; content: React.ReactNode }> = {
  // Agent Store
  "agent-store-overview": {
    title: "Agent Store Overview",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          The Agent Store is a marketplace of pre-built AI agents designed for enterprise use cases. These agents are ready to be deployed and integrated into your existing workflows with minimal setup.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Quick Start</h3>
              <p className="text-sm text-muted-foreground">Browse, select, and deploy agents in minutes to solve specific business challenges.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Integration Ready</h3>
              <p className="text-sm text-muted-foreground">All agents come with API documentation for seamless integration with your systems.</p>
            </CardContent>
          </Card>
        </div>
        <Alert>
          <Code className="h-4 w-4" />
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Filter agents by industry, task type, or integration capability to find the perfect match for your needs.
          </AlertDescription>
        </Alert>
      </>
    )
  },
  "agent-store-features": {
    title: "Agent Store Key Features",
    content: (
      <>
        <div className="space-y-4 mb-6">
          <div className="border p-4 rounded-md">
            <h3 className="font-medium mb-2">Verified Agents</h3>
            <p className="text-sm text-muted-foreground">All agents undergo quality checks to ensure performance, security, and reliability.</p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="font-medium mb-2">Category Organization</h3>
            <p className="text-sm text-muted-foreground">Browse agents by industry, function, or use case to quickly find what you need.</p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="font-medium mb-2">Reviews and Ratings</h3>
            <p className="text-sm text-muted-foreground">See feedback from other enterprise users to guide your selection process.</p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="font-medium mb-2">Free and Premium Options</h3>
            <p className="text-sm text-muted-foreground">Access a range of agents from free starter options to advanced premium versions.</p>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="feature-comparison">
            <AccordionTrigger className="text-sm font-medium">View Feature Comparison Table</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Feature</th>
                      <th className="text-center py-2">Free Agents</th>
                      <th className="text-center py-2">Premium Agents</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">API Access</td>
                      <td className="text-center">Limited</td>
                      <td className="text-center">Full</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Customization</td>
                      <td className="text-center">Basic</td>
                      <td className="text-center">Advanced</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Support</td>
                      <td className="text-center">Community</td>
                      <td className="text-center">Dedicated</td>
                    </tr>
                    <tr>
                      <td className="py-2">Usage Limits</td>
                      <td className="text-center">Yes</td>
                      <td className="text-center">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  },
  // More content sections for each page...
  "agent-store-usage": {
    title: "Agent Store Usage Guide",
    content: (
      <>
        <div className="space-y-6 mb-6">
          <div className="flex items-start">
            <div className="mr-4 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center shrink-0">1</div>
            <div>
              <h3 className="font-medium mb-1">Browse the Marketplace</h3>
              <p className="text-sm text-muted-foreground mb-2">Navigate through categories or use the search function to find agents that match your requirements.</p>
              <div className="border rounded-md p-3 bg-muted/30 text-sm">
                <code>GET /api/agents?category=customer-service&sort=rating</code>
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center shrink-0">2</div>
            <div>
              <h3 className="font-medium mb-1">Select and Purchase</h3>
              <p className="text-sm text-muted-foreground mb-2">Review agent details, capabilities, and pricing before adding to your organization.</p>
              <div className="border rounded-md p-3 bg-muted/30 text-sm">
                <code>POST /api/agents/{'{agent_id}'}/purchase</code>
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center shrink-0">3</div>
            <div>
              <h3 className="font-medium mb-1">Deploy and Configure</h3>
              <p className="text-sm text-muted-foreground mb-2">Follow the provided setup instructions to deploy the agent in your environment.</p>
              <div className="border rounded-md p-3 bg-muted/30 text-sm">
                <code>POST /api/my-agents/{'{agent_id}'}/deploy</code>
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center shrink-0">4</div>
            <div>
              <h3 className="font-medium mb-1">Integrate and Use</h3>
              <p className="text-sm text-muted-foreground mb-2">Connect the agent to your systems using the provided API documentation.</p>
              <div className="border rounded-md p-3 bg-muted/30 text-sm">
                <code>POST /api/my-agents/{'{agent_id}'}/integrate</code>
              </div>
            </div>
          </div>
        </div>
        
        <Alert className="mb-4">
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Remember to check compliance requirements for your industry before deploying agents that handle sensitive data.
          </AlertDescription>
        </Alert>
      </>
    )
  },
  "agent-store-examples": {
    title: "Agent Store Examples",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          Here are some practical examples of how enterprises are using agents from our marketplace:
        </p>
        
        <Accordion type="single" collapsible className="w-full mb-6">
          <AccordionItem value="example-1">
            <AccordionTrigger>Customer Service Automation</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">A retail company deployed the Customer Service Agent to handle 70% of routine inquiries, freeing up human agents for complex cases.</p>
                <div className="border rounded-md p-3 bg-muted/30 text-sm">
                  <p className="font-medium mb-2">Sample Implementation:</p>
                  <code>{`
// Initialize the customer service agent
const csAgent = new EnterpriseAI.Agent("customer-service-pro");

// Configure for your specific use case
await csAgent.configure({
  knowledgeBase: "company-faqs",
  tone: "friendly",
  escalationThreshold: 0.7
});

// Deploy to your customer chat interface
await csAgent.deploy("web-chat");
                  `}</code>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="example-2">
            <AccordionTrigger>Document Analysis</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">A legal firm uses the Document Analysis Agent to process contracts and extract key terms, reducing review time by 60%.</p>
                <div className="border rounded-md p-3 bg-muted/30 text-sm">
                  <p className="font-medium mb-2">Sample Implementation:</p>
                  <code>{`
// Initialize document analysis agent
const docAgent = new EnterpriseAI.Agent("document-analyzer");

// Process a batch of documents
const results = await docAgent.processBatch({
  documents: ["contract1.pdf", "contract2.pdf"],
  extractFields: ["parties", "terms", "obligations", "deadlines"],
  outputFormat: "structured-json"
});

// Store results in your system
await database.storeAnalysisResults(results);
                  `}</code>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-2">Try It Yourself</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Test a simplified version of our Sales Assistant agent:
          </p>
          <div className="border rounded-md p-3 bg-background">
            <div className="flex flex-col space-y-2">
              <div className="bg-primary/10 p-2 rounded-md text-sm self-start max-w-[80%]">
                Tell me about your enterprise solutions.
              </div>
              <div className="bg-accent/10 p-2 rounded-md text-sm self-end max-w-[80%]">
                Our Enterprise AI platform offers customizable agents for customer service, data analysis, and internal operations. Would you like to learn about a specific solution?
              </div>
              <div className="bg-primary/10 p-2 rounded-md text-sm self-start max-w-[80%]">
                What's your pricing model?
              </div>
              <div className="bg-accent/10 p-2 rounded-md text-sm self-end max-w-[80%]">
                We offer subscription-based pricing with tiers based on usage volume and features required. I'd be happy to connect you with a sales representative to discuss a custom package for your needs.
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
  
  // Chat Assistant
  "chat-assistant-overview": {
    title: "Chat Assistant Overview",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          The Chat Assistant provides an intuitive interface for interacting with AI agents through natural language conversations. It's designed to facilitate seamless communication between users and AI agents.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Conversational Interface</h3>
              <p className="text-sm text-muted-foreground">Engage with AI agents using natural language without technical knowledge.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Multi-Agent Support</h3>
              <p className="text-sm text-muted-foreground">Connect with different specialized agents within the same chat interface.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="rounded-md border p-4 mb-6">
          <h3 className="font-medium mb-2">Key Benefits</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>No coding required to interact with complex AI systems</li>
            <li>Accessible across desktop and mobile devices</li>
            <li>Contextual memory retains information across conversations</li>
            <li>Secure handling of sensitive information</li>
          </ul>
        </div>
      </>
    )
  },

  // Additional sections for Chat Assistant, AI App Store, and Agent Creation would follow similar patterns
  // I'm including just a sample for brevity
  
  // AI App Store Overview
  "ai-app-store-overview": {
    title: "AI App Store Overview",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          The AI App Store is a curated collection of AI-powered applications built on our platform. These apps provide ready-to-use solutions for specific business needs without requiring technical expertise.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Plug-and-Play</h3>
              <p className="text-sm text-muted-foreground">Deploy AI applications with minimal configuration and no coding required.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Industry Solutions</h3>
              <p className="text-sm text-muted-foreground">Find applications designed for specific industries and use cases.</p>
            </CardContent>
          </Card>
        </div>
        
        <Alert>
          <Code className="h-4 w-4" />
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Most AI apps can be customized after installation to better fit your specific business processes.
          </AlertDescription>
        </Alert>
      </>
    )
  },
  
  // Agent Creation Overview
  "agent-creation-overview": {
    title: "Agent Creation Overview",
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          The Agent Creation platform allows you to build custom AI agents tailored to your specific business needs without writing code. Using our visual interface, you can define agent behaviors, knowledge bases, and integration points.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">No-Code Builder</h3>
              <p className="text-sm text-muted-foreground">Create sophisticated agents using visual tools and templates.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Knowledge Integration</h3>
              <p className="text-sm text-muted-foreground">Connect your business data sources to create informed agents.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="rounded-md border p-4 mb-6">
          <h3 className="font-medium mb-2">Agent Types You Can Create</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Customer Service Assistants</li>
            <li>Internal Knowledge Base Agents</li>
            <li>Data Analysis Specialists</li>
            <li>Process Automation Agents</li>
            <li>Training and Onboarding Assistants</li>
          </ul>
        </div>
      </>
    )
  }
};

interface DocContentProps {
  section: string;
  item: string;
}

const DocContent: React.FC<DocContentProps> = ({ section, item }) => {
  const contentKey = item;
  const content = contentMap[contentKey];
  
  if (!content) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-archivo-black mb-4">Documentation</h2>
        <p className="text-muted-foreground">Select a topic from the sidebar to view documentation.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-archivo-black mb-2">{content.title}</h2>
      <div className="h-1 w-20 bg-accent-primary mb-6"></div>
      
      <div className="prose prose-sm max-w-none">
        {content.content}
      </div>
    </div>
  );
};

export default DocContent;
