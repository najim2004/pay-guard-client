import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaymentHistoryTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data with more entries
  const payments = [
    {
      id: 1,
      date: "2024-01-15",
      status: "completed",
      title: "Website Development",
      amount: "$2,500",
      description: "Final payment for e-commerce website development",
      documents: ["invoice.pdf", "contract.pdf"],
    },
    {
      id: 2,
      date: "2024-01-10",
      status: "pending",
      title: "Mobile App Design",
      amount: "$1,800",
      description: "UI/UX design for mobile application",
      documents: ["proposal.pdf"],
    },
    {
      id: 3,
      date: "2024-01-05",
      status: "failed",
      title: "SEO Services",
      amount: "$750",
      description: "Monthly SEO optimization services",
      documents: ["report.pdf", "analytics.pdf"],
    },
    // Add more entries as needed
  ];

  const getStatusBadge = (status) => {
    const styles = {
      completed:
        "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100",
      pending: "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100",
      failed: "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100",
    };
    return (
      <Badge
        variant="outline"
        className={`${styles[status]} px-3 py-1 rounded-full font-medium transition-colors`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.title.toLowerCase().includes(search.toLowerCase()) ||
      payment.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Payment History
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center w-[80px] font-semibold">
                No.
              </TableHead>
              <TableHead className="text-center font-semibold">Date</TableHead>
              <TableHead className="text-center font-semibold">
                Status
              </TableHead>
              <TableHead className="text-center font-semibold">Title</TableHead>
              <TableHead className="text-center font-semibold">
                Amount
              </TableHead>
              <TableHead className="text-center max-w-[200px] font-semibold">
                Description
              </TableHead>
              <TableHead className="text-center font-semibold">
                Documents
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayments.map((payment, index) => (
              <TableRow
                key={payment.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium text-center text-gray-600">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell className="text-center text-gray-600">
                  {new Date(payment.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {getStatusBadge(payment.status)}
                </TableCell>
                <TableCell className="text-gray-700 font-medium">
                  {payment.title}
                </TableCell>
                <TableCell className="font-semibold text-center text-gray-800">
                  {payment.amount}
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-center text-gray-600">
                  {payment.description}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-center items-center">
                    {payment.documents.map((doc, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <FileIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="hidden sm:inline text-gray-600">
                          {doc}
                        </span>
                      </Button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of{" "}
          {filteredPayments.length} entries
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="hover:bg-gray-100"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="hover:bg-gray-100"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
