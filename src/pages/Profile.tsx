
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-archivo-black font-bold mb-6">User Profile</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The profile page is coming soon. Here you'll be able to manage your account,
            view usage statistics, and customize your preferences.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
