import DocumentHistoryTable from "@/components/dashboard/documents/DocumentHistoryTable";
import DocumentsUploadForm from "@/components/dashboard/documents/DocumentsUploadForm";

export const Documents = () => {
  return (
    <div>
      <DocumentsUploadForm />
      <DocumentHistoryTable />
    </div>
  );
};
