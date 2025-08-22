import axios from "axios";
import Cookies from "js-cookie";
import constants from "./constant";

const { API_URL } = constants;

// Get auth token
const getAuthToken = () => Cookies.get("vendors_auth_token");

// Headers configuration
const getHeaders = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const orderService = {
  // Get buyer orders
  getBuyerOrders: async () => {
    try {
      const response = await axios.get(`${API_URL}buyer/orders`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get vendor orders
  getVendorOrders: async () => {
    try {
      const response = await axios.get(`${API_URL}vendor/orders`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update sub-order status (only buyers can update)
  updateSubOrderStatus: async (
    subOrderId: number,
    status: "processing" | "completed" | "cancelled"
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}sub-orders/${subOrderId}/status`,
        { status },
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate PDF receipt
  generatePdfReceipt: (order: any, vendorId?: number) => {
    try {
      // Format date as string
      const formatDateStr = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat("en-NG", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
      };

      // Format currency as string
      const formatCurrencyStr = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(amount);
      };

      // Create a new window for the PDF
      const receiptWindow = window.open("", "_blank");
      if (!receiptWindow) {
        throw new Error("Could not open new window for receipt");
      }

      // Filter sub-orders if vendorId is provided (for vendor-specific receipts)
      let filteredSubOrders = order.sub_orders || [];
      let receiptTitle = `Order Receipt #${order.id}`;

      if (vendorId) {
        filteredSubOrders = filteredSubOrders.filter(
          (so: any) => so.user.id === vendorId
        );
        const vendorName =
          filteredSubOrders[0]?.user?.name || `Vendor #${vendorId}`;
        receiptTitle = `${vendorName} - Order Receipt #${order.id}`;
      }

      // Get total of filtered sub-orders
      const totalAmount = vendorId
        ? filteredSubOrders.reduce(
            (sum: number, so: any) => sum + parseFloat(so.total_amount),
            0
          )
        : order.total_amount;

      // Template for receipt
      const receiptContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${receiptTitle}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

            :root {
              --primary: #0e9f6e;
              --primary-light: #def7ec;
              --primary-dark: #057a55;
              --secondary: #f3f4f6;
              --danger: #f05252;
              --warning: #ff9800;
              --success: #0e9f6e;
              --info: #3f83f8;
            }

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            body {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              margin: 0;
              padding: 0;
              color: #374151;
              line-height: 1.5;
              background-color: #f9fafb;
            }

            .receipt-container {
              max-width: 850px;
              margin: 2rem auto;
              background-color: white;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }

            .receipt-header {
              text-align: center;
              padding: 2rem 1.5rem;
              border-bottom: 1px solid #e5e7eb;
              background-color: var(--primary);
              color: white;
              position: relative;
            }

            .receipt-header h1 {
              font-size: 1.875rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
            }

            .receipt-header p {
              font-size: 1rem;
              opacity: 0.9;
            }

            .logo-container {
              position: absolute;
              top: 1.5rem;
              left: 1.5rem;
              display: flex;
              align-items: center;
              font-weight: 600;
              font-size: 1.25rem;
            }

            .logo {
              width: 40px;
              height: 40px;
              background-color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0.5rem;
              font-weight: 700;
              color: var(--primary);
            }

            .receipt-body {
              padding: 2rem;
            }

            .info-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1.5rem;
              margin-bottom: 2rem;
              background-color: var(--secondary);
              padding: 1.5rem;
              border-radius: 8px;
            }

            .info-item {
              margin-bottom: 0.5rem;
            }

            .info-label {
              font-weight: 500;
              color: #6b7280;
              font-size: 0.875rem;
              margin-bottom: 0.25rem;
            }

            .info-value {
              font-weight: 500;
              font-size: 1rem;
            }

            .section-title {
              font-size: 1.25rem;
              font-weight: 600;
              margin: 1.5rem 0 1rem;
              color: #111827;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid var(--primary-light);
            }

            .vendor-section {
              margin-bottom: 2rem;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            }

            .vendor-header {
              padding: 1rem 1.5rem;
              background-color: #f9fafb;
              border-bottom: 1px solid #e5e7eb;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .vendor-name {
              font-weight: 600;
              font-size: 1rem;
              color: #111827;
            }

            .items-table {
              width: 100%;
              border-collapse: collapse;
            }

            .items-table th {
              background-color: #f9fafb;
              font-weight: 500;
              text-align: left;
              padding: 0.75rem 1.5rem;
              color: #6b7280;
              font-size: 0.875rem;
              border-bottom: 1px solid #e5e7eb;
            }

            .items-table td {
              padding: 1rem 1.5rem;
              border-bottom: 1px solid #f3f4f6;
              font-size: 0.938rem;
            }

            .items-table tr:last-child td {
              border-bottom: none;
            }

            .items-table .product-name {
              font-weight: 500;
              color: #111827;
            }

            .items-table .product-price,
            .items-table .product-quantity,
            .items-table .product-total {
              color: #4b5563;
            }

            .items-table .product-total {
              font-weight: 600;
              color: #111827;
            }

            .subtotal {
              padding: 1rem 1.5rem;
              background-color: #f9fafb;
              border-top: 1px solid #e5e7eb;
              text-align: right;
              font-weight: 600;
            }

            .order-total {
              text-align: right;
              padding: 1.5rem 2rem;
              background-color: var(--primary-light);
              border-radius: 8px;
              margin-top: 2rem;
              font-size: 1.125rem;
              font-weight: 600;
              color: var(--primary-dark);
            }

            .order-total .amount {
              font-size: 1.5rem;
              color: var(--primary);
              margin-left: 0.5rem;
            }

            .receipt-footer {
              text-align: center;
              padding: 2rem;
              background-color: #f3f4f6;
              border-top: 1px solid #e5e7eb;
            }

            .receipt-footer p {
              color: #6b7280;
              font-size: 0.875rem;
              margin-bottom: 0.5rem;
            }

            .receipt-footer .contact {
              color: var(--primary);
              font-weight: 500;
            }

            .status {
              display: inline-block;
              padding: 0.25rem 0.75rem;
              border-radius: 30px;
              font-size: 0.75rem;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            .status-pending {
              background-color: #fef3c7;
              color: #92400e;
            }

            .status-completed {
              background-color: #d1fae5;
              color: #065f46;
            }

            .status-processing {
              background-color: #e0f2fe;
              color: #0369a1;
            }

            .status-cancelled {
              background-color: #fee2e2;
              color: #b91c1c;
            }

            .status-failed {
              background-color: #fee2e2;
              color: #b91c1c;
            }

            .status-rejected {
              background-color: #fee2e2;
              color: #b91c1c;
            }

            .print-button {
              text-align: center;
              margin-top: 2rem;
            }

            .print-button button {
              background-color: var(--primary);
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 6px;
              font-weight: 500;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.2s;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }

            .print-button button:hover {
              background-color: var(--primary-dark);
            }

            .print-button button svg {
              margin-right: 0.5rem;
              width: 20px;
              height: 20px;
            }

            /* Address formatting */
            .address {
              margin-top: 0.5rem;
              font-size: 0.875rem;
              color: #6b7280;
            }

            @media print {
              body {
                background-color: white;
              }

              .receipt-container {
                box-shadow: none;
                margin: 0;
                max-width: 100%;
              }

              .print-button {
                display: none;
              }

              .receipt-header {
                color: black;
                background-color: white;
                border-bottom: 2px solid #e5e7eb;
              }

              .logo-container {
                color: var(--primary);
              }

              .logo {
                border: 1px solid var(--primary);
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="receipt-header">
              <div class="logo-container">
                <div class="logo">TF</div>
                TramsFarms
              </div>
              <h1>${vendorId ? "Vendor Receipt" : "Order Receipt"}</h1>
              <p>${formatDateStr(order.created_at)}</p>
            </div>

            <div class="receipt-body">
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Order ID</div>
                  <div class="info-value">#${order.id}</div>
                </div>

                <div class="info-item">
                  <div class="info-label">Status</div>
                  <div class="info-value">
                    <span class="status status-${order.status
                      .toLowerCase()
                      .replace("_", "-")}">${order.status.replace(
        "_",
        " "
      )}</span>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-label">Payment Method</div>
                  <div class="info-value">${order.payment_method}</div>
                </div>

                <div class="info-item">
                  <div class="info-label">Date</div>
                  <div class="info-value">${formatDateStr(
                    order.created_at
                  )}</div>
                </div>
              </div>

              ${
                order.shipping_address
                  ? `
              <div class="section-title">Shipping Information</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Shipping Address</div>
                  <div class="info-value">${order.shipping_address}</div>
                </div>
              </div>
              `
                  : ""
              }

              <div class="section-title">${
                vendorId ? "Your" : "Order"
              } Items</div>

              ${filteredSubOrders
                .map(
                  (subOrder: any) => `
                <div class="vendor-section">
                  <div class="vendor-header">
                    <div class="vendor-name">
                      ${
                        vendorId
                          ? "Your Products"
                          : `Vendor: ${
                              subOrder.user?.name ||
                              "Vendor #" + subOrder.user?.id
                            }`
                      }
                    </div>
                    <span class="status status-${subOrder.status.toLowerCase()}">${
                    subOrder.status
                  }</span>
                  </div>

                  <table class="items-table">
                    <thead>
                      <tr>
                        <th style="width: 45%;">Product</th>
                        <th style="width: 20%;">Price</th>
                        <th style="width: 15%;">Quantity</th>
                        <th style="width: 20%;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${(subOrder.items || [])
                        .map(
                          (item: any) => `
                        <tr>
                          <td class="product-name">${item.product.name}</td>
                          <td class="product-price">${formatCurrencyStr(
                            item.price
                          )}</td>
                          <td class="product-quantity">${item.quantity}</td>
                          <td class="product-total">${formatCurrencyStr(
                            item.price * item.quantity
                          )}</td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                  </table>

                  <div class="subtotal">
                    Subtotal: ${formatCurrencyStr(subOrder.total_amount)}
                  </div>
                </div>
              `
                )
                .join("")}

              <div class="order-total">
                ${
                  vendorId ? "Your Total" : "Order Total"
                }: <span class="amount">${formatCurrencyStr(totalAmount)}</span>
              </div>
            </div>

            <div class="receipt-footer">
              <p>Thank you for shopping with TramsFarms!</p>
              <p>Order processed on ${formatDateStr(order.created_at)}</p>
              <p>If you have any questions, please contact us at <span class="contact">support@tramsfarms.com</span></p>
              <p>&copy; ${new Date().getFullYear()} TramsFarms. All rights reserved.</p>
            </div>

            <div class="print-button">
              <button onclick="window.print();">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Receipt
              </button>
            </div>
          </div>
        </body>
        </html>
      `;

      // Write content to new window
      receiptWindow.document.open();
      receiptWindow.document.write(receiptContent);
      receiptWindow.document.close();

      return true;
    } catch (error) {
      console.error("Failed to generate receipt:", error);
      throw error;
    }
  },
};

export default orderService;
