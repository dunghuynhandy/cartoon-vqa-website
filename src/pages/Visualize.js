import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { PieChart, Pie, Cell, Legend, LineChart, Tooltip, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
// import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import ClipLoader from "react-spinners/ClipLoader";

const Example = () => {
  const [summary, setSummary] = useState({ categories: [], topics: [], len_ques: [] });
  const [value_filter, setValueFilter] = useState("All");
  const [num_filter, setNumFilter] = useState("0");
  const [subType, setSubType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [data_type, setData_type] = useState("Train and Validation");

  const FONTSIZE = '24px'

  useEffect(() => {
    axios.get('/visualize/all/0/all').then(res => {
      setSummary(res.data)
      setLoading(false)
    });
  }, []);

  const resizeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #9FA6B2",
  };


  const RADIAN = Math.PI / 180;
  const COLORS = [
    '#66FFFF', '#99FF66', '#66CCFF', '#FFE6B3', '#FF4D4D', '#FFFF33', '#FFE599',
    '#FF6666', '#FFEB99', '#00CC00', '#FF0000', '#FFF0CC', '#99FFFF', '#FFF999',
    '#33FF00', '#CCFFCC', '#00FFFF', '#FFCCCC', '#FF3333', '#FF6666', '#FF8080',
    '#FFDC99', '#FFFF99', '#FFFF99', '#99FF99', '#FFB3B3', '#66FF33', '#CC66FF', '#FFFF66',
    '#FF99FF', '#FFFFE5', '#CCFFFF', '#FF6666', '#FF66FF', '#33FFFF', '#33FF33', '#FF9999',
    '#FFFF66', '#0099FF', '#FFFFCC', '#FFCC00', '#FFFF00', '#99CCFF', '#FFFFCC', '#FF33FF',
    '#FF9999', '#FFEE99', '#CCFFFF', '#CCFF99', '#33CCFF', '#FFFF00', '#99FFFF', '#FFCC99',
    '#FF9933', '#FFD280', '#FFCC66', '#00FF00', '#66FF66', '#0066FF', '#FFD699']
  let topic_sum = 0
  for (let i = 0; i < summary.topics.length; i++) {
    topic_sum += summary.topics[i].value
  }
  const filteredTopicData = summary.topics.filter((item) => item.percent >= 5);
  const droppedTopicCounts = summary.topics
    .filter((item) => item.percent < 5)
    .reduce((sum, item) => sum + item.value, 0);

  // Create a new "other" category
  const otherCategory = { value: droppedTopicCounts, fill: '#4DB6AC', name: 'other', percent: (droppedTopicCounts / topic_sum) * 100 };
  const topicdata = [...filteredTopicData, otherCategory];
  const numberChange = async (value) => {
    setLoading(true)
    setNumFilter(value)
    await axios.get('/visualize/' + value_filter + '/' + value + '/' + subType).then(res => {
      setSummary(res.data)
    }).then(() => {
      console.log("Done!")
    }).finally(() => {
      setLoading(false)
    })
  };

  const valueChange = async (value) => {
    setValueFilter(value)
    setLoading(true)
    await axios.get('/visualize/' + value + '/' + num_filter + '/' + subType).then(res => {
      setSummary(res.data)
    }).then(() => {
      console.log("Done!")
    }).finally(() => {
      setLoading(false)
    })
  };

  const dataTypeChange = async (value) => {
    if (value === "All") {
      setData_type("Train and Validation")
    } else if (value === "train") {
      setData_type("Train")
    } else { setData_type("Validation") }
    setSubType(value)
    setLoading(true)
    await axios.get('/visualize/' + value_filter + '/' + num_filter + '/' + value).then(res => {
      setSummary(res.data)
    }).then(() => {
      console.log("Done!")
    }).finally(() => {
      setLoading(false)
    })
  };

  const reset = async (value) => {
    setSubType("all")
    setValueFilter("all")
    setNumFilter("0")
    setLoading(true)
    setData_type("Train and Validation")
    axios.get('/visualize/all/0/all').then(res => {
      setSummary(res.data)
    }).then(() => {
      console.log("Done!")
    }).finally(() => {
      setLoading(false)
    })
  };

  const renderPieCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const labelX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const labelY = cy + labelRadius * Math.sin(-midAngle * RADIAN);


    return (

      <text
        x={labelX}
        y={labelY}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Book Antiqua, Times, serif"
        fontSize={20}
      >
        {`${(percent).toFixed(0)}%`}
      </text>
    );
  };
  const renderPieCustomizedLabel2 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const labelX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const labelY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    return (

      <text
        x={labelX}
        y={labelY}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Book Antiqua, Times, serif"
        fontSize={20}
      >
        {`${(percent).toFixed(2) * 100}%`}
      </text>
    );
  };




  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }) => {
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const labelX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const labelY = cy + labelRadius * Math.sin(-midAngle * RADIAN);
    if (midAngle > 90 & midAngle < 270) {
      return (
        <text
          x={labelX}
          y={labelY}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          transform={`rotate(${180 - midAngle}, ${labelX}, ${labelY})`}
          fontSize={12}
          fontWeight="bold"
          fontFamily="Book Antiqua, Times, serif"
        >
          {`${name}`}
        </text>
      );
    } else {
      return (
        <text
          x={labelX}
          y={labelY}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          transform={`rotate(${360 - midAngle}, ${labelX}, ${labelY})`}
          fontSize={12}
          fontWeight="bold"
          fontFamily="Book Antiqua, Times, serif"

        >
          {`${name}`}
        </text>
      );
    }

  };


  const renderCustomLabel = (props, key) => {
    const { name, x, y, width, height, value } = props;
    const textAnchor = 'middle';
    const labelX = x + width / 2;
    let labelY = 0
    let fontsize = 12

    if (key.length > 15) {
      fontsize = 10
    }
    if (height < 10) {
      labelY = y + height + 5
      fontsize = 10
    } else if (height < 30) {
      fontsize = 10
      labelY = y + height
    } else if (height < 50) {
      labelY = y + height / 1.3
    } else if (height < 70) {
      labelY = y + height / 1.3
    } else if (height < 150) {
      labelY = y + height / 1.7
    } else if (height < 200) {
      labelY = y + height / 1.9
    } else {
      labelY = y + height / 2.1

    }
    if (value > 0) {
      return (
        <text
          fontFamily="Book Antiqua, Times, serif"
          key={key} x={labelX} y={labelY} dy={-5} textAnchor={textAnchor} fontSize={fontsize} fontWeight="bold">
          {key}
        </text>
      );
    }

  };

  return (
    <div class="container min-vh-100 mt-2">

      <div class="row">
        <h1 class="text-success my-5">Visualize</h1>
        <div class="row">
          <div class="col-5"></div>
          <div class="col-2">
            <div class="my-2">
              <select class="form-control text-center" value={subType} onChange={(e) => dataTypeChange(e.target.value)} >
                <option value="All">Train + Validation</option>
                <option value="train">Train</option>
                <option value="val">Validation</option>
              </select>
            </div>

          </div>
          <div class="col-2">
            <div class="my-2">
              <select class="form-control text-center" value={value_filter} onChange={(e) => valueChange(e.target.value)} >
                <option value="All">All</option>
                <option style={{ "color": "#28B463" }} value="Correct">Correct</option>
                <option style={{ "color": "#512E5F" }} value="Ambiguous">Ambiguous</option>
                <option style={{ "color": "#E74C3C" }} value="Incorrect">Incorrect</option>
              </select>
            </div>

          </div>
          <div class="col-2">
            <div class="my-2">
              <select class="form-control text-center" value={num_filter} onChange={(e) => numberChange(e.target.value)} >
                <option value="0">0</option>
                <option class="text-primary" value="1">1</option>
                <option class="text-primary" value="2">2</option>
                <option class="text-primary" value="3">3</option>
              </select>
            </div>
          </div>
          <div class="col-1">
            <button type="button" class="btn btn-outline-success my-2" onClick={reset}>Reset</button>
          </div>
        </div>

        <div>


          {loading ? (
            <>
              <div class="row" style={{ height: "200px" }}>
              </div>
              <div style={{ "display": "flex", "justify-content": "center" }}>
                <ClipLoader
                  color="#36d7b7"
                  loading={loading}
                  size={400}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />

              </div>

            </>
          ) : (
            <>
              {/*  PIE MTURK QUESTION_ANSWER PAIR RATING */}
              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success">Question-Answer Pair Evaluation Responses From MURK Workers on The {data_type} set</h4>
                {/* TABLE  */}
                <div class="col-4">
                  <table class="table">
                    <thead>
                      <tr >
                        <th class="text-success" scope="col">#</th>
                        <th class="text-success" scope="col">Response</th>
                        <th class="text-success" scope="col">Count</th>
                        <th class="text-success" scope="col">Percent</th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.entries(summary.categories).map(([key, category]) => (
                        <tr>
                          <td>{parseInt(key) + 1}</td>
                          <td>{category.name}</td>
                          <td>{category.value}</td>
                          <td>{category.percent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h6 class="text-center mt-3 text-success mb-5">Table 1: Percentage of  MUTRK Workers on The {data_type} set</h6>
                </div>
                {/* PIE CHART  */}

                <div class="col-8">

                  <div style={{ "display": "flex", "justify-content": "center" }}>
                    <Resizable
                      defaultSize={{
                        width: 400,
                        height: 400
                      }}
                      style={resizeStyle}
                    >
                      <ResponsiveContainer width={"100%"} height={"100%"}>
                        <PieChart >
                          <Pie
                            data={summary.categories}
                            dataKey="value"
                            nameKey="name"
                            outerRadius="100%"
                            labelLine={false}
                            label={renderPieCustomizedLabel}

                          >
                            {summary.categories.map((entry, index) => (
                              <Cell key={index} />
                            ))}
                          </Pie>
                          <Legend formatter={(value, entry) => (
                            <span style={{ fontFamily: "Book Antiqua, Times, serif", fontSize: FONTSIZE, fill: "#000000" }}>
                              {value}
                            </span>
                          )}
                            fontSize={20} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Resizable>

                  </div>
                  <h6 class="text-center mt-3 text-success mb-5">The Answers of MTURK Workers on The {data_type} set</h6>
                </div>
              </div>

              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success mb-5">Number of Assigments acoording to Number of Worker Answers on The {data_type} set</h4>
                <div style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 1000,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <ResponsiveContainer width="97%" height="100%">
                      <BarChart data={summary.category_worker} >
                        <CartesianGrid stroke="#000000" strokeDasharray="3 3" />
                        <XAxis dataKey="name"
                          tick={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }} />
                        <YAxis
                          width={100}
                          tick={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }}
                          label={{
                            fontFamily: "Book Antiqua, Times, serif",
                            fontSize: FONTSIZE,
                            value: 'Percentage of Assignments', offset: -4, angle: -90, position: 'left',
                            style: { textAnchor: 'middle', fill: "#000000" }
                          }} />
                        <Tooltip />
                        <Bar dataKey="1 worker" fill="#A569BD" />
                        <Bar dataKey="2 workers" fill="#5DADE2" />
                        <Bar dataKey="3 workers" fill="#45B39D" />
                        <Legend formatter={(value, entry) => (
                          <span style={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }}>
                            {value}
                          </span>
                        )} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Resizable>
                </div>
                <h6 class="text-center mt-3 text-success mb-5">Number of Assigments acoording to Number of Worker Answers on The {data_type} set</h6>
              </div>

              {/*  MTURK QUESTION_ANSWER PAIR RATING   */}
              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success">The Number of Workers with The Same Answer on The {data_type} set</h4>
                <div >
                  <div style={{ "display": "flex", "justify-content": "center" }}>
                    <Resizable
                      defaultSize={{
                        width: 1000,
                        height: 400
                      }}
                      style={resizeStyle}
                    >
                      <ResponsiveContainer height={"100%"} width={"95%"}>
                        <LineChart data={summary.cumulative_category}>
                          <CartesianGrid stroke="#000000" strokeDasharray="3 3" />

                          <XAxis
                            dataKey="name" tick={{ fontFamily: "Book Antiqua, Times, serif", fontSize: FONTSIZE, fill: "#000000" }} />

                          <YAxis
                            width={100}
                            tick={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }}
                            label={{ fontFamily: "Book Antiqua, Times, serif", fontSize: FONTSIZE, fill: "#000000", value: 'Number of Responses', offset: -4, angle: -90, position: 'left', style: { textAnchor: 'middle', fill: "#000000" } }} />
                          <Tooltip />
                          <Legend formatter={(value, entry) => (
                            <span style={{ fontFamily: "Book Antiqua, Times, serif", fontSize: FONTSIZE, fill: "#000000" }}>
                              {value}
                            </span>
                          )} />
                          <Line type="monotone" dataKey="incorrect" strokeWidth={2} stroke="#E74C3C" />
                          <Line type="monotone" dataKey="ambiguous" strokeWidth={2} stroke="#512E5F" />
                          <Line type="monotone" dataKey="correct" strokeWidth={2} stroke="#28B463" />

                        </LineChart>
                      </ResponsiveContainer>

                    </Resizable>
                  </div>
                </div>
                <div class="text-center">
                  <h6 class="text-center mt-3 mb-5 text-success">Cumulative Chart of The Number of Worker with The Same Answers on The {data_type} set</h6>
                  <h7 ></h7>
                </div>
              </div>

              {/*  Distribution of questions by their first four words   */}

              <div class="row my-4 border-bottom border-success" style={{ "display": "flex", "justify-content": "center" }}>

                <div class="row">
                  <div class="col-8"><h4 class="text-success">Percentage of First Words of Questions and Distribution of Questions by Their First Five Words on The {data_type} set</h4></div>
                </div>
                <div class="row">
                  {/* <div class="col-6">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="text-success" scope="col">#</th>
                          <th class="text-success" scope="col">First Word</th>
                          <th class="text-success" scope="col">Count</th>
                          <th class="text-success" scope="col">Percent</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Object.entries(summary.first_word).map(([key, word]) => (
                          <tr>
                            <td>{parseInt(key) + 1}</td>
                            <td>{word.name}</td>
                            <td>{word.value}</td>
                            <td>{word.percent}%</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <h6 class="text-center mt-3 text-success mb-5">Table 2: Percentage of First Words of Questions on The {data_type} set</h6>
                  </div> */}
                  <div>
                    <div style={{ "display": "flex", "justify-content": "center" }}>
                      <Resizable
                        defaultSize={{
                          width: 800,
                          height: 800
                        }}
                        style={resizeStyle}
                      >

                        <ResponsiveContainer height={"100%"} width={"100%"}>
                          <PieChart>
                            <Pie
                              data={summary.nest_question}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"

                              innerRadius={"10%"}
                              outerRadius={"28%"}
                              labelLine={false}
                              label={renderCustomizedLabel}

                            >
                            </Pie>
                            <Pie
                              data={summary.nest_question.flatMap((entry) => entry.children)}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={"28%"}
                              outerRadius={"46%"}
                              labelLine={false}
                              label={renderCustomizedLabel}
                            >
                            </Pie>
                            <Pie
                              data={summary.nest_question.flatMap((entry1) => entry1.children).flatMap((entry2) => entry2.children)}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={"46%"}
                              outerRadius={"64%"}
                              labelLine={false}
                              label={renderCustomizedLabel}

                            >


                            </Pie>
                            <Pie
                              data={summary.nest_question.flatMap((entry1) => entry1.children).flatMap((entry2) => entry2.children).flatMap((entry3) => entry3.children)}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={"64%"}
                              outerRadius={"82%"}
                              labelLine={false}
                              label={renderCustomizedLabel}

                            >
                            </Pie>
                            <Pie
                              data={summary.nest_question.flatMap((entry1) => entry1.children).flatMap((entry2) => entry2.children).flatMap((entry3) => entry3.children).flatMap((entry4) => entry4.children)}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={"82%"}
                              outerRadius={"100%"}
                              labelLine={false}
                              label={renderCustomizedLabel}

                            >
                            </Pie>

                          </PieChart>
                        </ResponsiveContainer>

                      </Resizable>
                    </div>

                  </div>
                  <h6 class="text-center text-success mt-3 mb-5">Distribution of Questions by Their First Five Words on The {data_type} set</h6>
                </div>
              </div>

              {/*  Percentage of Topic   */}
              <div class="row my-4 border-bottom border-success">

                <h4 class="text-success">Percentage of Question Topics on The {data_type} set</h4>
                {/* TABLE  */}
                <div class="col-4 ps-5">
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="text-success" scope="col">#</th>
                        <th class="text-success" scope="col">Topic</th>
                        <th class="text-success" scope="col">Count</th>
                        <th class="text-success" scope="col">%</th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.entries(summary.topics).map(([key, topic]) => (
                        <tr>
                          <td>{parseInt(key) + 1}</td>
                          <td>{topic.name}</td>
                          <td>{topic.value}</td>
                          <td>{topic.percent}%</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h6 class="text-center mt-3 text-success mb-5">Table 3: Percentage of Question Topics on The {data_type} set</h6>
                </div>

                <div class="col-8">
                  <div style={{ "display": "flex", "justify-content": "center" }}>
                    <Resizable
                      defaultSize={{
                        width: 400,
                        height: 400
                      }}
                      style={resizeStyle}
                    >
                      <ResponsiveContainer width={"100%"} height={"100%"}>
                        <PieChart width={800} height={400}>
                          <Pie
                            data={topicdata}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={"100%"}
                            label={renderPieCustomizedLabel}
                            labelLine={false}

                          >
                          </Pie>

                          <Legend formatter={(value, entry) => (
                            <span style={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }}>
                              {value}
                            </span>
                          )} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Resizable>
                  </div>

                  <h6 class="text-center mt-3 text-success mb-5">Percentage of Question Topics on The {data_type} set</h6>
                </div>
              </div>
              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success mb-5">Percentage of questions with different word lengths on The {data_type} set</h4>
                <div class="row" style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 1000,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <ResponsiveContainer width={"96%"} height={"100%"}>
                      <LineChart data={summary.len_ques}>
                        <CartesianGrid stroke="#000000" strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontFamily: "Book Antiqua, Times, serif", fontSize: FONTSIZE, fill: "#000000" }} />
                        <YAxis
                          tick={{ fontFamily: "Book Antiqua, Times, serif", fontSize: FONTSIZE, fill: "#000000" }}
                          label={{ fontFamily: "Book Antiqua, Times, serif", fontSize: FONTSIZE, fill: "#000000", value: 'Percentage of Questions', offset: -4, angle: -90, position: 'left', style: { textAnchor: 'middle', fill: "#000000" } }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="percent" stroke="#14A44D" strokeWidth={4} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Resizable>
                </div>
                <h6 class="text-center mt-3 text-success mb-5">Percentage of questions with different word lengths on The {data_type} set</h6>
              </div>
              {/* 
<div class="row my-4 border-bottom border-success text-center">
<div class="" >
<Plot data={data} layout={layout} />
</div>
<h6 class="text-center mt-3 text-success mb-5">Box Plot of Question Lengths on The {data_type} set</h6>
</div>
{/*
<div>
<h1>My React Boxplot App</h1>

</div>
*/}
              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success mb-5">Percentage of 50 Most frequent Answers on The {data_type} set</h4>
                <div style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 1000,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <ResponsiveContainer width={"95%"} height="100%">
                      <BarChart data={summary.answer_list}>
                        <CartesianGrid stroke="#000000" strokeDasharray="3 3" />
                        <XAxis height={80} interval={0} angle={-45}
                          tick={{
                            fill: "#000000",
                            fontSize: FONTSIZE,
                            fontFamily: "Book Antiqua, Times, serif",
                            textAnchor: "end"
                          }}
                          dataKey="name" />
                        <YAxis
                          domain={[0, 24]}
                          width={60}
                          tick={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }}
                          label={{
                            value: 'Percentage of Answers', offset: -4, angle: -90, position: 'left',
                            style: { textAnchor: 'middle', fill: "#000000" },
                            fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE
                          }} />
                        <Tooltip />
                        <Bar dataKey="percent" fill="#14A44D" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Resizable>
                </div>
                <h6 class="text-center mt-3 text-success mb-5">Percentage of 50 Most frequent Answers on The {data_type} set</h6>
              </div>
              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success mb-5">Percentage of Answer Types on The {data_type} set</h4>
                <div class="row" style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 400,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <ResponsiveContainer width={"100%"} height={"100%"}>

                      <PieChart>
                        <Pie
                          data={summary.answer_type}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={"100%"}
                          label={renderPieCustomizedLabel}
                          labelLine={false}
                        >
                        </Pie>

                        <Legend formatter={(value, entry) => (
                          <span style={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }}>
                            {value}
                          </span>
                        )} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Resizable>
                </div>
                <h6 class="text-center mt-3 text-success mb-5">Percentage of Answer Types on The {data_type} set</h6>
              </div>
              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success mb-5">Distribution of Answers per Question First Words on The {data_type} set</h4>
                <div style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 1000,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <ResponsiveContainer width="97%" height="100%">
                      <BarChart data={summary.qa_stack.data} >
                        <CartesianGrid stroke="#000000" strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontFamily: "Book Antiqua, Times, serif", fontSize: 14, fill: "#000000" }} />
                        <YAxis
                          width={60}
                          tick={{ fontFamily: "Book Antiqua, Times, serif", fontSize: 14, fill: "#000000" }}
                          label={{
                            fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: 14, value: 'Percentage of Answers', offset: -4, angle: -90, position: 'left', style: { textAnchor: 'middle', fill: "#000000" },
                            fontFamily: "Book Antiqua, Times, serif",
                          }} />

                        {summary.qa_stack.keys.map((key, index) => (
                          <Bar key={index}
                            dataKey={key}
                            stackId="a"
                            fill={COLORS[index]}
                          >
                            <LabelList dataKey={key} content={(props) => renderCustomLabel(props, key)} />
                          </Bar>
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </Resizable>
                </div>

                <h6 class="text-center mt-3 text-success mb-5">Distribution of Answers per Question First Words on The {data_type} set</h6>
              </div>
              <div class="row my-4 border-bottom border-success">
                <h4 class="text-success mb-5">Distribution of Question Topic per Question First Words on The {data_type} set</h4>
                <div style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 1000,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <ResponsiveContainer width="97%" height="100%">
                      <BarChart data={summary.qt_stack.data} >
                        <CartesianGrid stroke="#000000" strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontFamily: "Book Antiqua, Times, serif", fontSize: 20, fill: "#000000" }} />
                        <YAxis
                          tick={{ fontFamily: "Book Antiqua, Times, serif", fontSize: 20, fill: "#000000" }}
                          domain={[0, 100]} label={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: 20, value: 'Percentage of Topics', offset: -4, angle: -90, position: 'left', style: { textAnchor: 'middle', fill: "#000000" } }} />

                        {summary.qt_stack.keys.map((key, index) => (
                          <Bar key={index}
                            dataKey={key}
                            stackId="a"
                            fill={COLORS[index]}
                          >
                            <LabelList dataKey={key} content={(props) => renderCustomLabel(props, key)} />
                          </Bar>
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </Resizable>
                </div>

                <h6 class="text-center mt-3 text-success mb-5">Distribution of Question Topic per Question First Words on The {data_type} set</h6>
              </div>
              {/* 
              <div class="row my-4">
                <h4 class="text-success mb-4"> Word Clouds of Questions on The {data_type} set</h4>
                <div style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 400,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <div style={{ width: "100%", height: "100%" }}>
                      <ReactWordcloud words={summary.question_bag} />
                    </div>
                  </Resizable>

                </div>
                <h6 class="text-center mt-3 text-success mb-5">Word Clouds of Questions on The {data_type} set</h6>
              </div>
              <div class="row my-4">
                <h4 class="text-success mb-4"> Word Clouds of Answers on The {data_type} set</h4>
                <div style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 400,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <div style={{ width: "100%", height: "100%" }}>
                      <ReactWordcloud words={summary.answer_bag} />
                    </div>
                  </Resizable>

                </div>
                <h6 class="text-center mt-3 text-success mb-5">Word Clouds of Question and Answers on The {data_type} set</h6>
              </div>
              <div class="row my-4">
                <h4 class="text-success mb-4"> Word Clouds of Question and Answers on The {data_type} set</h4>
                <div style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 400,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <div style={{ width: "100%", height: "100%" }}>
                      <ReactWordcloud words={summary.question_answer_bag} />
                    </div>
                  </Resizable>

                </div>
                <h6 class="text-center mt-3 text-success mb-5">Word Clouds of Question and Answers on The {data_type} set</h6>
              </div>
               */}
              <div class="row my-4">
                <h4 class="text-success mb-5"> Question Relevance on The {data_type} set</h4>
                <div class="row" style={{ "display": "flex", "justify-content": "center" }}>
                  <Resizable
                    defaultSize={{
                      width: 400,
                      height: 400
                    }}
                    style={resizeStyle}
                  >
                    <ResponsiveContainer width={"100%"} height={"100%"}>

                      <PieChart>
                        <Pie
                          data={summary.question_relevance}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={"100%"}
                          label={renderPieCustomizedLabel2}
                          labelLine={false}
                        >
                        </Pie>

                        <Legend formatter={(value, entry) => (
                          <span style={{ fontFamily: "Book Antiqua, Times, serif", fill: "#000000", fontSize: FONTSIZE }}>
                            {value}
                          </span>
                        )} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Resizable>
                </div>
                <h6 class="text-center mt-3 text-success mb-5">Question Relevance on The {data_type} set</h6>
              </div>

            </>
          )}
        </div>
        <div class="col-1"></div>
      </div>




    </div>
  )
};

export default Example;