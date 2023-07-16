import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
const Example = () => {
  const [examples, setExamples] = useState([]);
  const [value_filter, setValueFilter] = useState("All");
  const [num_filter, setNumFilter] = useState("0");

  useEffect(() => {
    axios.get('/get_examples/all/0').then(res => {
      setExamples(res.data)
    });
  }, []);

  const numberChange = async (value) => {
    await axios.get('/get_examples/' + value_filter + '/' + value).then(res => {
      setNumFilter(value)
      setExamples(res.data)
    }).then(() => {
      console.log("Done!")
    })
  };
  const valueChange = async (value) => {
    await axios.get('/get_examples/' + value + '/' + num_filter).then(res => {
      setValueFilter(value)
      setExamples(res.data)
    }).then(() => {
      console.log("Done!")
    })
  };
  const random = async () => {
    await axios.get('/get_examples/' + value_filter + '/' + num_filter).then(res => {
      setExamples(res.data)
    }).then(() => {
      console.log("Done!")
    })
  };
  const convert_result = (value) => {
    if (value == 1) {
      return "Correct"
    } else if (value == 0.75) {
      return "Partially Correct"
    } else if (value == 0.5) {
      return "Ambiguous"
    } else if (value == 0.25) {
      return "Partially Incorrect"
    } else { return "Incorrect"}
    
  }
  return (
    <div class="container min-vh-100 mt-2">
      <div class="row" style={{ height: "800px",}} >
        <div class="col-2"></div>
        <div class="col-2 my-5" ><h1 class="text-success">Examples</h1></div>
      </div>
      <div class="row">
        <div class="col-2">
        </div>
        <div class="col-4"></div>
        <div class="col-2 d-flex">
          <div class="my-2">
            <select class="form-control text-center" value={value_filter} onChange={(e) => valueChange(e.target.value)} >
              <option value="All">All</option>
              <option style={{"color": "#0E6251"}} value="Correct & Partially Correct">Correct & Partially Correct</option>
              <option style={{"color": "#28B463"}} value="Correct">Correct</option>
              <option style={{"color": "#82E0AA"}} value="Partially Correct">Partially Correct</option>

              <option style={{"color": "#512E5F"}} value="Ambiguous">Ambiguous</option>
              <option style={{"color": "#F39C12"}}  value="Partially Incorrect">Partially Incorrect</option>
              <option  style={{"color": "#E74C3C"}} value="Incorrect">Incorrect</option>
              <option  style={{"color": "#B03A2E"}} value="Incorrect & Partially Incorrect">Incorrect & Partially Incorrect</option>
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
        <div class="col-2 my-2">
          <button type="button" class="btn btn-outline-success" onClick={random}>Random</button>
        </div>

      </div>
      <div class="row">

        <div class="col-12">
          <div className='image-grid'>
            {examples.map(image => (
              <div class="col-3">
                <div class="card m-2 border-success d-flex align-items-stretch">
                  <img class="m-1" src={image.img_path} style={{ height: "200px", "border-radius": "6px" }} />
                  <p class="mx-2 my-0" style={{ height: "40px"}} ><span class="text-success">Question:</span> {image.question}</p>
                  <p class="mx-2 my-0"><span class="text-success">Answer:</span> {image.answer}</p>
                  <p class="mx-2 my-0 text-success">Judgements:</p>
                  <ul class="mx-4 my-0">
                      <li><p class="card-text"><span class="text-success">worker_1:</span> {convert_result(image.judgements.worker_1)} </p></li>
                      <li><p class="card-text"><span class="text-success">worker_2:</span> {convert_result(image.judgements.worker_2)} </p></li>
                      <li><p class="card-text"><span class="text-success">worker_3:</span> {convert_result(image.judgements.worker_3)}</p></li>
                    </ul>
                    <p class="mx-2 my-0 pb-1"><span class="text-success">Overal Score:</span> {image.overal_score}</p>
                </div>

              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Example;