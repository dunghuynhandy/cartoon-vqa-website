import example from '../example.png';
const Home = () => {
  return (
    <div class="container mt-5">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-10">
          <h1 class="text-success my-5">People</h1>
          <div class="row">
            <div class="col-3 text-center">
              <a  target="_blank" href="https://parkerhuynh.github.io./"><img  class="rounded-circle " style={{"width":"200px", "height": "200px"}} src="https://parkerhuynh.github.io./images/parker.png" alt="ngoc dung huynh"/></a> 
              <h5 class="mt-3">Ngoc Dung Huynh</h5>
              <h6 class="mt-2">Deakin University</h6>
              <h6 class="mt-2">Geelong, VIC Australia</h6>
            </div>
            <div class="col-3 text-center">
              <a  target="_blank" href="https://rbouadjenek.github.io/index.html"><img  class="rounded-circle " style={{"width":"200px", "height": "200px"}} src="https://rbouadjenek.github.io/img/Reda5.jpg" alt="Mohamed Reda Bouadjenek"/></a> 
              <h5 class="mt-3">Dr. Mohamed Reda Bouadjenek</h5>
              <h6 class="mt-2">Deakin University</h6>
              <h6 class="mt-2">Geelong, VIC Australia</h6>
            </div>
            <div class="col-3 text-center">
              <a  target="_blank" href="https://sunilaryal.github.io/"><img  class="rounded-circle " style={{"width":"200px", "height": "200px"}} src="https://sunilaryal.github.io/images/Sunil.png" alt="sunilaryal"/></a> 
              <h4 class="mt-3">Dr. Sunil Aryal</h4>
              <h6 class="mt-2">Deakin University</h6>
              <h6 class="mt-2">Geelong, VIC Australia</h6>
            </div>
            <div class="col-3 text-center">
              <a  target="_blank" href="https://imranrazzak.github.io/"><img  class="rounded-circle " style={{"width":"200px", "height": "200px"}} src="https://api.research.unsw.edu.au/sites/default/files/images/profile/I.jpg" alt="Imran"/></a> 
              <h4 class="mt-3">Dr. Imran Razzak</h4>
              <h6 class="mt-2">University of New South Wales</h6>
              <h6 class="mt-2">Sydney, Australia</h6>
            </div>
          </div>
          <div class="row text-center">
            <div class="col-4"></div>
            <div clas="col-3">
             <img  class="rounded-circle " style={{"width":"200px", "height": "200px"}} src="https://www.tubefilter.com/wp-content/uploads/2018/03/mturk-youtube.jpg" alt="Mturk"/>
              <h6 class="mt-3">Amazon Mechanical Turk Workers</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="row" style={{"height":"500px"}}></div>
    </div>
  )
};

export default Home;