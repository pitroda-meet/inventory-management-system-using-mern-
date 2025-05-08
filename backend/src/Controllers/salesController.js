import Invoice from "../Models/InvoiceModel.js";

import moment from "moment";

// Helper function to calculate profit
const calculateProfit = (invoices) => {
  return invoices.reduce((total, invoice) => {
    const invoiceProfit = invoice.products.reduce((sum, product) => {
      return sum + (product.FinalPrice - product.cost_price) * product.quantity;
    }, 0);
    return total + invoiceProfit;
  }, 0);
};

// Get dashboard summary data
export const getDashboardSummary = async (req, res) => {
  try {
    // Get today's date range
    const todayStart = moment().startOf("day");
    const todayEnd = moment().endOf("day");

    // Get current month date range
    const monthStart = moment().startOf("month");
    const monthEnd = moment().endOf("month");

    // Get all time data
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

    // Get monthly data
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

    // Get daily data
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

    // Get data for charts
    const last30DaysStart = moment().subtract(30, "days").startOf("day");
    const dailySalesData = await Invoice.aggregate([
      {
        $match: {
          createdAt: { $gte: last30DaysStart, $lte: moment().endOf("day") },
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
                      $multiply: [
                        {
                          $subtract: ["$$this.FinalPrice", "$$this.cost_price"],
                        },
                        "$$this.quantity",
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
          createdAt: { $gte: moment().subtract(12, "months").startOf("month") },
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
                      $multiply: [
                        {
                          $subtract: ["$$this.FinalPrice", "$$this.cost_price"],
                        },
                        "$$this.quantity",
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
