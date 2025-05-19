import Invoice from "../Models/InvoiceModel.js";
import moment from "moment";

// Helper function to calculate profit
const calculateProfit = (invoices) => {
  return invoices.reduce((total, invoice) => {
    const invoiceProfit = invoice.products.reduce((sum, product) => {
      return sum + (product.FinalPrice - product.cost_price * product.quantity);
    }, 0);
    return total + invoiceProfit;
  }, 0);
};

// Get dashboard summary data
export const getDashboardSummary = async (req, res) => {
  try {
    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const monthStart = moment().startOf("month").toDate();
    const monthEnd = moment().endOf("month").toDate();

    const allTimeInvoices = await Invoice.find();
    const allTimeRevenue = allTimeInvoices.reduce(
      (sum, invoice) => sum + invoice.total_price,
      0
    );
    const allTimeProfit = calculateProfit(allTimeInvoices);
    const allTimeSales = allTimeInvoices.reduce((sum, invoice) => {
      return (
        sum +
        invoice.products.reduce((qty, product) => qty + product.quantity, 0)
      );
    }, 0);

    const monthlyInvoices = await Invoice.find({
      createdAt: { $gte: monthStart, $lte: monthEnd },
    });
    const monthlyRevenue = monthlyInvoices.reduce(
      (sum, invoice) => sum + invoice.total_price,
      0
    );
    const monthlyProfit = calculateProfit(monthlyInvoices);
    const monthlySales = monthlyInvoices.reduce((sum, invoice) => {
      return (
        sum +
        invoice.products.reduce((qty, product) => qty + product.quantity, 0)
      );
    }, 0);

    const dailyInvoices = await Invoice.find({
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });
    const dailyRevenue = dailyInvoices.reduce(
      (sum, invoice) => sum + invoice.total_price,
      0
    );
    const dailyProfit = calculateProfit(dailyInvoices);
    const dailySales = dailyInvoices.reduce((sum, invoice) => {
      return (
        sum +
        invoice.products.reduce((qty, product) => qty + product.quantity, 0)
      );
    }, 0);

    const last30DaysStart = moment()
      .subtract(30, "days")
      .startOf("day")
      .toDate();
    const dailySalesData = await Invoice.aggregate([
      {
        $match: {
          createdAt: { $gte: last30DaysStart, $lte: new Date() },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$total_price" },
          sales: { $sum: { $sum: "$products.quantity" } },
          profit: {
            $sum: {
              $reduce: {
                input: "$products",
                initialValue: 0,
                in: {
                  $add: [
                    "$$value",
                    {
                      $subtract: [
                        "$$this.FinalPrice",
                        { $multiply: ["$$this.cost_price", "$$this.quantity"] },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthlySalesData = await Invoice.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().subtract(12, "months").startOf("month").toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          revenue: { $sum: "$total_price" },
          sales: { $sum: { $sum: "$products.quantity" } },
          profit: {
            $sum: {
              $reduce: {
                input: "$products",
                initialValue: 0,
                in: {
                  $add: [
                    "$$value",
                    {
                      $subtract: [
                        "$$this.FinalPrice",
                        { $multiply: ["$$this.cost_price", "$$this.quantity"] },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      summary: {
        daily: {
          sales: dailySales,
          revenue: dailyRevenue,
          profit: dailyProfit,
        },
        monthly: {
          sales: monthlySales,
          revenue: monthlyRevenue,
          profit: monthlyProfit,
        },
        total: {
          sales: allTimeSales,
          revenue: allTimeRevenue,
          profit: allTimeProfit,
        },
      },
      charts: {
        daily: dailySalesData,
        monthly: monthlySalesData,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
