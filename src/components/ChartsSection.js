import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CompressIcon from "@mui/icons-material/Compress";

const WeatherAreaChart = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const metricMap = [
    {
      label: "Wind Speed",
      key: "wind_speed",
      color: "#8884d8",
      icon: <AirIcon />,
      unit: "m/s",
    },
    {
      label: "Humidity",
      key: "humidity",
      color: "#82ca9d",
      icon: <WaterDropIcon />,
      unit: "%",
    },
    {
      label: "Pressure",
      key: "pressure",
      color: "#ffc658",
      icon: <CompressIcon />,
      unit: "hPa",
    },
  ];

  const activeMetric = metricMap[selectedTab];

  return (
    <Card
      sx={{
        mt: 3,
        boxShadow: 4,
        borderRadius: "16px",
        fontFamily: "Roboto",
        width:'100%',
        margin:'20px'
      }}
    >
      <CardContent>
         <Typography variant="body" sx={{ fontWeight: 500, fontSize: '20px', marginBottom: 1, marginLeft:'10px' }}>
          Trends
        </Typography>
       

        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          sx={{ mb: 2 }}
        >
          {metricMap.map((metric) => (
            <Tab
              key={metric.key}
              icon={metric.icon}
              label={metric.label}
              iconPosition="start"
              sx={{ fontSize: "0.875rem", fontWeight: "medium" }}
            />
          ))}
        </Tabs>

        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => `${value} ${activeMetric.unit}`}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey={activeMetric.key}
                stroke={activeMetric.color}
                fill={activeMetric.color}
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherAreaChart;


