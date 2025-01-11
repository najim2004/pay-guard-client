import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DocumentsUploadForm = () => {
  const [file, setFile] = useState(null);
  const { toast } = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Document submitted",
      description: "Your document has been successfully uploaded.",
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size should not exceed 5MB",
          variant: "destructive",
        });
        return;
      }
      const fileType = selectedFile.type;
      if (!["application/pdf", "image/jpeg", "image/png"].includes(fileType)) {
        toast({
          title: "Error",
          description: "Only PDF, JPG, and PNG files are allowed",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Document Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="documentType">Document Type</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nid">National ID Card (NID)</SelectItem>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="license">Driving License</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="documentNumber">Document Number</Label>
          <Input
            id="documentNumber"
            required
            placeholder="Enter your document number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Upload Document</Label>
          <Input
            id="file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500">
            Maximum file size: 5MB. Supported formats: PDF, JPG, PNG
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Additional Comments (Optional)</Label>
          <Textarea
            id="comments"
            placeholder="Add any additional information here"
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Document
        </Button>
      </form>
    </Card>
  );
};

export default DocumentsUploadForm;
