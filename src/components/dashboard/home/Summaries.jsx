import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"; // Import icons

const summaryData = [
  {
    title: "Total Payment Request",
    description: "Total number of payment request",
    value: "2,543",
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    trend: "+12.5%",
    color: "bg-blue-50",
  },
  {
    title: "Pending Payments",
    description: "Total number of pending payments",
    value: "856",
    icon: <Clock className="h-8 w-8 text-yellow-500" />,
    trend: "+5.2%",
    color: "bg-yellow-50",
  },
  {
    title: "Approved Payments",
    description: "Total number of approved payments",
    value: "1,428",
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    trend: "+8.1%",
    color: "bg-green-50",
  },
  {
    title: "Rejected Payments",
    description: "Total number of rejected payments",
    value: "259",
    icon: <XCircle className="h-8 w-8 text-red-500" />,
    trend: "-2.3%",
    color: "bg-red-50",
  },
];

export const Summaries = () => {
  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className={`${item.color} rounded-t-lg`}>
              <div className="flex justify-between items-center">
                {item.icon}
                <span
                  className={`text-sm font-semibold ${
                    item.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.trend}
                </span>
              </div>
              <CardTitle className="mt-2">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-3xl font-bold tracking-tight">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};
