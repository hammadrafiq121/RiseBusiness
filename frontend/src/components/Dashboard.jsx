import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  ComposedChart,
  Area,
} from "recharts";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { BarChart, Bar, Cell } from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

// line chart data

const data = [
  {
    name: "Python",
    student: "13",
    fees: "10",
  },

  {
    name: "Javascript",
    students: "20",
    fees: "10",
  },

  {
    name: "Selenium",
    student: "10",
    fees: "8",
  },

  {
    name: "Php",
    student: "14",
    feess: "9",
  },

  {
    name: "Css",
    student: "30",
    fees: "13",
  },
  {
    name: "C",
    student: "12",
    fees: "7",
  },
];

const dataa = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const dashboard = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <>
      <div>
        <div className={`chart_div ${isDarkMode ? "dark" : ""}`}>
          <div className={`chart_container ${isDarkMode ? "dark" : ""}`}>
            <div className="agent_div">
              <Row className="agent-row1">
                <Col lg={3} className="agent_col">
                  <Row className="agent-row2">
                    <Col lg={2}>
                      <i className="bx bxs-user User agent_icon "></i>
                    </Col>
                    <Col lg={8} className="agent-text">
                      <h2>Total Agent</h2>
                      <p>1000</p>
                    </Col>
                  </Row>
                </Col>

                <Col lg={3} className="agent_col">
                  <Row className="agent-row2">
                    <Col lg={2}>
                      <i className="bx bx-objects-vertical-bottom agent_icon"></i>
                    </Col>
                    <Col lg={7} className="agent-text">
                      <h2>Total Projects</h2>
                      <p>6000</p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={3} className="agent_col">
                  <Row className="agent-row2">
                    <Col lg={2}>
                      <i className="bx bx-terminal agent_icon"></i>
                    </Col>
                    <Col lg={7} className="agent-text">
                      <h2>Total Client</h2>
                      <p>10000</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            

            {/* two chart line & pie chart  */}
            <Row className="line_chart">
              {/* line chart  */}

              <Col lg={6} md={12}>
              <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
                    <CartesianGrid />
                    <XAxis
                      dataKey="name"
                      interval={"preserveStartEnd"}
                      tickFormatter={(value) => value + " ECT"}
                    />
                    <YAxis className="yaxis" />
                    <Legend />
                    <Tooltip contentStyle={{ backgroundClip: "blue" }} />

                    <Line
                      type="monotone"
                      dataKey="student"
                      stroke="red"
                      activeDot={{ r: 18 }}
                    ></Line>
                    <Line
                      dataKey="fees"
                      stroke="orange"
                      activeDot={{ r: 8 }}
                    ></Line>
                  </LineChart>
                </ResponsiveContainer>
              </Col>

              {/* composed chart  */}

              <Col lg={5} md={12}>
              <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
                    <XAxis
                      dataKey="name"
                      interval={"preserveStartEnd"}
                      tickFormatter={(value) => value + " ECT"}
                    />
                   
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Area
                      type="monotone"
                      dataKey="name"
                      fill="#8884d8"
                      stroke="#8884d8"
                    />
                    <Bar dataKey="student" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="fees" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Col>
            </Row>
            <Row className="line_chart">
              {/* line chart  */}

              <Col lg={6} md={12}>
              <ResponsiveContainer width="100%" height={300}>
          <PieChart>
                    <Pie
                      data={dataa}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                      <YAxis className="yaxis" />
                      <Tooltip contentStyle={{ backgroundClip: "blue" }} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Col>

              {/* composed chart  */}

              <Col lg={5} md={12}>
              <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}
                    width="80%"
                    height="100%"
                    
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundClip: "blue" }} />
                    <Bar
                      dataKey="student"
                      fill="#8884d8"
                      shape={<TriangleBar />}
                      label={{ position: "top" }}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Col>
            </Row>

            {/* SECOND ROW  */}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default dashboard;
