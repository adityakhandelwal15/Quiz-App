import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import deletequiz from './deletequiz';
import deleteque from './deleteque';
import ViewPeople from './ViewPeople';
import EditPerson from './EditPerson';
import NewPerson from './NewPerson';
import CreateQues from "./CreateQues";
import play from "./play";
import Test from "./test";
import logout from "./logout";
import playMovies from "./playMovies";
import leaderboard from "./leaderboard";
import Home from './Home';
import addquiz from './addquiz';
import music from './music';
import addque from './addque';
import editque from './dynamicedit';
import dynamic from './dynamic';
import dynamicedit from './dynamicedit';
import dynamicleader from './dynamicleader';
import FrontPage from './main';
import overall from './overall';
import updateQuiz from './UpdateQuiz';
import selectQuiz from './selectQuiz';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                 {localStorage.getItem('email') && 
                 <div>
                    <ul className="nav navbar-nav">
                    <li><Link to={'/play'}>PlayGK</Link></li>
                    <li><Link to={'/playMovies'}>PlayMovies</Link></li>
                      <li><Link to={'/selectQuiz'}>SelectQuiz</Link></li>
                      <li><Link to={'/leaderboard'}>LeaderBoard</Link></li>
                    <li><Link to={'/logout'}>Logout</Link></li>
                    </ul>
                 </div>
                 }
                  {localStorage.getItem('email')=="admin@quiz" &&
                    <ul className="nav navbar-nav">
                    <li><Link to={'/UpdateQuiz'}>Edit Quiz</Link></li>
                    <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                    <li><Link to={'/deleteque'}>Delete Questions</Link></li>
                    <li><Link to={'/deletequiz'}>Delete Quiz</Link></li>
                    <li><Link to={'/addquiz'}>Add Quiz</Link></li>
                    <li><Link to={'/addque'}>Add Que</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                    <li><Link to={'/CreateQues'}>CreateQues</Link></li>
                    </ul>
                 }
                  {!localStorage.getItem('email') &&
                  <div>
                    <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/NewPerson'}>SignUP</Link></li>
                    <li><Link to={'/main'}>LogIn</Link></li>
                    </ul>
                  </div>
                  
                }
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/NewPerson' component={NewPerson} />
              <Route exact path='/DeletePerson' component={DeletePerson} />
              <Route exact path='/deleteque' component={deleteque} />
              <Route exact path='/deletequiz' component={deletequiz} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
              <Route exact path='/CreateQues' component={CreateQues} />
              <Route exact path='/play' component={play} />
              <Route exact path='/UpdateQuiz' component={updateQuiz} />
              <Route exact path='/music' component={music} />
              <Route exact path='/leaderboard' component={leaderboard} />
              <Route exact path='/addquiz' component={addquiz} />
              <Route exact path='/addque' component={addque} />
              <Route exact path='/editque' component={editque} />
              <Route exact path='/playMovies' component={playMovies} />
              <Route exact path='/main' component={FrontPage} />
              <Route exact path='/selectQuiz' component={selectQuiz} />
              <Route exact path='/logout' component={logout} />
              <Route exact path='/dynamic' component={dynamic} />
              <Route exact path='/dynamicedit' component={dynamicedit} />
              <Route exact path='/overall' component={overall} />
              <Route exact path='/dynamicleader' component={dynamicleader} />
              
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
