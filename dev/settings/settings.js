import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './settings.css';

class Settings extends Component {
    render() {
        return(
            <div className="Settings">
                <div className="Settings_Fields">
                    {this.genSets()}
                </div>
                <div className="Settings_Buttons">
                    <button onClick={this.sendNewSettings.bind(this)} className="StartScreen__MainMenu_Button">Apply</button>
                    <Link to="/" className="StartScreen__MainMenu_Button">Cancel</Link>
                </div>
            </div>
        );
    }

    sendNewSettings() {
        let xhr =  new XMLHttpRequest();
        let objects = "";
        for(let key in this.props.config) {
            objects+=key + "=" + (this.refs[key].value === "" ? this.props.config[key] : this.refs[key].value) + '&';
        }
        xhr.open('GET', 'set_config?' + objects, false);
        xhr.send();
    }

    genSets() {
        let children = [];

        for(let key in this.props.config) {
            children.push(
                <div key={key} className="Settings_field">
                        <span className="Settings_field_label">
                            {key}:
                        </span>
                        <span className="Settings_field_num">
                            <input placeholder={this.props.config[key]} ref={key}/>
                        </span>
                </div>
            );
        }

        return children;
    }
}

function mapStateToProps(state) {
    return {
        config: state.config
    }
}

export default connect(mapStateToProps)(Settings);

/*
<div className="Settings">
    <div className="Settings_field">
        <span className="Settings_field_label"></span>
        <span className="Settings_field_num"></span>
    </div>
</div>*/
