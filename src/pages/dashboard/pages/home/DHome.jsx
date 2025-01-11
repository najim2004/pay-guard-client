import DocumentHistoryTable from "@/components/dashboard/documents/DocumentHistoryTable";
import { Summaries } from "@/components/dashboard/home/Summaries";
import PaymentHistoryTable from "@/components/dashboard/payments/PaymentHistoryTable";
import { Button } from "@/components/ui/button";
import React from "react";

export const DHome = () => {
  return (
    <div>
      <Summaries />
      <Button className="my-4 w-full max-w-xs ml-6" variant="default">
        Create a New Payment Request
      </Button>
      <PaymentHistoryTable />
      <DocumentHistoryTable />
    </div>
  );
};
