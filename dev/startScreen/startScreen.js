import React, {Component} from 'react';
import {Link}  from 'react-router-dom';
import './startScreen.css';

class StartScreen extends Component  {
    render() {
        return(
          <div className="StartScreen">
              <div className="StartScreen__MainMenu">
                  <Link to='/mainGame' className="StartScreen__MainMenu_Button Bordered">Play</Link>
                  <Link to='/settings' className="StartScreen__MainMenu_Button Bordered">Settings</Link>
                  <button onClick={this.showModal.bind(this)} className="StartScreen__MainMenu_Button Bordered">Exit</button>
              </div>
              <div className="StartScreen__ModalWin" ref="modal">
                  <div className="StartScreen__ModalWin_header">
                    Are you sure you want to exit?
                  </div>
                  <div className="StartScreen__ModalWin_buttons">
                      <button onClick={this.exitGame.bind(this)} className="StartScreen__MainMenu_Button">Yes</button>
                      <button onClick={this.hideModal.bind(this)} className="StartScreen__MainMenu_Button">No</button>
                  </div>
              </div>
          </div>
        );
    }

    hideModal() {
        this.refs.modal.style.display = "none";
    }

    showModal() {
        this.refs.modal.style.display = "flex";
    }

    exitGame() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'exit_game', false);
        xhr.send();
    }
}

export default StartScreen;