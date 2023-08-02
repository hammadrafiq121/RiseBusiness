import React from "react";
import {ResponsiveContainer, LineChart, Line, XAxis ,YAxis , CartesianGrid, Legend, Tooltip, PieChart, Pie, ComposedChart, Area } from 'recharts';
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { BarChart, Bar, Cell } from 'recharts';



// line chart data


const data=[
    {
        name:'Python',
        student:'13',
        fees:'10'
    },

    {
        name:'Javascript',
        students:'20',
        fees:'10'
    },

     {
        name:'Selenium',
        student:'10',
        fees:'8'
    },

    {
        name:'Php',
        student:'14',
        feess:'9'
    },

    {

        name:'Css',
        student:'30',
        fees:'13'
    },
    {
        name:'C',
        student:'12',
        fees:'7'
    }
];
// line chart data end
/////////////////////////////////////////////////////////
    

// pie chart data



    const dataa = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
// pie chart data end
/////////////////////////////////////////////////////////////////////


// bar chart data 

const data1=[
    {
        Name:"JohnDoe",
        id:"01",
        salary:"1000"
    },
    {
        Name:"Duker",
        id:"03",
        salary:"2000"
    },
    {
        Name:"Janiffer",
        id:"04",
        salary:"3000"
    },
    {
        Name:"BobDoe",
        id:"07",
        salary:"4000"
    }
];

        



const dashboard = () => {
  return (
    
<>
<div className="div">


  <div className="chart_div">
<div className=" chart_container ">


<div className="dash_div" >

<Row className="row1"  >

<Col lg={3} className="dash_col" >

  <Row className="col-user" >
<Col  lg={2} >
<i class='bx bxs-user User user1 '  ></i>

</Col>
<Col  lg={8}  className="total-col" >
<h2>Total Agent</h2>
<p>1000</p>

</Col>

  </Row>


</Col>


<Col lg={3} className="dash_col" >

  <Row className="col-user" >
<Col  lg={2} >
<i class='bx bx-objects-vertical-bottom user1'></i>

</Col>
<Col  lg={7}  className="total-col" >
<h2>Total Projects</h2>
<p>6000</p>

</Col>

  </Row>


</Col>
<Col lg={3} className="dash_col" >

  <Row className="col-user" >
<Col  lg={2} >
<i class='bx bx-terminal user1' ></i>

</Col>
<Col  lg={7}  className="total-col" >
<h2>Total Client</h2>
<p>10000</p>

</Col>

  </Row>


</Col>

</Row>


  </div>

  










    {/* two chart line & pie chart  */}
    <Row className="line_chart" >

        {/* line chart  */}

        <Col lg={5}  >
    


<ResponsiveContainer width="90%" height="100%" aspect={2} >
    <LineChart  data={data} >
        <CartesianGrid />
        <XAxis dataKey="name" interval={"preserveStartEnd"} tickFormatter={(value)=>value+" ECT"}  />
        <YAxis className="yaxis" />
        <Legend />
        <Tooltip contentStyle={{backgroundClip:'blue'}} />

        <Line  type="monotone" dataKey="student" stroke="red"  activeDot={{r:18}}>
        </Line>
        <Line  dataKey="fees" stroke="orange"  activeDot={{r:8}}></Line>


    </LineChart>
    
</ResponsiveContainer>
</Col>

{/* bar chart  */}

<Col lg={5} className="bar_chart" >


<ComposedChart width={600} height={280} data={data}>
  <XAxis dataKey="name"  interval={"preserveStartEnd"} tickFormatter={(value)=>value+" ECT"} />
  <YAxis className="yaxis"/>
  <Tooltip  contentStyle={{backgroundClip:'blue'}} />
  <Legend />
  <CartesianGrid stroke="#f5f5f5" />
  <Area type="monotone" dataKey="name" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="student" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="fees" stroke="#ff7300" />
</ComposedChart>


</Col>
</Row>







{/* two chart bar & composed chart */}
<Row className="row_chart row2"s >


{/* pie chart  */}
    <Col lg={5} >
    
   
    <BarChart width={600} height={285} data={data1}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="Name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="salary" fill="#8884d8" />
  <Bar dataKey="id" fill="#82ca9d" />
</BarChart>


</Col>


{/* composed chart */}
<Col lg={5} >
<PieChart width={500} height={300}>
<Tooltip cursor={true} /> 
          <Pie
            data={dataa}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
     
</Col>
</Row>




</div>
</div>



</div>


</>
  
  );
};
export default dashboard;