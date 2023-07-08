import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const FileUploadForm = () => {

  return (
    <>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-10">
          <h1 class="text-success my-5">Download</h1>
        </div>
      </div>
      <div class="row "></div>
      <div class="col-2"></div>
      <div class="col-3 border-end border-1 border-success">
        <h4 class="text-success text-center">VQA Annotations</h4>
        <ul class="mt-5">
          <li class="my-4">
            <Link class="text-success" to="/v1_Annotation_Train_simpsoon_vqa.json" target="_blank" download>Training Annotations: 78,622 answers</Link>
          </li>
          <li>
            <Link  class="text-success" to="/v1_Annotation_Val_simpsoon_vqa.json" target="_blank" download>Validation Annotations: 12,721 answers</Link>
          </li>
        </ul>
      </div>
      <div class="col-3 border-end border-1 border-success">
        <h4 class="text-success text-center">VQA Input Questions</h4>
        <ul class="mt-5">
          <li class="my-4">
            <Link class="text-success" to="/v1_Question_Train_simpsoon_vqa.json" target="_blank" download>Training Questions: 78,622 questions</Link>


          </li>
          <li class="my-4">
            <Link class="text-success" to="/v1_Question_Val_simpsoon_vqa.json" target="_blank" download>Validation Questions: 12,721 questions</Link>

          </li>
          <li>
            <Link class="text-success" to="/v1_Question_Test_simpsoon_vqa.json" target="_blank" download>Testing Questions: 13336 questions</Link>
          </li>
        </ul>
      </div>
      <div class="col-3 ">
        <h4 class="text-success text-center">VQA Input Images</h4>
        <ul class="mt-5">
          <li class="my-4">
            <Link class="text-success" to="https://storage.cloud.google.com/cartoon_img/train_images.zip?authuser=1" target="_blank" download>Training Images: 13966 images</Link>
          </li>
          <li class="my-4">
            <Link class="text-success" to="https://storage.cloud.google.com/cartoon_img/val_images.zip?authuser=1" target="_blank" download>Validation Images: 3491 images</Link>

          </li>
          <li>
            <Link class="text-success" to="https://storage.cloud.google.com/cartoon_img/test_images.zip?authuser=1" target="_blank" download>Testing Images: 5820 images</Link>

          </li>
        </ul>
      </div>

      <div class="col-1"></div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-10">
          <h1 class="text-success my-5">Input Questions Format</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-10">
          <div class="border border-1 border-success mx-3">
            <pre >
              <strong class="m-0">
                <p class="m-0 ">{"{"}</p>
                <p class="m-0">   <span class="text-success">"info":</span> {"{"}</p>
                <p class="m-0 ">       <span class="text-success">"description":</span> <span class="text-danger">"This is v1.0 of the Cartoon VQA dataset."</span>,</p>
                <p class="m-0 ">       <span class="text-success">"url":</span> <span class="text-danger">"cartoonvqa.org"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"version":</span> <span class="text-danger">"1.0"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"year":</span> <span class="text-danger">"2023"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"contributor":</span> <span class="text-danger">"Deakin VQA Team"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"date_created":</span> <span class="text-danger">"2023-08-01 00:00:00"</span></p>
                <p class="m-0 ">   {"}"},</p>
                <p class="m-0">   <span class="text-success">"task_type":</span> <span class="text-danger">"Open-Ended"</span>,</p>
                <p class="m-0">   <span class="text-success">"data_type":</span> <span class="text-danger">"The Simpsons"</span>,</p>
                <p class="m-0">   <span class="text-success">"license":</span> {"{"}</p>
                <p class="m-0 ">      <span class="text-success">"url":</span> <span class="text-danger">"http://creativecommons.org/licenses/by/4.0/"</span>,</p>
                <p class="m-0 ">      <span class="text-success">"name":</span> <span class="text-danger">"Creative Commons Attribution 4.0 International License"</span></p>
                <p class="m-0 ">   {"}"},</p>

                <p class="m-0">   <span class="text-success">"data_subtype":</span> <span class="text-danger">"train"</span>,<small><i class="text-muted"> # or "val" or "test"</i></small></p>
                <p class="m-0">   <span class="text-success">"questions":</span> {"{"}</p>
                <p class="m-0 ">      <span class="text-success">"id":</span> <span class="text-danger">0</span>,</p>
                <p class="m-0 ">      <span class="text-success">"question":</span> <span class="text-danger">"what is in the background?"</span>,</p>
                <p class="m-0 ">      <span class="text-success">"img_path":</span> <span class="text-danger">"S24/S24E22-27951.jpg"</span></p>
                <p class="m-0 ">   {"}"},</p>
                <i class="text-muted">   ...</i>
                <p><strong>{"}"}</strong></p>
              </strong>
            </pre>
          </div>
          <p class="mt-4 mb-1 mx-3"><code class="text-success"><b>data_subtype</b></code>: Type of data subtype (train, val, test).</p>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-10">
          <h1 class="text-success my-5">Input Annotations Format</h1>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-2"></div>
        <div class="col-10">
          <div class="border mx-3 border-1 border-success">
            <pre >
              <strong class="m-0">
                <p class="m-0 ">{"{"}</p>
                <p class="m-0">   <span class="text-success">"info":</span> {"{"}</p>
                <p class="m-0 ">       <span class="text-success">"description":</span> <span class="text-danger">"This is v1.0 of the Cartoon VQA dataset."</span>,</p>
                <p class="m-0 ">       <span class="text-success">"url":</span> <span class="text-danger">"cartoonvqa.org"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"version":</span> <span class="text-danger">"1.0"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"year":</span> <span class="text-danger">"2023"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"contributor":</span> <span class="text-danger">"Deakin VQA Team"</span>,</p>
                <p class="m-0 ">       <span class="text-success">"date_created":</span> <span class="text-danger">"2023-08-01 00:00:00"</span></p>
                <p class="m-0 ">   {"}"},</p>
                <p class="m-0">   <span class="text-success">"task_type":</span> <span class="text-danger">"Open-Ended"</span>,</p>
                <p class="m-0">   <span class="text-success">"data_type":</span> <span class="text-danger">"The Simpsons"</span>,</p>
                <p class="m-0">   <span class="text-success">"license":</span> {"{"}</p>
                <p class="m-0 ">      <span class="text-success">"url":</span> <span class="text-danger">"http://creativecommons.org/licenses/by/4.0/"</span>,</p>
                <p class="m-0 ">      <span class="text-success">"name":</span> <span class="text-danger">"Creative Commons Attribution 4.0 International License"</span></p>
                <p class="m-0 ">   {"}"},</p>

                <p class="m-0">   <span class="text-success">"data_subtype":</span> <span class="text-danger">"train"</span>,<small><i class="text-muted"> # or "val" or "test"</i></small></p>
                <p class="m-0">   <span class="text-success">"annotations":</span> {"{"}</p>
                <p class="m-0 ">      <span class="text-success">"id":</span> <span class="text-danger">0</span>,</p>
                <p class="m-0 ">      <span class="text-success">"topic":</span> <span class="text-danger">"spatial"</span>,<small><i class="text-muted"> # or "Attribute classification" or "Object Recognition" or "Counting" or "Action Recognition" or "Comparative" or "Reasoning"</i></small></p>
                <p class="m-0 ">      <span class="text-success">"answer_type":</span> <span class="text-danger">"other"</span>,<small><i class="text-muted"> # or "number" or "other"</i></small></p> 
                <p class="m-0 ">      <span class="text-success">"firstword":</span> <span class="text-danger">"what"</span>,</p>
                <p class="m-0 ">      <span class="text-success">"answer":</span> <span class="text-danger">"pole"</span>,</p>
                <p class="m-0 ">      <span class="text-success">"incorrect & partially incorrect":</span> <span class="text-danger">3</span>,</p>
                <p class="m-0 ">      <span class="text-success">"incorrect":</span> <span class="text-danger">2</span>,</p>
                <p class="m-0 ">      <span class="text-success">"partially incorrect":</span> <span class="text-danger">1</span>,</p>
                <p class="m-0 ">      <span class="text-success">"ambiguous":</span> <span class="text-danger">0</span>,</p>
                <p class="m-0 ">      <span class="text-success">"partially correct":</span> <span class="text-danger">0</span>,</p>
                <p class="m-0 ">      <span class="text-success">"correct":</span> <span class="text-danger">0</span>,</p>
                <p class="m-0 ">      <span class="text-success">"correct & partially correct":</span> <span class="text-danger">0</span></p>
                <p class="m-0 ">   {"}"},</p>
                <i class="text-muted">   ...</i>
                <p><strong>{"}"}</strong></p>
              </strong>
            </pre>
          </div>
          <p class="mt-4 mb-1 mx-3"><code class="text-success"><b>data_subtype</b></code>: Type of data subtype (train, val, test).</p>
          <p class="mb-1 mx-3"><code class="text-success"><b>answer_type</b></code>: Type of the answer  "yes/no", "number", and "other".</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>firstword</b></code>: The first word of the question.</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>incorrect & partially incorrect</b></code>: Number of MTURK workers who answered that the question-answer pair is Incorrect or Partially Incorrect.</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>incorrect</b></code>: Number of MTURK workers who answered that the question-answer pair is Incorrect.</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>partially incorrect</b></code>: Number of MTURK workers who answered that the question-answer pair is Partially Incorrect.</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>ambiguous</b></code>: Number of MTURK workers who answered that the question-answer pair is partially Ambiguous.</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>partially correct</b></code>: Number of MTURK workers who answered that the question-answer pair is partially Partially Correct.</p>
          <p class="mx-3 mb-1"><code class="text-success"><b>correct</b></code>: Number of MTURK workers who answered that the question-answer pair is partially Correct.</p>

        </div>
      </div>



    </>

  );
};

export default FileUploadForm;