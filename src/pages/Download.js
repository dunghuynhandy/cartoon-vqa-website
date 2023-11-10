import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const FileUploadForm = () => {

  return (
    <div class="container mt-5" style={{"position": "relative"}}>
      <div class="row">
          <h1 class="text-success my-5">Download</h1>

      </div>

      <div class="row">
      <div class="col-4 border-end border-1 border-success">
        <h4 class="text-success text-center">Simpsons-VQA Annotations</h4>
        <ul class="mt-5">
          <li class="my-4">
            <Link class="text-success" to="https://storage.googleapis.com/cartoonvqa/v1_Annotation_Train_simpsons_vqa.zip" target="_blank" download>Training Annotations: 77,991 answers</Link>
          </li>
          <li>
            <Link class="text-success" to="https://storage.googleapis.com/cartoonvqa/v1_Annotation_Val_simpsons_vqa.zip" download>Validation Annotations: 12,552 answers</Link>
          </li>
        </ul>
      </div>
      <div class="col-4 border-end border-1 border-success">
        <h4 class="text-success text-center">Simpsons-VQA Input Questions</h4>
        <ul class="mt-5">
          <li class="my-4">
            <Link class="text-success" to="https://storage.googleapis.com/cartoonvqa/v1_Question_Train_simpsons_vqa.zip" target="_blank" download>Training Questions: 77,991 questions</Link>


          </li>
          <li class="my-4">
            <Link class="text-success" to="https://storage.googleapis.com/cartoonvqa/v1_Question_Val_simpsons_vqa.zip" target="_blank" download>Validation Questions: 12,552 questions</Link>

          </li>
          {/* 
          <li>
            <Link class="text-success" to="/v1_Question_Test_simpsoon_vqa.json" target="_blank" download>Testing Questions: 13336 questions</Link>
          </li>*/}
        </ul>
      </div>
      <div class="col-4 ">
        <h4 class="text-success text-center">Simpsons-VQA Input Images</h4>
        <ul class="mt-5">
          <li class="my-4">
            <Link class="text-success" to="https://storage.googleapis.com/cartoonvqa/train_images.zip" target="_blank" download>Training Images: 13,961 images</Link>
          </li>
          <li class="my-4">
            <Link class="text-success" to="https://storage.googleapis.com/cartoonvqa/val_images.zip" target="_blank" download>Validation Images: 3,490 images</Link>

          </li>
          {/* 
          <li>
            <Link class="text-success" to="https://storage.cloud.google.com/cartoon_img/test_images.zip?authuser=1" target="_blank" download>Testing Images: 5820 images</Link>

          </li>
          */}
        </ul>
      </div>
      </div>


      <h1 class="text-success my-5">Input Questions Format</h1>

      <div class="row">

          <div class="border border-1 border-success mx-3">
            <pre >
              <strong class="m-0">
                <p class="m-0 ">{"{"}</p>
                <p class="m-0">   <span class="text-success">"info":</span> {"{"}</p>
                <p class="m-0 ">       <span class="text-success">"description":</span> <span class="text-danger">"This is v1.0 of the Cartoon VQA dataset."</span>,</p>
                <p class="m-0 ">       <span class="text-success">"url":</span> <span class="text-danger">"simpsonsvqa.org"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"version":</span> <span class="text-danger">"1.0"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"year":</span> <span class="text-danger">"2023"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"date_created":</span> <span class="text-danger">"2023-08-01 00:00:00"</span></p>
                <p class="m-0 ">   {"}"},</p>
                <p class="m-0">   <span class="text-success">"task_type":</span> <span class="text-danger">"Open-Ended"</span>,</p>
                <p class="m-0">   <span class="text-success">"data_type":</span> <span class="text-danger">"The Simpsons"</span>,</p>
                <p class="m-0">   <span class="text-success">"license":</span> {"{"}</p>
                <p class="m-0 ">      <span class="text-success">"url":</span> <span class="text-danger">"http://creativecommons.org/licenses/by/4.0/"</span>,</p>
                <p class="m-0 ">      <span class="text-success">"name":</span> <span class="text-danger">"Creative Commons Attribution 4.0 International License"</span></p>
                <p class="m-0 ">   {"}"},</p>

                <p class="m-0">   <span class="text-success">"data_subtype":</span> <span class="text-danger">"train"</span>,</p>
                <p class="m-0">   <span class="text-success">"questions":</span> {"{"}</p>
                <p class="m-0 ">      <span class="text-success">"id":</span> <span class="text-danger">0</span>,</p>
                <p class="m-0 ">      <span class="text-success">"question":</span> <span class="text-danger">"are the chairs red or blue?"</span>,</p>
                <p class="m-0 ">      <span class="text-success">"img_path":</span> <span class="text-danger">"S24/S24E22-27951.jpg"</span></p>
                <p class="m-0 ">   {"}"},</p>
                <i class="text-muted">   ...</i>
                <p><strong>{"}"}</strong></p>
              </strong>
            </pre>
          </div>
          <p class="mt-4 mb-1 mx-3"><code class="text-success"><b>data_subtype</b></code>: Type of data subtype (train, val, test).</p>
      </div>

      <h1 class="text-success my-5">Input Annotations Format</h1>
      <div class="row mb-5 ">
            <div class="row">
              <div class="col-8">
                <div class="border  border-1 border-success">
                <pre >
                  <strong class="m-0">
                    <p class="m-0 ">{"{"}</p>
                    <p class="m-0">   <span class="text-success">"info":</span> {"{"}</p>
                    <p class="m-0 ">       <span class="text-success">"description":</span> <span class="text-danger">"This is v1.0 of the Cartoon VQA dataset."</span>,</p>
                    <p class="m-0 ">       <span class="text-success">"url":</span> <span class="text-danger">"simpsonsvqa.org"</span>,</p>
                    <p class="m-0 ">       <span class="text-success">"version":</span> <span class="text-danger">"1.0"</span>,</p>
                    <p class="m-0 ">       <span class="text-success">"year":</span> <span class="text-danger">"2023"</span>,</p>
                    <p class="m-0 ">       <span class="text-success">"date_created":</span> <span class="text-danger">"2023-08-01 00:00:00"</span></p>
                    <p class="m-0 ">   {"}"},</p>
                    <p class="m-0">   <span class="text-success">"task_type":</span> <span class="text-danger">"Open-Ended"</span>,</p>
                    <p class="m-0">   <span class="text-success">"data_type":</span> <span class="text-danger">"The Simpsons"</span>,</p>
                    <p class="m-0">   <span class="text-success">"license":</span> {"{"}</p>
                    <p class="m-0 ">      <span class="text-success">"url":</span> <span class="text-danger">"http://creativecommons.org/licenses/by/4.0/"</span>,</p>
                    <p class="m-0 ">      <span class="text-success">"name":</span> <span class="text-danger">"Creative Commons Attribution 4.0 International License"</span></p>
                    <p class="m-0 ">   {"}"},</p>

                    <p class="m-0">   <span class="text-success">"data_subtype":</span> <span class="text-danger">"train"</span>,</p>
                    <p class="m-0">   <span class="text-success">"annotations":</span> {"{"}</p>
                    <p class="m-0 ">      <span class="text-success">"id":</span> <span class="text-danger">0</span>,</p>
                    <p class="m-0 ">      <span class="text-success">"topic":</span> <span class="text-danger">"attribute classification"</span>,</p>
                    <p class="m-0 ">      <span class="text-success">"answer_type":</span> <span class="text-danger">"other"</span>,</p>
                    <p class="m-0 ">      <span class="text-success">"first_word":</span> <span class="text-danger">"are"</span>,</p>
                    <p class="m-0 ">      <span class="text-success">"answer":</span> <span class="text-danger">"red"</span>,</p>
                    <p class="m-0 ">      <span class="text-success">"judgements":</span> {"{"}</p>
                    <p class="m-0 ">          <span class="text-success">"worker_1":</span> <span class="text-danger"></span>{"{"}<span class="text-success">"question": </span><span class="text-danger">1</span>, <span class="text-success">"answer": </span><span class="text-danger">1</span>{"}"},</p>
                    <p class="m-0 ">          <span class="text-success">"worker_2":</span> <span class="text-danger"></span>{"{"}<span class="text-success">"question": </span><span class="text-danger">1</span>, <span class="text-success">"answer": </span><span class="text-danger">1</span>{"}"},</p>
                    <p class="m-0 ">          <span class="text-success">"worker_3":</span> <span class="text-danger"></span>{"{"}<span class="text-success">"question": </span><span class="text-danger">1</span>, <span class="text-success">"answer": </span><span class="text-danger">0.5</span>{"}"}</p>
                    <p class="m-0 ">      {"}"},</p>
                    <p class="m-0 ">      <span class="text-success">"overall_scores":</span> {"{"} </p>
                    <p class="m-0 ">          <span class="text-success">"question":</span> <span class="text-danger">1</span>, </p>
                    <p class="m-0 ">          <span class="text-success">"answer":</span> <span class="text-danger">0.83</span>, </p>
                    <p class="m-0 ">      {"}"},</p>
                    <p class="m-0 ">   {"}"},</p>
                    <i class="text-muted">   ...</i>
                    <p><strong>{"}"}</strong></p>
                  </strong>
                </pre>
                </div>
              </div>
              <div class="col-4">
                <div class="card border-success">
                  <img class="card-img-top" src="https://cdn.vox-cdn.com/thumbor/zVToqicD9WpivlJH5qNh3w3aCuk=/154x0:1281x845/1400x788/filters:focal(154x0:1281x845):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/46983754/simpsons-kitchen.0.0.jpg" alt="Card image cap" />
                  <div class="card-body">
                    <p class="card-text"><h6><span class="text-success">question:</span> are the chairs red or blue?</h6> </p>
                    <p class="card-text"><h6><span class="text-success">answer:</span> red</h6> </p>
                    <p class="card-text"><h6><span class="text-success">judgements:</span></h6> </p>
                    <ul class="mx-3">
                      <li ><p class="card-text"><h6><span class="text-success">worker_1:</span> {"{"} question: 1, answer: 1{"}"}</h6> </p></li>
                      <li><p class="card-text"><h6><span class="text-success">worker_2:</span> {"{"} question: 1, answer: 1{"}"}</h6> </p></li>
                      <li><p class="card-text"><h6><span class="text-success">worker_3:</span> {"{"} question: 1, answer: 0.5{"}"}</h6> </p></li>
                    </ul>
                    <p class="card-text"><h6><span class="text-success">overall_scores:</span>{"{"} question: 1, answer: 0.83{"}"}</h6> </p>
                  </div>
                </div>
                <div class="text-center">
                  <h6 class="text-success">Example</h6>
                </div>
              </div>
            </div>
          <p class="mt-4 mb-1 mx-3"><code class="text-success"><b>data_subtype</b></code>: Type of data subtype (train, val, test).</p>
          <p class="mb-1 mx-3"><code class="text-success"><b>answer_type</b></code>: Type of the answer  "yes/no", "number", and "other".</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>first_word</b></code>: The first word of the question.</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>judgements</b></code>: The judgements of 3 MTURK workers about the relevancy of the question and the accuracy level of the answer:</p>:
      
          <p class="mx-3 mb-1">
          <ul>
              <li class="text-success">For the question relevancy:
                  <ul>
                      <li><span style={{color:"black"}}>1: relevant</span></li>
                      <li><span style={{color:"black"}}>0: irrelevant</span></li>
                  </ul>
              </li>
              <li class="text-success">For the answer accuracy:
                  <ul>
                      <li><span style={{color:"black"}}>0: Incorrect</span></li>
                      <li><span style={{color:"black"}}>0.5: Ambiguous</span></li>
                      <li><span style={{color:"black"}}>1: Correct</span></li>
                  </ul>
              </li>
          </ul>
          </p>
          <p class="mx-3 mb-1"><code class="text-success"><b>overall_scores</b></code>: The average score of the judgements.</p>
         

        </div>
      </div>


  );
};

export default FileUploadForm;