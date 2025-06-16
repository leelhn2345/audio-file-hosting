import { isAuthenticated } from "@/utils/auth";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { userAtom } from "@stores/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Edit2,
  Save,
  X,
  User,
  Mail,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/(auth)/profile")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
});

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Mock API functions - replace with actual API calls
const updateProfile = async (data: ProfileFormData) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Profile updated successfully" };
};

const deleteAccount = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Account deleted successfully" };
};

function RouteComponent() {
  const [user, setUser] = useAtom(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const { mutate: updateProfileMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Update user atom with new data
      const formData = form.getValues();
      setUser((prev) => (prev ? { ...prev, ...formData } : undefined));
    },
    onError: () => {
      toast.error("Failed to update profile. Please try again.");
    },
  });

  const { mutate: deleteAccountMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully.");
      setUser(undefined);
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Failed to delete account. Please try again.");
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation(data);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8">
      {/* Background Elements */}
      <div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-purple-400 to-pink-400 opacity-20 blur-3xl"
      ></div>
      <div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-blue-400 to-cyan-400 opacity-20 blur-3xl"
      ></div>
      <div className="relative mx-auto max-w-2xl">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-6 text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl
                bg-gradient-to-br from-purple-600 to-blue-600"
            >
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Profile Settings
            </CardTitle>
            <p className="mt-2 text-gray-600">
              Manage your account information
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isEditing ? (
              // Display Mode
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Name
                        </Label>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Email
                        </Label>
                        <p className="font-medium text-gray-900">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      // Reset form with current user values when entering edit mode
                      form.reset({
                        name: user.name || "",
                        email: user.email || "",
                      });
                      setIsEditing(true);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white
                      hover:from-purple-700 hover:to-blue-700"
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          Delete Account
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <span className="block mb-3">
                            Are you absolutely sure you want to delete your
                            account?
                          </span>
                          <span className="block font-medium text-red-600">
                            This action cannot be undone. This will permanently
                            delete your account and remove all your data from
                            our servers.
                          </span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          {isDeleting
                            ? "Deleting..."
                            : "Yes, delete my account"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ) : (
              // Edit Mode
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-700">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-700">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white
                        hover:from-purple-700 hover:to-blue-700"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
