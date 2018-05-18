import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import './Game.css'

const Story = require('./app_story.json').story

class Game extends Component {

  isDisabled(step) {
    let isDisabled = false

    if (step.modifiers) {
      step.modifiers.map((modifier, i) => {
        console.log(modifier)
        if (modifier.type === 'strenght' || modifier.type === 'dollars') {
          if (this.props[modifier.type] + modifier.value < 0) {
            isDisabled = true
          }
        }
        return isDisabled
      })
    }

    return isDisabled
  }

  nextStep(step) {
    var isDisabled = this.isDisabled(step)
    if (!isDisabled) {
      this.props.changePosition(step.id)
      this.props.getModification(step)
    }
  }

  hasChoice() {
    const { next, text } = Story[this.props.position];

    if(this.props.health > 0) {

      return (
        <div>
          <div className="text">{text}</div>

          <div className="btn-group">
            {next.map((step, i) => {
              var isDisabled = this.isDisabled(step)
              var btnClass = classNames({
                'btn': true,
                'btn-primary': !isDisabled,
                'btn-disabled': isDisabled
              });
              return (
                <button
                  key={i}
                  onClick={() => this.nextStep(step)}
                  disabled={isDisabled}
                  className={btnClass}
                >{step.text}</button>
              )
            })}
          </div>
        </div>
      )
    }

    else {
      return (
        <div>
          <p>Le gang de la chicha était trop puissant pour toi, tu es donc laissé explosé par terre. </p>
          <Link to={process.env.PUBLIC_URL + '/character'} className="btn btn-primary" onClick={() => this.props.resetCharacter()}>Terminer l'aventure</Link>
        </div>
      )
    }
  }

  render() {

    return (
      <div className="container">

        <div className="char-grid">
          <p className="char-element">Nom : {this.props.name}</p>
          <p className="char-element">Force : {this.props.strenght}</p>
          <p className="char-element">Santé : {this.props.health}</p>
          <p className="char-element">dollars : {this.props.dollars}</p>
        </div>
        {this.hasChoice()}
      </div>
    );
  }
}

export default Game;
