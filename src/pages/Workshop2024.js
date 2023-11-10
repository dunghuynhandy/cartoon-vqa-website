const Workshop2024 = () => {
  return (
    <div class="container mt-5" style={{"height":"1000px"}}>
      <div class="row border-bottom border-success">
        <h1 class="text-success">SimpsonsVQA AI Challenge 2024 Workshop</h1>
        
      </div>
      <p class="pt-5 mt-5 text-center">Coming soon</p>
      {/* <div class="row mt-5">
        <h2 class="text-success">Overview</h2>
        <section>
          <p style={{ "text-align": "justify" }}>Welcome to <b>SimpsonsVQA AI Challenge 2024</b>, a unique AI challenge crafted to foster a community of researchers, educators,
            and developers committed to leveraging Visual Question Answering (VQA) to enhance early-age education. This initiative
            is centered on utilizing VQA as a dynamic tool to facilitate improved learning experiences for young learners.
          </p>
        </section>

        <section style={{ "text-align": "justify" }}>
          <h5>Challenge Objectives:</h5>
          <ol>
            <li><strong>Community Building:</strong> This challenge aims to establish a collaborative environment where
              professionals from various domains can engage, share insights, and work together to advance VQA
              applications in education.</li>
            <li><strong>Innovation in Education:</strong> Participants will contribute to developing and refining
              next-generation educational tools designed for young learners through the implementation of VQA in
              educational settings.</li>
          </ol>
        </section>
        <section style={{ "text-align": "justify" }}>
          <h5>Challenge Tasks:</h5>
          <ol>
            <li><strong>Conventional VQA:</strong> Participants will work on traditional VQA problems, creating
              algorithms capable of answering visually presented questions accurately and efficiently.</li>
            <li><strong>Question Relevance VQA:</strong> Develop systems that can effectively determine the relevance of
              posed questions to the given visual content, ensuring educationally valuable interactions.</li>
            <li><strong>Answer Correctness VQA:</strong> This task requires participants to devise solutions that,
              given an image, a question, and an answer, can efficiently evaluate the provided triple as Incorrect,
              Ambiguous, or Correct. The system should be able to perform this evaluation accurately to facilitate a
              more supportive learning experience for children.</li>
          </ol>
        </section>


        <section style={{ "text-align": "justify" }}>
          <h5>Why SimpsonsVQA Challenges?</h5>
          <ul>
            <li><strong>Inclusive Community:</strong> Welcomes individuals and groups from various backgrounds,
              promoting diverse perspectives and innovative solutions.</li>
            <li><strong>Focus on Early Education:</strong> Tasks are designed to address the needs of early-age
              education, improving the quality of learning resources for young children.</li>
            <li><strong>Cutting-edge Learning:</strong> Engage with the latest technologies and methodologies in VQA and
              AI, collaborating with experts and peers in the field to push the boundaries of education technology.
            </li>
          </ul>
        </section>
        <section style={{ "text-align": "justify" }}>
        <p>Join us in <b>SimpsonsVQA AI Challenge 2024</b> to explore, innovate, and contribute to the future of education
            through the power of Visual Question Answering technology. Together, let’s unlock new possibilities for
            learning and discovery!</p>
        </section>
      </div>

      <div class="row mt-5">
        <h2 class="text-success">Dataset</h2>
        <p>Details on downloading the Simpsons-VQA dataset may be found on the <a href="/download"> Download</a> webpage.</p>
        <p>Some examples are shown on the <a href="/examples">Examples</a> webpage.</p>
        <p>Some statistical visualizations are shown on the <a href="/visualize">Visualize</a> webpage.</p>
      </div>


      <div class="row mt-5">
        <h2 class="text-success ">Evaluation</h2>
        <p style={{ "text-align": "justify" }}>We employ the standard  <b>Accuracy</b> metric as our primary evaluation criterion. Additionally, 
          recognizing the class imbalance for the Question Relevance task and the Answer Correctness task,
          we also utilize the <b>Precision</b>, <b>Recall</b>, <b>F1-score</b>, and <b>AUC score</b> to provide a comprehensive assessment
           of model performance.</p>
      </div>



      <div class="row mt-5">
        <h2 class="text-success" style={{ "text-align": "justify" }}>Awards</h2>
        <p>We will provide the prizes to the winner (1st place) and the two runner-ups (2nd and 3rd places). Finalists must present their solution at the WSDM Cup workshop to qualify for the prizes.</p>
        <div class="col-3">
        <table class="table table-striped mt-4">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Place</th>
                    <th scope="col">Prize</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1st</td>
                    <td>3,000 AUD</td>
                </tr>
                <tr>
                    <td>2nd</td>
                    <td>2,000 AUD</td>
                </tr>
                <tr>
                    <td>3rd</td>
                    <td>1,000 AUD</td>
                </tr>

            </tbody>
        </table>
        </div>
        
        We furthermore plan to publish the findings of SimpsonsVQA 2024 in a peer reviewed article. The three best performing teams in the Final phase will 
        be invited to collaborate in writing this article. Other teams invited to Phase 2 may also be invited to help writing based on their performance and methodology.
      </div>

      <div class="row mt-5">
        <h2 class="text-success">Important Dates</h2>
        <table class="table table-striped mt-4">
            <thead class="thead-dark text-center">
                <tr >
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>05 December 2023</td>
                    <td>Challenge Announcements. Get acquainted with the problems: submit predictions 
                      on <span class="italic-text">train_sample.csv</span></td>
                </tr>
                <tr>
                    <td>15 December 2023</td>
                    <td>Contest and Phase 1 begin. Make predictions on <span class="italic-text">validation.csv</span> 
                    and submit your answers - preliminary score</td>
                </tr>
                <tr>
                    <td>15 April 2024</td>
                    <td>Phase 1 ends. Phase 1 result releases</td>
                </tr>
                <tr>
                    <td>20 April 2023</td>
                    <td>Phase 2 begins. Top 5 teams with the highest scores in Phase 1 will enter Phase 2. Make predictions on <span class="italic-text">test.csv</span>  and submit your answers - preliminary score</td>
                </tr>
                <tr>
                    <td>05 May 2024</td>
                    <td>Phase 2 ends</td>
                </tr>
                <tr>
                    <td>10 May 2024</td>
                    <td>Competition Ends. Final Result Announcement</td>
                </tr>
                <tr>
                    <td>14-15 May 2024</td>
                    <td>Workshop</td>
                </tr>
            </tbody>
        </table>
      </div> 

      <div class="row mt-5">
        <h2 class="text-success">Organizers</h2>
      </div>
      */}
    </div>
  )
};

export default Workshop2024;