import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status)
            this.setState({status: this.props.status})
    }

    enableEditMode = () => {
        this.setState({
            editMode: true/*,
            status: this.props.status*/
        })
    }

    disableEditMode = (e) => {
        this.setState({editMode: false})
        this.props.updateStatus(e.currentTarget.value)
    }

    render() {

        return (
            <>
                {(this.state.editMode)
                    ?
                    <div>
                        <input
                            onBlur={this.disableEditMode}
                            value={this.state.status}
                            onChange={(e) => {
                                this.setState({status: e.target.value})
                            }}
                            autoFocus={true}
                        />
                    </div>
                    :
                    <div>
                        <span onClick={this.enableEditMode}>{this.props.status || 'Enter your status'}
                        </span>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus