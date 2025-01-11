import PaymentHistoryTable from "@/components/dashboard/payments/PaymentHistoryTable";
import PaymentsRequestForm from "@/components/dashboard/payments/PaymentsRequestForm";
export const Payments = () => {
  return (
    <div>
      <PaymentsRequestForm />
      <PaymentHistoryTable />
    </div>
  );
};
