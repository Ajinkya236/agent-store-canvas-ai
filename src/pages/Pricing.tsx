
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic access to AI agents",
      features: [
        "5 agent interactions per day",
        "Access to basic agents",
        "Standard response time",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For professionals and small teams",
      features: [
        "Unlimited agent interactions",
        "Access to all standard agents",
        "Priority response time",
        "Email support",
        "Custom agent configurations"
      ],
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
        "SSO & advanced security"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-archivo-black mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for you and start transforming your business with AI agents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`overflow-hidden ${plan.popular ? 'border-accent border-2 ring-1 ring-accent' : ''}`}
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
                
                <CardContent className="pt-4 pb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-accent mr-2" />
                        <span className="text-sm">{feature}</span>
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
          
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-archivo-black mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-archivo-black mb-2">Can I change plans later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade, downgrade, or cancel your subscription at any time.</p>
              </div>
              <div>
                <h3 className="text-xl font-archivo-black mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
              </div>
              <div>
                <h3 className="text-xl font-archivo-black mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and invoice payment for Enterprise plans.</p>
              </div>
              <div>
                <h3 className="text-xl font-archivo-black mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">We offer a 30-day money-back guarantee for all paid plans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
