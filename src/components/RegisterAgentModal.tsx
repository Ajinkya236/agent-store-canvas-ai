
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { X, Plus, Upload, Tag } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Agent name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  icon: z.instanceof(File).or(z.any()).refine(val => {
    if (val instanceof File) return true;
    return false;
  }, "Icon is required"),
  domain: z.string().min(2, { message: "Domain is required." }),
  tags: z.array(z.string()).min(1, { message: "At least one tag is required." }),
  welcomeMessage: z.string().min(5, { message: "Welcome message is required." }),
  conversationStarters: z.array(z.string()),
  hosting: z.enum(["Flowmind", "Custom"]),
  authorizationRequired: z.boolean().default(false),
  chatEndpoint: z.object({
    url: z.string().url({ message: "Please enter a valid URL." }),
    method: z.enum(["GET", "POST", "PUT", "DELETE"]),
    headers: z.array(z.object({
      key: z.string(),
      value: z.string()
    })),
    body: z.array(z.object({
      key: z.string(),
      value: z.string()
    }))
  })
});

type RegisterAgentFormValues = z.infer<typeof formSchema>;

interface RegisterAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterAgentModal: React.FC<RegisterAgentModalProps> = ({
  open,
  onOpenChange
}) => {
  const navigate = useNavigate();
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  
  const form = useForm<RegisterAgentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      domain: "",
      tags: [],
      welcomeMessage: "",
      conversationStarters: [""],
      hosting: "Flowmind",
      authorizationRequired: false,
      chatEndpoint: {
        url: "",
        method: "POST",
        headers: [{ key: "", value: "" }],
        body: [{ key: "", value: "" }]
      }
    }
  });

  const { formState } = form;
  const isSubmitting = formState.isSubmitting;
  const allFieldsValid = 
    form.watch('name') && 
    form.watch('description') && 
    iconPreview && 
    form.watch('domain') && 
    form.watch('tags').length > 0 && 
    form.watch('welcomeMessage') &&
    form.watch('chatEndpoint.url') &&
    form.watch('chatEndpoint.method');

  const onSubmit = async (values: RegisterAgentFormValues) => {
    try {
      // Here would be the API call to register the agent
      console.log("Form values:", values);
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close modal
      onOpenChange(false);
      
      // Show success message
      toast({
        title: "Agent registered successfully",
        description: `${values.name} has been registered and is now available.`,
      });
      
      // Redirect to my agents page
      navigate("/my-agents");
    } catch (error) {
      console.error("Error registering agent:", error);
      toast({
        title: "Registration failed",
        description: "There was an error registering your agent. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('icon', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      const currentTags = form.getValues('tags');
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue('tags', [...currentTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  const addConversationStarter = () => {
    const currentStarters = form.getValues('conversationStarters');
    form.setValue('conversationStarters', [...currentStarters, ""]);
  };

  const removeConversationStarter = (index: number) => {
    const currentStarters = form.getValues('conversationStarters');
    if (currentStarters.length > 1) {
      form.setValue('conversationStarters', currentStarters.filter((_, i) => i !== index));
    }
  };

  const addHeader = () => {
    const currentHeaders = form.getValues('chatEndpoint.headers');
    form.setValue('chatEndpoint.headers', [...currentHeaders, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    const currentHeaders = form.getValues('chatEndpoint.headers');
    if (currentHeaders.length > 1) {
      form.setValue('chatEndpoint.headers', currentHeaders.filter((_, i) => i !== index));
    }
  };

  const addBodyParam = () => {
    const currentBodyParams = form.getValues('chatEndpoint.body');
    form.setValue('chatEndpoint.body', [...currentBodyParams, { key: "", value: "" }]);
  };

  const removeBodyParam = (index: number) => {
    const currentBodyParams = form.getValues('chatEndpoint.body');
    if (currentBodyParams.length > 1) {
      form.setValue('chatEndpoint.body', currentBodyParams.filter((_, i) => i !== index));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Register New Agent</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Agent Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter agent name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your agent's purpose and capabilities" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Domain */}
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., finance, healthcare, education" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Welcome Message */}
                <FormField
                  control={form.control}
                  name="welcomeMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Message <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Initial message to users" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                {/* Upload Icon */}
                <FormItem>
                  <FormLabel>Upload Icon <span className="text-red-500">*</span></FormLabel>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-primary">
                    <input
                      type="file"
                      id="icon-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleIconChange}
                    />
                    <label htmlFor="icon-upload" className="cursor-pointer text-center">
                      {iconPreview ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={iconPreview} 
                            alt="Icon preview" 
                            className="w-16 h-16 object-contain mb-2 rounded" 
                          />
                          <span className="text-sm text-muted-foreground">Click to change</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Click to upload icon</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max. 2MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {form.formState.errors.icon && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.icon.message as string}
                    </p>
                  )}
                </FormItem>

                {/* Tags */}
                <FormItem>
                  <FormLabel>Tags <span className="text-red-500">*</span></FormLabel>
                  <div className="flex items-center mb-2">
                    <Input 
                      placeholder="Add tags" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      variant="ghost" 
                      onClick={addTag}
                      className="ml-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.getValues('tags').map((tag, index) => (
                      <div 
                        key={index} 
                        className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeTag(tag)}
                          className="h-4 w-4 p-0 ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  {form.formState.errors.tags && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.tags.message as string}
                    </p>
                  )}
                </FormItem>

                {/* Hosting Options */}
                <FormField
                  control={form.control}
                  name="hosting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hosting</FormLabel>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Checkbox
                            id="flowmind-hosting"
                            checked={field.value === "Flowmind"}
                            onCheckedChange={() => field.onChange("Flowmind")}
                          />
                          <label
                            htmlFor="flowmind-hosting"
                            className="ml-2 text-sm font-medium"
                          >
                            Flowmind
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            id="custom-hosting"
                            checked={field.value === "Custom"}
                            onCheckedChange={() => field.onChange("Custom")}
                          />
                          <label
                            htmlFor="custom-hosting"
                            className="ml-2 text-sm font-medium"
                          >
                            Custom
                          </label>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Authorization Required */}
                <FormField
                  control={form.control}
                  name="authorizationRequired"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Authorization Required
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Conversation Starters */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Conversation Starters</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addConversationStarter}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Starter
                </Button>
              </div>
              
              {form.watch('conversationStarters').map((_, index) => (
                <div key={index} className="flex space-x-2">
                  <FormField
                    control={form.control}
                    name={`conversationStarters.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Conversation starter" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeConversationStarter(index)}
                    disabled={form.watch('conversationStarters').length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Chat Endpoint Configuration */}
            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="text-lg font-medium">Chat Endpoint <span className="text-red-500">*</span></h3>
              
              {/* URL */}
              <FormField
                control={form.control}
                name="chatEndpoint.url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.yourendpoint.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Method */}
              <FormField
                control={form.control}
                name="chatEndpoint.method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method <span className="text-red-500">*</span></FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Headers */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Headers</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addHeader}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Header
                  </Button>
                </div>
                
                {form.watch('chatEndpoint.headers').map((_, index) => (
                  <div key={index} className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name={`chatEndpoint.headers.${index}.key`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Key" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`chatEndpoint.headers.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Value" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHeader(index)}
                      disabled={form.watch('chatEndpoint.headers').length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Body Parameters */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Body Parameters</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addBodyParam}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Parameter
                  </Button>
                </div>
                
                {form.watch('chatEndpoint.body').map((_, index) => (
                  <div key={index} className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name={`chatEndpoint.body.${index}.key`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Key" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`chatEndpoint.body.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Value" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBodyParam(index)}
                      disabled={form.watch('chatEndpoint.body').length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !allFieldsValid}
              >
                {isSubmitting ? "Registering..." : "Register Agent"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterAgentModal;
