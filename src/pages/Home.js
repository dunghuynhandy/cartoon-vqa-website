import example from '../example.png';
import example_1 from '../example_1.png';
import example_2 from '../example_2.png';
const Home = () => {
  return (
    <div class="container mt-5">
      <div class="row">

    <div class="col-10">
    <h1 class="text-success">About The Project</h1>
    </div>
    </div>
      <div class="row align-items-start">
        
        <div class="col-6  border-end border-3 border-success my-5">
          <h4 class="text-success">What is VQA?</h4>
          <p class="mt-6 mx-2" style={{ "text-align": "justify" }}>
            Visual Question Answering (VQA) is a field of research that combines computer vision
            and natural language processing to enable machines to understand and answer questions
            about visual content. It involves analyzing an image and processing a corresponding
            question to generate a relevant textual answer. VQA aims to bridge the gap between visual
            perception and linguistic understanding, enabling machines to comprehend and respond to
            queries about visual information.
          </p >
          <h4 class="mt-5 text-success">What is The Simpsons?</h4>
          <p class="mt-4 mx-2" style={{ "text-align": "justify" }}>
            The Simpsons is a long-running animated sitcom created by Matt Groening. It revolves around
            the lives of the Simpson family, consisting of Homer, Marge, Bart, Lisa, and Maggie, living
            in the fictional town of Springfield. Known for its satirical humor, colorful characters, and
            social commentary, The Simpsons has become one of the most iconic and influential television
            shows in history.
          </p>
          <h4 class="mt-5 text-success">The purpose of <span class="text-danger">Simpsons-VQA </span> dataset:</h4>
          <p class="mt-4 mx-2" style={{ "text-align": "justify" }}>
            Promoting child development is of utmost importance, and together with our research team, we are
            undertaking a unique project to create a dataset from Simpsons images for the development of a Visual
            Question Answering (VQA) system aimed at pre-schoolers. By combining beloved characters from the iconic
            animated series with the interactive nature of VQA, our initiative aims to nurture children's curiosity
            and encourage active participation. Through their questions, young learners will have the opportunity
            to explore the vibrant world of the Simpsons, fostering cognitive development, language skills, and
            critical thinking. This collaborative and innovative approach not only recognizes the value of children's
            questions but also provides an engaging and educational experience tailored specifically for pre-schoolers,
            empowering them to expand their knowledge and enhance their ability to articulate and inquire about the world around them.
          </p>

          <h4 class="mt-5 mb-4 text-success">Examples:</h4>
          <h5 class="mt-5 mb-4 text-center">Conventional VQA Task</h5>
          <img src={example} alt="logo" style={{ width: "100%" }} />
          <h5 class="mt-5 mb-4 text-center">Question Relevance VQA Task</h5>
          <img src={example_1} alt="logo" style={{ width: "100%" }} />
          <h5 class="mt-5 mb-4 text-center">Answer correctness VQA Task</h5>
          <img src={example_2} alt="logo" style={{ width: "100%" }} />

        </div>
        <div class="col-6 col-4  mt-5">
          <h4 class="text-success">Dataset Statistic</h4>
          <p class="mt-4 mx-2" style={{ "text-align": "justify" }}>
            <p>Details on downloading the Simpsons-VQA dataset may be found on the <a href="/download"> download</a> webpage.</p>
            <p>The dataset consists of:</p>

            <ul>
              <li>23,269 Simpsons cartoon images.</li>
              <li>At least 1 and at most 11 question-answer pair (4.5 pairs on average) per image.</li>
              <li>103,738 question-answer pair.</li>
              <li>Each question-answer pair has 3 ratings with 3 levels:
                <ul>
                  <dd>- Incorrect</dd>
                  <dd>- Ambiguous</dd>
                  <dd>- Correct</dd>
                </ul>
              </li>
              <li>The topic of the question includes:
                <ul>
                  <dd>- Attribute classification</dd>
                  <dd>- Object Recognition</dd>
                  <dd>- Counting</dd>
                  <dd>- Action Recognition</dd>
                  <dd>- Spatial</dd>
                  <dd>- Comparative</dd>
                  <dd>- Reasoning</dd>
                </ul>
              </li>
            </ul>
          </p>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  )
};

export default Home;