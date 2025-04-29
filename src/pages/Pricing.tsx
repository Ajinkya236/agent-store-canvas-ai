
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Calendar, DollarSign, BadgeDollarSign } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  
  const plans = [
    {
      name: "Free",
      price: billing === "monthly" ? "$0" : "$0",
      period: "forever",
      description: "Basic access to AI agents",
      features: [
        "5 agent interactions per day",
        "Access to basic agents",
        "Standard response time",
        "Community support"
      ],
      limitations: [
        "Limited agent selection",
        "No custom configurations",
        "Basic analytics only"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: billing === "monthly" ? "$29" : "$290",
      period: billing === "monthly" ? "per month" : "per year",
      description: "For professionals and small teams",
      features: [
        "Unlimited agent interactions",
        "Access to all standard agents",
        "Priority response time",
        "Email support",
        "Custom agent configurations",
        "Advanced analytics",
        "API access"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced needs",
      features: [
        "Unlimited agent interactions",
        "Access to all premium agents",
        "Fastest response time",
        "24/7 dedicated support",
        "Custom agent development",
        "Private agents",
        "Advanced analytics",
        "SSO & advanced security",
        "Dedicated infrastructure"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  // Feature comparison data
  const featureComparison = {
    "Core Features": {
      "AI Agent Access": {
        "Free": "Basic Agents Only",
        "Pro": "All Standard Agents",
        "Enterprise": "All Premium Agents"
      },
      "Daily Interactions": {
        "Free": "5 per day",
        "Pro": "Unlimited",
        "Enterprise": "Unlimited"
      },
      "Response Time": {
        "Free": "Standard",
        "Pro": "Priority",
        "Enterprise": "Fastest"
      }
    },
    "Customization": {
      "Agent Configuration": {
        "Free": "❌",
        "Pro": "✓",
        "Enterprise": "✓"
      },
      "Custom Agents": {
        "Free": "❌",
        "Pro": "❌",
        "Enterprise": "✓"
      },
      "Private Agents": {
        "Free": "❌",
        "Pro": "❌",
        "Enterprise": "✓"
      }
    },
    "Support": {
      "Support Level": {
        "Free": "Community",
        "Pro": "Email Support",
        "Enterprise": "24/7 Dedicated"
      },
      "SLA": {
        "Free": "❌",
        "Pro": "❌",
        "Enterprise": "✓"
      },
      "Onboarding": {
        "Free": "Self-serve",
        "Pro": "Guided setup",
        "Enterprise": "White glove"
      }
    },
    "Security & Compliance": {
      "SSO": {
        "Free": "❌",
        "Pro": "❌",
        "Enterprise": "✓"
      },
      "Advanced Security": {
        "Free": "❌",
        "Pro": "Basic",
        "Enterprise": "Enterprise-grade"
      },
      "Compliance Reporting": {
        "Free": "❌",
        "Pro": "❌",
        "Enterprise": "✓"
      }
    }
  };

  // FAQ data
  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. When upgrading, the new features will be available immediately. When downgrading, you'll maintain your current plan until the end of the billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card required. You can explore all features of the paid plan during this period without any commitment."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also support invoice payment and purchase orders."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund."
    },
    {
      question: "Can I get a custom quote for my team?",
      answer: "Absolutely! For teams with specific needs or those requiring a custom solution, please contact our sales team. We'll work with you to build a package that meets your requirements and budget."
    },
    {
      question: "Do you offer discounts for non-profits or educational institutions?",
      answer: "Yes, we offer special pricing for qualified non-profit organizations, educational institutions, and student developers. Please contact our sales team with relevant documentation to apply."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-archivo-black mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for you and start transforming your business with AI agents
            </p>
            
            {/* Billing toggle */}
            <div className="mt-8 flex items-center justify-center">
              <span className={`mr-4 ${billing === "monthly" ? "font-bold" : "text-muted-foreground"}`}>Monthly</span>
              <button
                className="relative inline-flex h-6 w-12 items-center rounded-full bg-primary transition-colors"
                onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
              >
                <span
                  className={`${
                    billing === "annual" ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
              <span className={`ml-4 ${billing === "annual" ? "font-bold" : "text-muted-foreground"}`}>
                Annual <span className="text-xs text-emerald-500">Save 20%</span>
              </span>
            </div>
          </div>
          
          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`overflow-hidden ${plan.popular ? 'border-accent border-2 ring-1 ring-accent relative' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-accent text-accent-foreground text-center py-1.5 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`${plan.popular ? 'pt-5' : 'pt-6'}`}>
                  <div className="text-lg font-medium">{plan.name}</div>
                  <CardTitle className="flex items-baseline mt-3">
                    <span className="text-4xl font-archivo-black">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground ml-1">/{plan.period}</span>}
                  </CardTitle>
                  <div className="mt-2 text-sm text-muted-foreground">{plan.description}</div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-accent mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations && plan.limitations.map((limit, i) => (
                      <li key={`limit-${i}`} className="flex items-center text-muted-foreground">
                        <span className="h-4 w-4 mr-2">•</span>
                        <span className="text-sm">{limit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pb-8">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Feature comparison */}
          <div className="mt-24 mb-16">
            <h2 className="text-3xl font-archivo-black mb-8 text-center">Feature Comparison</h2>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Feature</TableHead>
                      <TableHead className="text-center">Free</TableHead>
                      <TableHead className="text-center">Pro</TableHead>
                      <TableHead className="text-center">Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(featureComparison).map(([category, features]) => (
                      <React.Fragment key={category}>
                        <TableRow>
                          <TableCell colSpan={4} className="font-bold bg-muted/30">
                            {category}
                          </TableCell>
                        </TableRow>
                        {Object.entries(features).map(([feature, tiers]) => (
                          <TableRow key={feature}>
                            <TableCell>{feature}</TableCell>
                            <TableCell className="text-center">{tiers.Free}</TableCell>
                            <TableCell className="text-center">{tiers.Pro}</TableCell>
                            <TableCell className="text-center">{tiers.Enterprise}</TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-archivo-black mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our pricing, plans, and policies
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-10 text-center p-6 bg-muted rounded-lg">
                <h3 className="text-xl font-archivo-black mb-2">Need more information?</h3>
                <p className="mb-6 text-muted-foreground">
                  Our team is ready to answer any questions you have about our plans and help you choose the right solution
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Schedule a Demo
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <BadgeDollarSign className="h-4 w-4" /> Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
