import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const PaymentsRequestForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "",
      description: "",
      document: null,
    },
  });

  const onSubmit = (data) => {
    if (!data.title || data.title.length < 5) {
      form.setError("title", {
        message: "Title must be at least 5 characters long",
      });
      return;
    }

    if (!data.amount || Number(data.amount) <= 0) {
      form.setError("amount", { message: "Amount must be a positive number" });
      return;
    }

    console.log("Form submitted:", data);
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        form.setError("document", {
          message: "Only PDF, JPG, and PNG files are allowed",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        form.setError("document", {
          message: "File size must not exceed 5MB",
        });
        return;
      }
      field.onChange(file);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto border-none shadow-none p-6">
      <Form {...form}>
        <h2 className="text-2xl font-bold text-center">Payment Request Form</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 shadow-none rounded-sm"
                      placeholder="Enter title (e.g., October Salary)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount*</FormLabel>
                <FormControl>
                  <Input
                    className="h-10 shadow-none rounded-sm"
                    type="number"
                    placeholder="Enter amount (e.g., 50000)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supporting Document</FormLabel>
                <FormControl>
                  <Input
                    className="h-10 shadow-none rounded-sm cursor-pointer"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </FormControl>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, JPG, PNG (Max: 5MB)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      className="min-h-[100px] lg:min-h-[200px] shadow-none rounded-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full col-span-2 shadow-none rounded-sm h-10"
          >
            Submit Payment Request
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default PaymentsRequestForm;
