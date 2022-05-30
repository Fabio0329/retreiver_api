// Modules
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Chart.css";

// Chartjs setup
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Component displays a pie chart indicating current status of orders based on the selected user
 * @param selectedUser - State passed down from the Dashboard component indicating the currently selected user
 */
export const Chart = ({ selectedUser }) => {
  const [orderStatus, setOrderStatus] = useState([0, 0, 0, 0]);

  // Helper function that determines the current status of the order and updates state
  const getOrderStatus = (shipmentsArray) => {
    const orderStatusArr = [0, 0, 0, 0];
    shipmentsArray.forEach(({ shipments }) => {
      shipments.forEach((shipment) => {
        if (shipment.box_shipped_at && !shipment.box_delivered_at) {
          orderStatusArr[0] += 1;
        } else if (shipment.box_delivered_at && !shipment.device_shipped_at) {
          orderStatusArr[1] += 1;
        } else if (
          shipment.device_shipped_at &&
          !shipment.device_delivered_at
        ) {
          orderStatusArr[2] += 1;
        } else if (shipment.device_delivered_at) {
          orderStatusArr[3] += 1;
        }
      });
    });
    setOrderStatus(orderStatusArr);
  };

  // Fetches orders based on selected user and updates state
  const getOrders = async () => {
    const fetched_orders = await fetch(
      `http://localhost:8000/api/user/${selectedUser}`
    );
    const json_orders = await fetched_orders.json();
    getOrderStatus(json_orders);
  };

  // Updates orders stored in state based on the currently selected user
  useEffect(() => {
    if (selectedUser) {
      getOrders();
    }
  }, [selectedUser]);

  // Data object supplied to the pie chart
  const data = {
    labels: [
      "Box Shipped",
      "Box Delivered",
      "Device Shipped",
      "Device Delievered",
    ],
    datasets: [
      {
        label: "Order Status",
        data: orderStatus,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="chartContainer">
        <h3>
          Order Total:{" "}
          {orderStatus.reduce((acc, currentVal) => {
            return acc + currentVal;
          }, 0)}
        </h3>
        <Pie
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </>
  );
};
