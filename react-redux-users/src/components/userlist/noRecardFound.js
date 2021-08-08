import React, { Component } from 'react';

class NoRecardFound extends Component {

    state = {
        isClickOnSearchAgain: false
    }

    onClickSearchAgain = (e) => {
        e.preventDefault();
        this.setState({
            isClickOnSearchAgain: true
        });
    }

    render() {

        let noRecardDOM = <form>
            <div className="noRecard">
                <br />
                <br />
                <h2>
                    No User exit related to this email.
                </h2>
                <br />
                <br />                
            </div>
        </form>;
        
        return (
            <>
                {noRecardDOM}                
            </>
        );
    }
}

export default NoRecardFound;